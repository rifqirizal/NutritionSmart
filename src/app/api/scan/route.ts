import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { getGeminiClient } from '@/lib/gemini';
import { writeFile, mkdir, readdir, stat, unlink } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No image uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes); // For Gemini AI & Storage

    // Save image to public/uploads
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });

      // Cleanup files older than 30 days
      const files = await readdir(uploadsDir);
      const now = Date.now();
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      for (const f of files) {
        const fp = join(uploadsDir, f);
        const stats = await stat(fp);
        if (now - stats.mtimeMs > thirtyDays) {
          await unlink(fp).catch(() => { });
        }
      }
    } catch (_) { }

    const filename = `${crypto.randomUUID()}-${file.name}`;
    const filepath = join(uploadsDir, filename);
    await writeFile(filepath, buffer);
    const imageUrl = `/uploads/${filename}`;

    // Get user profile to customize advice
    const userProfile = await prisma.profile.findUnique({
      where: { user_id: session.userId }
    });
    const userGoal = userProfile?.goal || "Maintain a healthy lifestyle";

    // Call Gemini API
    const ai = getGeminiClient();
    const prompt = `Analyze this food image and provide the nutritional breakdown. 
    The user's personal fitness goal is: "${userGoal}".
    Return ONLY a raw JSON object with no markdown formatting. It must match this exact format:
    {
      "meal_name": "Name of the food",
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fat": 0,
      "confidence_score": 0.95,
      "advice": "Saran atau nasihat terkait makanan ini yang SPESIFIK DAN DISESUAIKAN DENGAN GOAL PENGGUNA ('${userGoal}'), dalam bahasa Indonesia"
    }`;

    // Note: The newer @google/genai SDK format
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: buffer.toString('base64'),
                mimeType: file.type || 'image/jpeg',
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
      },
    });

    const aiText = response.text || '{}';
    let nutritionData;
    try {
      nutritionData = JSON.parse(
        aiText
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim(),
      );
    } catch (_) {
      throw new Error('Failed to parse AI response: ' + aiText);
    }

    // Save to database
    const meal = await prisma.meal.create({
      data: {
        user_id: session.userId,
        image_url: imageUrl,
        meal_name: nutritionData.meal_name || 'Unknown Meal',
        meal_nutrition: {
          create: {
            calories: nutritionData.calories || 0,
            protein: nutritionData.protein || 0,
            carbs: nutritionData.carbs || 0,
            fat: nutritionData.fat || 0,
            confidence_score: nutritionData.confidence_score || 0.8,
            advice: nutritionData.advice || '',
          },
        },
      },
      include: {
        meal_nutrition: true,
      },
    });

    // Update daily summary
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingSummary = await prisma.dailySummary.findUnique({
      where: {
        user_id_date: {
          user_id: session.userId,
          date: today,
        },
      },
    });

    if (existingSummary) {
      await prisma.dailySummary.update({
        where: { id: existingSummary.id },
        data: {
          total_calories: existingSummary.total_calories + (nutritionData.calories || 0),
          total_protein: existingSummary.total_protein + (nutritionData.protein || 0),
          total_carbs: existingSummary.total_carbs + (nutritionData.carbs || 0),
          total_fat: existingSummary.total_fat + (nutritionData.fat || 0),
        },
      });
    } else {
      await prisma.dailySummary.create({
        data: {
          user_id: session.userId,
          date: today,
          total_calories: nutritionData.calories || 0,
          total_protein: nutritionData.protein || 0,
          total_carbs: nutritionData.carbs || 0,
          total_fat: nutritionData.fat || 0,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...meal,
        advice: nutritionData.advice || "Tetap semangat menjaga asupan kalori dan makanan sehat!"
      }
    });
  } catch (error: unknown) {
    console.error('Scan error:', error);

    // Cek apakah error berasal dari Rate Limit Google Gemini (biasanya status 429)
    const errObj = error as any;
    const errorMessage = errObj?.message?.toLowerCase() || '';
    if (errObj?.status === 429 || errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
      return NextResponse.json(
        { success: false, message: 'The AI system is currently busy or has reached its limit. Please wait about 15 minutes and try again.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 },
    );
  }
}

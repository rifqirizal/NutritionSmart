import { NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/gemini';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { text, targetLanguage } = await request.json();
    if (!text || !targetLanguage) {
      return NextResponse.json({ success: false, message: 'Missing parameters' }, { status: 400 });
    }

    const ai = getGeminiClient();
    const prompt = `Translate the following text to ${targetLanguage}. Maintain the original tone, medical/nutrition context, and formatting (like bolding using **). Return ONLY the translated text, without any additional conversational filler or markdown code blocks.\n\nText:\n${text}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ success: true, data: response.text });
  } catch (error: unknown) {
    const errObj = error as any;
    if (errObj?.status === 429) {
      return NextResponse.json(
        { success: false, message: 'AI is busy. Please wait.' },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 },
    );
  }
}

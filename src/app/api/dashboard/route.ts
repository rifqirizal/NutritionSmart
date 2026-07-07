import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { existsSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [dailySummary, profile, recentMeals] = await Promise.all([
      prisma.dailySummary.findUnique({
        where: {
          user_id_date: {
            user_id: session.userId,
            date: today,
          },
        },
      }),
      prisma.profile.findUnique({
        where: { user_id: session.userId },
      }),
      prisma.meal.findMany({
        where: { user_id: session.userId },
        include: { meal_nutrition: true },
        orderBy: { created_at: 'desc' },
        take: 5,
      }),
    ]);

    const safeRecentMeals = recentMeals?.map(meal => {
      let image_url = meal.image_url;
      if (image_url) {
        const relativePath = image_url.startsWith('/') ? image_url.substring(1) : image_url;
        const fullPath = join(process.cwd(), 'public', relativePath);
        if (!existsSync(fullPath)) {
          image_url = '';
        }
      }
      return { ...meal, image_url };
    });

    return NextResponse.json({
      success: true,
      data: {
        dailySummary: dailySummary || {
          total_calories: 0,
          total_protein: 0,
          total_carbs: 0,
          total_fat: 0,
        },
        profile: profile || null,
        recentMeals: safeRecentMeals || [],
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

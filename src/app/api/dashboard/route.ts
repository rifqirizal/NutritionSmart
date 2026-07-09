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

    // Fix timezone issue on Vercel (UTC) vs Local (UTC+7)
    const now = new Date();
    const offset = 7 * 60 * 60 * 1000; // Jakarta UTC+7
    const localNow = new Date(now.getTime() + offset);
    localNow.setUTCHours(0, 0, 0, 0);
    const today = new Date(localNow.getTime() - offset);

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
        select: {
          id: true,
          user_id: true,
          meal_name: true,
          created_at: true,
          meal_nutrition: true,
        },
        orderBy: { created_at: 'desc' },
        take: 6,
      }),
    ]);

    const safeRecentMeals = recentMeals?.map(meal => {
      // Return the meal as is. 
      // Do not use fs.existsSync because:
      // 1. It crashes when image_url is a long base64 string (ENAMETOOLONG).
      // 2. Vercel serverless doesn't persist files locally anyway.
      return { ...meal };
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

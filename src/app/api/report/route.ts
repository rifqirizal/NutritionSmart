import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const daysParam = searchParams.get('days');
    const days = daysParam ? parseInt(daysParam, 10) : 7;

    const today = new Date();
    const xDaysAgo = new Date(today);
    xDaysAgo.setDate(today.getDate() - days);

    const summaries = await prisma.dailySummary.findMany({
      where: {
        user_id: session.userId,
        date: {
          gte: xDaysAgo,
          lte: today,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    const meals = await prisma.meal.findMany({
      where: {
        user_id: session.userId,
        created_at: {
          gte: xDaysAgo,
          lte: today,
        }
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        meal_nutrition: true,
      }
    });

    return NextResponse.json({
      success: true,
      data: { summaries, meals },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

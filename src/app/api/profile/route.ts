import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { profileSchema } from '@/validators/profile';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { user_id: session.userId },
    });

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Convert string to number for fields if they come from forms as string
    if (typeof body.height_cm === 'string') body.height_cm = Number(body.height_cm);
    if (typeof body.current_weight === 'string') body.current_weight = Number(body.current_weight);
    if (typeof body.target_weight === 'string') body.target_weight = Number(body.target_weight);

    const validation = profileSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid input', errors: validation.error.issues },
        { status: 400 },
      );
    }

    const data = validation.data;

    const profile = await prisma.profile.upsert({
      where: { user_id: session.userId },
      update: {
        birth_date: new Date(data.birth_date),
        gender: data.gender,
        height_cm: data.height_cm,
        current_weight: data.current_weight,
        target_weight: data.target_weight,
        goal: data.goal,
      },
      create: {
        user_id: session.userId,
        birth_date: new Date(data.birth_date),
        gender: data.gender,
        height_cm: data.height_cm,
        current_weight: data.current_weight,
        target_weight: data.target_weight,
        goal: data.goal,
      },
    });

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const meal = await prisma.meal.findUnique({
      where: { id: id },
      select: { image_url: true }
    });
    
    if (!meal || !meal.image_url) {
      return new NextResponse('Not Found', { status: 404 });
    }
    
    const parts = meal.image_url.split(',');
    if (parts.length !== 2) {
      return new NextResponse('Invalid image data', { status: 500 });
    }
    
    const mimeType = parts[0].replace('data:', '').replace(';base64', '');
    const base64Data = parts[1];
    const buffer = Buffer.from(base64Data, 'base64');
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 });
  }
}

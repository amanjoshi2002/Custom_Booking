import { NextResponse } from 'next/server';
import { getCollection } from '../../../lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: 'Not authenticated or user ID not available' }, { status: 401 });
    }

    const stylesCollection = await getCollection('styles');

    const style = await stylesCollection.findOne({ userId: session.user.id });
    
    if (style) {
      const { _id, __v, createdAt, ...cleanedStyle } = style;
      return NextResponse.json(cleanedStyle);
    } else {
      return NextResponse.json({ message: 'No style found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching style:', error);
    return NextResponse.json({ message: 'Error fetching style', error: (error as Error).message }, { status: 500 });
  }
}
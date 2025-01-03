import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from '@/app/lib/db';
import Application from '@/app/models/Aplication';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'You have to be authenticated' }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const applications = await Application.find({ userId }).populate("userId");


    return NextResponse.json( applications);
  } catch (error) {
    console.error("Error fetching applications:", error);

    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

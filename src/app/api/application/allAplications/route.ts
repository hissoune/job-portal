import {  NextResponse } from "next/server";
import { connectToDatabase } from '@/app/lib/db';
import Application from '@/app/models/Aplication';

export async function GET() {


  try {
    await connectToDatabase();

    const applications = await Application.find().populate("userId");


    return NextResponse.json( applications);
  } catch (error) {
    console.error("Error fetching applications:", error);

    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

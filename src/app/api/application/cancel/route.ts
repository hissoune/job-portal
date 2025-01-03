import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from '@/app/lib/db';
import Application from '@/app/models/Aplication';

export async function DELETE(req: NextRequest) {
  const AplicationId = req.nextUrl.searchParams.get('AplicationId');

  if (!AplicationId) {
    return NextResponse.json({ error: 'You have to be authenticated' }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const applications = await Application.findByIdAndDelete(AplicationId);
    if (!applications) {
        return NextResponse.json({ error: 'Failed to delete applications' }, { status: 500 });

    }
    return NextResponse.json( {msg:"aplication canceled successfuly "});

  } catch (error) {
    console.error("Error fetching applications:", error);

    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

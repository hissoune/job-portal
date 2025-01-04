import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from '@/app/lib/db';
import Application from '@/app/models/Aplication';
import { log } from 'console';

export async function PATCH(req: NextRequest) {
  const AplicationId = req.nextUrl.searchParams.get('AplicationId');

  if (!AplicationId) {
    return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
  }

  try {
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    await connectToDatabase();

    const updatedApplication = await Application.findByIdAndUpdate(
      AplicationId,
      { status },
      { new: true } 
    );

    if (!updatedApplication) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ msg: "Application status updated successfully", application: updatedApplication });

  } catch (error) {
    console.error("Error updating application status:", error);

    return NextResponse.json({ error: 'Failed to update application status' }, { status: 500 });
  }
}

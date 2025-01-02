import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { connectToDatabase } from '@/app/lib/db';
import Application from '@/app/models/Aplication';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  
  try {
    await connectToDatabase();

    const formData = await req.formData();
    const userId = formData.get('userId') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const note = formData.get('note') as string;
    const resumeFile = formData.get('resume') as File;

    if (!resumeFile) {
      return NextResponse.json({ error: 'Resume file is required' }, { status: 400 });
    }

    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'resumes' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const newApplication = new Application({
      userId,
      jobTitle,
      note,
      resume: (cloudinaryResponse as any).secure_url,
      status: 'pending',
    });

    await newApplication.save();

    return NextResponse.json({ message: 'Application submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}


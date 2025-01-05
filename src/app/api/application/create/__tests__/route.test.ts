import { NextRequest, NextResponse } from 'next/server';
import { POST } from '../route';
import { connectToDatabase } from '@/app/lib/db';
import Application from '@/app/models/Aplication';
import { v2 as cloudinary } from 'cloudinary';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({ 
      status: init?.status || 200,
      json: async () => body
    }))
  },
  NextRequest: jest.fn().mockImplementation(() => ({
    formData: jest.fn(),
  }))
}));

jest.mock('../../../../lib/db', () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock('../../../../models/Aplication', () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue({}),
  }));
});

jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload_stream: jest.fn(),
    },
  },
}));

describe('POST /api/applications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should submit application successfully', async () => {
    const mockFile = {
      arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
    };

    const mockFormData = {
      get: jest.fn((key) => {
        if (key === 'userId') return 'user123';
        if (key === 'jobTitle') return 'Software Engineer';
        if (key === 'note') return 'Excited to apply!';
        if (key === 'resume') return mockFile;
      }),
    };

    const req = new NextRequest('http://localhost:3000/api/applications');
    req.formData = jest.fn().mockResolvedValue(mockFormData);

    const mockCloudinaryResponse = { secure_url: 'https://cloudinary.com/resume.pdf' };
    cloudinary.uploader.upload_stream = jest.fn().mockImplementation((options, callback) => {
      callback(null, mockCloudinaryResponse);
      return { end: jest.fn() };
    });

    const response = await POST(req);
    const responseBody = await response.json();

    expect(response.status).toBe(201);
    expect(responseBody).toEqual({ message: 'Application submitted successfully' });
    expect(connectToDatabase).toHaveBeenCalled();
    expect(Application).toHaveBeenCalledWith({
      userId: 'user123',
      jobTitle: 'Software Engineer',
      note: 'Excited to apply!',
      resume: 'https://cloudinary.com/resume.pdf',
      status: 'pending',
    });
    expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
      { folder: 'resumes' },
      expect.any(Function)
    );
  });

  it('should return 400 if resume file is missing', async () => {
    const mockFormData = {
      get: jest.fn((key) => {
        if (key === 'userId') return 'user123';
        if (key === 'jobTitle') return 'Software Engineer';
        if (key === 'note') return 'Excited to apply!';
        if (key === 'resume') return null;
      }),
    };

    const req = new NextRequest('http://localhost:3000/api/applications');
    req.formData = jest.fn().mockResolvedValue(mockFormData);

    const response = await POST(req);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody).toEqual({ error: 'Resume file is required' });
    expect(connectToDatabase).toHaveBeenCalled();
    expect(Application).not.toHaveBeenCalled();
    expect(cloudinary.uploader.upload_stream).not.toHaveBeenCalled();
  });

  it('should return 500 if there is a server error', async () => {
    const mockFile = {
      arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
    };

    const mockFormData = {
      get: jest.fn((key) => {
        if (key === 'userId') return 'user123';
        if (key === 'jobTitle') return 'Software Engineer';
        if (key === 'note') return 'Excited to apply!';
        if (key === 'resume') return mockFile;
      }),
    };

    const req = new NextRequest('http://localhost:3000/api/applications');
    req.formData = jest.fn().mockResolvedValue(mockFormData);

    cloudinary.uploader.upload_stream = jest.fn().mockImplementation((options, callback) => {
      callback(new Error('Cloudinary error'), null);
      return { end: jest.fn() };
    });

    const response = await POST(req);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'Failed to submit application' });
    expect(connectToDatabase).toHaveBeenCalled();
    expect(Application).not.toHaveBeenCalled();
    expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
      { folder: 'resumes' },
      expect.any(Function)
    );
  });
});


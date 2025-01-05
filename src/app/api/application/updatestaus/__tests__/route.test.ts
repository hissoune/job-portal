import { NextRequest, NextResponse } from 'next/server';
import { PATCH } from '../route';
import Application from '@/app/models/Aplication';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({ 
      status: init?.status || 200,
      json: async () => body
    }))
  },
  NextRequest: jest.fn().mockImplementation((url) => ({
    nextUrl: new URL(url),
    json: jest.fn()
  }))
}));

jest.mock('../../../../lib/db', () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock('../../../../models/Aplication', () => ({
  findByIdAndUpdate: jest.fn(),
}));

describe('PATCH /api/application/updatestaus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update application status successfully', async () => {
    const mockApplication = {
      _id: '123',
      status: 'approved',
    };

    (Application.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockApplication);

    const req = new NextRequest('http://localhost:3000/api/application/updatestaus?AplicationId=123');
    (req.json as jest.Mock).mockResolvedValue({ status: 'approved' });

    const response = await PATCH(req);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual({
      msg: 'Application status updated successfully',
      application: mockApplication,
    });
    expect(Application.findByIdAndUpdate).toHaveBeenCalledWith('123', { status: 'approved' }, { new: true });
  });

  it('should return 400 if AplicationId is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/application/updatestaus');

    const response = await PATCH(req);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody).toEqual({ error: 'Application ID is required' });
  });

  it('should return 400 if status is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/application/updatestaus?AplicationId=123');
    (req.json as jest.Mock).mockResolvedValue({});

    const response = await PATCH(req);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody).toEqual({ error: 'Status is required' });
  });

  it('should return 404 if application is not found', async () => {
    (Application.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const req = new NextRequest('http://localhost:3000/api/application/updatestaus?AplicationId=123');
    (req.json as jest.Mock).mockResolvedValue({ status: 'approved' });

    const response = await PATCH(req);
    const responseBody = await response.json();

    expect(response.status).toBe(404);
    expect(responseBody).toEqual({ error: 'Application not found' });
  });

  it('should return 500 if there is a server error', async () => {
    (Application.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Database error'));

    const req = new NextRequest('http://localhost:3000/api/application/updatestaus?AplicationId=123');
    (req.json as jest.Mock).mockResolvedValue({ status: 'approved' });

    const response = await PATCH(req);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'Failed to update application status' });
  });
});


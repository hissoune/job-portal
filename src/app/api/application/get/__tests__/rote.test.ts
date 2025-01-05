import { NextRequest, NextResponse } from 'next/server';
import { GET } from '../route';
import { connectToDatabase } from '@/app/lib/db';
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
  }))
}));

jest.mock('../../../../lib/db', () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock('../../../../models/Aplication', () => ({
  find: jest.fn(),
}));

describe('GET /api/applications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch applications successfully', async () => {
    const mockApplications = [
      { _id: '1', userId: 'user1', status: 'pending' },
      { _id: '2', userId: 'user1', status: 'approved' },
    ];

    (Application.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockApplications),
    });

    const req = new NextRequest('http://localhost:3000/api/applications?userId=user1');

    const response = await GET(req);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual(mockApplications);
    expect(Application.find).toHaveBeenCalledWith({ userId: 'user1' });
    expect(connectToDatabase).toHaveBeenCalled();
  });

  it('should return 401 if userId is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/applications');

    const response = await GET(req);
    const responseBody = await response.json();

    expect(response.status).toBe(401);
    expect(responseBody).toEqual({ error: 'You have to be authenticated' });
    expect(Application.find).not.toHaveBeenCalled();
    expect(connectToDatabase).not.toHaveBeenCalled();
  });

  it('should return 500 if there is a server error', async () => {
    (Application.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error('Database error')),
    });

    const req = new NextRequest('http://localhost:3000/api/applications?userId=user1');

    const response = await GET(req);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'Failed to fetch applications' });
    expect(Application.find).toHaveBeenCalledWith({ userId: 'user1' });
    expect(connectToDatabase).toHaveBeenCalled();
  });
});


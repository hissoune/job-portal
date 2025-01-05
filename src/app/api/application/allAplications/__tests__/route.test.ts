import { NextResponse } from 'next/server';
import { GET } from '../route';
import { connectToDatabase } from '@/app/lib/db';
import Application from '@/app/models/Aplication';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({ 
      status: init?.status || 200,
      json: async () => body
    }))
  }
}));

jest.mock('../../../../lib/db', () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock('../../../../models/Aplication', () => ({
  find: jest.fn().mockReturnThis(),
  populate: jest.fn(),
}));

describe('GET /api/applications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all applications successfully', async () => {
    const mockApplications = [
      { _id: 'app1', userId: { _id: 'user1', name: 'John Doe' }, jobTitle: 'Software Engineer' },
      { _id: 'app2', userId: { _id: 'user2', name: 'Jane Smith' }, jobTitle: 'Data Scientist' },
    ];

    (Application.find().populate as jest.Mock).mockResolvedValue(mockApplications);

    const response = await GET();
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual(mockApplications);
    expect(connectToDatabase).toHaveBeenCalled();
    expect(Application.find).toHaveBeenCalled();
    expect(Application.find().populate).toHaveBeenCalledWith("userId");
  });

  it('should return 500 if there is a server error', async () => {
    (Application.find().populate as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await GET();
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'Failed to fetch applications' });
    expect(connectToDatabase).toHaveBeenCalled();
    expect(Application.find).toHaveBeenCalled();
    expect(Application.find().populate).toHaveBeenCalledWith("userId");
  });
});


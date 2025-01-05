import { NextRequest, NextResponse } from 'next/server';
import { DELETE } from '../route';
import { connectToDatabase } from '@/app/lib/db';
import Application from '@/app/models/Aplication';

// Mock the next/server module
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

// Mock the database connection
jest.mock('../../../../lib/db', () => ({
  connectToDatabase: jest.fn(),
}));

// Mock the Application model
jest.mock('../../../../models/Aplication', () => ({
  findByIdAndDelete: jest.fn(),
}));

describe('DELETE /api/application', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete application successfully', async () => {
    const mockApplication = { _id: 'app123', userId: 'user123', jobTitle: 'Software Engineer' };
    (Application.findByIdAndDelete as jest.Mock).mockResolvedValue(mockApplication);

    const req = new NextRequest('http://localhost:3000/api/application/delete?AplicationId=app123');

    const response = await DELETE(req);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual({ msg: "aplication canceled successfuly " });
    expect(connectToDatabase).toHaveBeenCalled();
    expect(Application.findByIdAndDelete).toHaveBeenCalledWith('app123');
  });

  it('should return 401 if AplicationId is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/application/delete');

    const response = await DELETE(req);
    const responseBody = await response.json();

    expect(response.status).toBe(401);
    expect(responseBody).toEqual({ error: 'You have to be authenticated' });
    expect(connectToDatabase).not.toHaveBeenCalled();
    expect(Application.findByIdAndDelete).not.toHaveBeenCalled();
  });

  it('should return 500 if application is not found', async () => {
    (Application.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const req = new NextRequest('http://localhost:3000/api/application/delete?AplicationId=nonexistent');

    const response = await DELETE(req);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'Failed to delete applications' });
    expect(connectToDatabase).toHaveBeenCalled();
    expect(Application.findByIdAndDelete).toHaveBeenCalledWith('nonexistent');
  });

  it('should return 500 if there is a server error', async () => {
    (Application.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Database error'));

    const req = new NextRequest('http://localhost:3000/api/application/delete?AplicationId=app123');

    const response = await DELETE(req);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'Failed to fetch applications' });
    expect(connectToDatabase).toHaveBeenCalled();
    expect(Application.findByIdAndDelete).toHaveBeenCalledWith('app123');
  });
});


import { NextResponse } from 'next/server';
import { POST } from '../route';
import { connectToDatabase } from '@/app/lib/db';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({
      status: init?.status || 200,
      json: async () => body,
      headers: new Map()
    }))
  }
}));

jest.mock('../../../../lib/db', () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock('../../../../models/User', () => ({
  findOne: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('cookie', () => ({
  serialize: jest.fn(),
}));

describe('POST /api/auth/login', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.JWT_SECRET = 'test_secret';
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should login user successfully', async () => {
    const mockUser = {
      _id: 'user123',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword',
      role: 'user'
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue({ email: 'john@example.com', password: 'password123' }),
    };

    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mock_token');
    (serialize as jest.Mock).mockReturnValue('mock_cookie');

    const response = await POST(mockRequest as unknown as Request);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual({ role: 'user' });
    expect(response.headers.get('Set-Cookie')).toBe('mock_cookie');
    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 'user123', name: 'John Doe', email: 'john@example.com', role: 'user' },
      'test_secret',
      { expiresIn: '1000h' }
    );
    expect(serialize).toHaveBeenCalledWith('auth_token', 'mock_token', expect.objectContaining({
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
      expires: expect.any(Date)
    }));
  });

  it('should return 401 for invalid email', async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({ email: 'nonexistent@example.com', password: 'password123' }),
    };

    (User.findOne as jest.Mock).mockResolvedValue(null);

    const response = await POST(mockRequest as unknown as Request);
    const responseBody = await response.json();

    expect(response.status).toBe(401);
    expect(responseBody).toEqual({ error: 'Invalid email or password' });
  });

  it('should return 401 for invalid password', async () => {
    const mockUser = {
      _id: 'user123',
      email: 'john@example.com',
      password: 'hashedPassword',
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue({ email: 'john@example.com', password: 'wrongpassword' }),
    };

    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const response = await POST(mockRequest as unknown as Request);
    const responseBody = await response.json();

    expect(response.status).toBe(401);
    expect(responseBody).toEqual({ error: 'Invalid email or password' });
  });

  it('should return 500 for server error', async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({ email: 'john@example.com', password: 'password123' }),
    };

    (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await POST(mockRequest as unknown as Request);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'Internal Server Error' });
  });
});


import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginRequest, LoginResponse, User } from '../types';

const router = Router();

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@mileapp.com',
    password: bcrypt.hashSync('password123', 10),
    name: 'Admin User',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'user@mileapp.com',
    password: bcrypt.hashSync('user123', 10),
    name: 'Regular User',
    createdAt: new Date('2024-01-02')
  }
];

const JWT_SECRET = process.env.JWT_SECRET || 'mock-jwt-secret-key-for-development';

// POST /login
router.post('/login', async (req: Request<{}, LoginResponse, LoginRequest>, res: Response<LoginResponse>) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success response
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
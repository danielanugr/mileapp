import bcrypt from 'bcryptjs';
import { User } from '../types';

export const mockUsers: User[] = [
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
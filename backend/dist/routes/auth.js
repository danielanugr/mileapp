"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
// Mock users database
const mockUsers = [
    {
        id: '1',
        email: 'admin@mileapp.com',
        password: bcryptjs_1.default.hashSync('password123', 10),
        name: 'Admin User',
        createdAt: new Date('2024-01-01')
    },
    {
        id: '2',
        email: 'user@mileapp.com',
        password: bcryptjs_1.default.hashSync('user123', 10),
        name: 'Regular User',
        createdAt: new Date('2024-01-02')
    }
];
const JWT_SECRET = process.env.JWT_SECRET || 'mock-jwt-secret-key-for-development';
// POST /login
router.post('/login', async (req, res) => {
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
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email
        }, JWT_SECRET, { expiresIn: '24h' });
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
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map
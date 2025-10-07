// src/routes/authRoutes.js
import express from 'express';
const router = express.Router();

import { register, login, logout, refreshToken } from '../controllers/authController.js';
import { authMiddleware, requireRole } from '../middlewares/authMiddleware.js';

// public routes
router.post('/register', register);       // buat peminjam
router.post('/login', login);             // login admin/peminjam
router.post('/refresh', refreshToken);
router.post('/logout', logout);

// protected example
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// admin-only route
router.get('/admin/dashboard', authMiddleware, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome admin' });
});

// custom logout route untuk admin
router.get('/admin/logout', (req, res) => {
  res.clearCookie('token');      
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.redirect('http://localhost:5173/login'); // arahkan ke frontend login
});

export default router;

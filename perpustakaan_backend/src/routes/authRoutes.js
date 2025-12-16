// src/routes/authRoutes.js
import express from 'express';
const router = express.Router();

import {
  register,
  login,
  logout,
  refreshToken,
} from '../controllers/authController.js';

import {
  authMiddleware,
  requireRole,
} from '../middlewares/authMiddleware.js';

// =====================
// PUBLIC ROUTES
// =====================
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);

// 🔥 LOGOUT SUPPORT GET + POST (ADMINJS & FRONTEND)
router.get('/logout', logout);
router.post('/logout', logout);

// =====================
// PROTECTED ROUTES
// =====================
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// =====================
// ADMIN ONLY
// =====================
router.get(
  '/admin/dashboard',
  authMiddleware,
  requireRole('admin'),
  (req, res) => {
    res.json({ message: 'Welcome admin' });
  }
);

export default router;

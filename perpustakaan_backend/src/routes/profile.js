import express from 'express';
import db from '../models/index.js'; // atau sesuai path model kamu
import { authMiddleware, requireRole } from '../middlewares/authMiddleware.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role'],
    });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json(user);
  } catch (err) {
    console.error('❌ Error ambil profil:', err);
    res.status(500).json({ message: 'Gagal ambil profil' });
  }
});

export default router;
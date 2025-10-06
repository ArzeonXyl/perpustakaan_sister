const express = require('express');
const router = express.Router();

const { register, login, logout, refreshToken } = require('../controllers/authController');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');

// public
router.post('/register', register);       // buat peminjam
router.post('/login', login);             // login admin/peminjam
router.post('/refresh', refreshToken);
router.post('/logout', logout);

// protected examples
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// admin-only route
router.get('/admin/dashboard', authMiddleware, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome admin' });
});
router.post('/logout', (req, res) => {
  res.clearCookie('token') // hapus cookie JWT admin
  res.status(200).json({
    message: 'Logout berhasil',
    redirect: '/login' // arahkan balik ke login admin
  })
});

module.exports = router;

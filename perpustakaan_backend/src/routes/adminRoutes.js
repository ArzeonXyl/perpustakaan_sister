// src/routes/logoutRoute.js
import express from 'express';
const router = express.Router();

router.post('/logout', (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: false, // true kalau pakai HTTPS
    sameSite: 'lax',
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });

  // ✅ Redirect ke frontend login page
  res.redirect('http://localhost:5173/login');
});

export default router;
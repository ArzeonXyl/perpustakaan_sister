import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware utama untuk verifikasi JWT.
 * Mendukung token dari cookie (Browser/Admin) atau header Authorization (API/App).
 */
export function verifyToken(req, res, next) {
  try {
    // 1. Cek Token: Prioritaskan Cookie 'token' (AdminJS), lalu 'accessToken', lalu Header
    const token =
      req.cookies?.token || 
      req.cookies?.accessToken || 
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      // 🔍 LOGIC PENTING: Browser vs API
      // Jika request minta HTML (Browser/AdminJS) dan bukan request ke /api
      if (req.accepts('html') && !req.path.startsWith('/api')) {
        // Redirect ke halaman login frontend/admin
        return res.redirect('/login'); 
      }

      console.warn(`🔒 Token tidak ditemukan di: ${req.originalUrl}`);
      return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    // 2. Verifikasi JWT
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, email, role }
    next();

  } catch (err) {
    console.error('❌ Token Error:', err.message);

    // Jika token expired saat akses via Browser, redirect ke login
    if (req.accepts('html') && !req.path.startsWith('/api')) {
      return res.redirect('/login?error=session_expired');
    }

    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Alias middleware untuk pengguna biasa
 */
export const authMiddleware = verifyToken;
export const authUser = verifyToken;

/**
 * Middleware untuk membatasi akses berdasarkan peran
 */
export function requireRole(role) {
  return (req, res, next) => {
    // Cek apakah user sudah login (dari verifyToken)
    if (!req.user) {
      if (req.accepts('html') && !req.path.startsWith('/api')) {
         return res.redirect('/login');
      }
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Cek Role
    if (req.user.role !== role) {
      console.warn(`🚫 Role '${req.user.role}' dilarang akses '${role}'`);
      
      // Jika Admin mencoba akses halaman yang dilarang via browser
      if (req.accepts('html') && !req.path.startsWith('/api')) {
         // Opsional: Redirect ke dashboard atau tampilkan error 403 sederhana
         return res.status(403).send('<h1>403 Forbidden: Anda tidak memiliki akses ke halaman ini.</h1>');
      }

      return res.status(403).json({ error: 'Forbidden: Insufficient rights' });
    }

    next();
  };
}

/**
 * Middleware gabungan untuk admin
 */
export const authAdmin = [verifyToken, requireRole('admin')];
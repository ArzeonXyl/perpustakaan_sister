import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware utama untuk verifikasi JWT.
 * Mendukung token dari cookie atau header Authorization.
 */
export function verifyToken(req, res, next) {
  try {
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      console.warn('🔒 Token tidak ditemukan');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, email, role }
    next();
  } catch (err) {
    console.error('❌ Token tidak valid:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
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
    if (!req.user) {
      console.warn('🔒 Akses tanpa autentikasi');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.user.role !== role) {
      console.warn(`🚫 Role '${req.user.role}' tidak diizinkan untuk akses '${role}'`);
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
}

/**
 * Middleware gabungan untuk admin
 */
export const authAdmin = [verifyToken, requireRole('admin')];
import dotenv from 'dotenv';
dotenv.config();

import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '../validators/authValidator.js';
import {
  addRefreshToken,
  removeRefreshTokenForUser,
} from '../utils/refreshHelper.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1d';
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const REFRESH_EXPIRES = process.env.REFRESH_EXPIRES || '7d';

const FRONTEND_URL = process.env.FRONTEND_URL;

/* ===============================
   JWT HELPERS
================================ */
function signAccessToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

function signRefreshToken(user) {
  return jwt.sign({ id: user.id }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES,
  });
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    secure: process.env.NODE_ENV === 'production',
  };
}

/* ===============================
   REGISTER
================================ */
export async function register(req, res) {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error)
      return res.status(400).json({ error: error.details[0].message });

    const { nik, phone, email, name, gender, password } = value;

    const [[nikExists]] = await pool.query(
      'SELECT id FROM users WHERE nik = ?',
      [nik]
    );
    if (nikExists)
      return res.status(409).json({ error: 'NIK sudah terdaftar' });

    const [[emailExists]] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    if (emailExists)
      return res.status(409).json({ error: 'Email sudah terdaftar' });

    const password_hash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users 
        (nik, phone, email, name, gender, password_hash, role)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nik, phone, email, name, gender, password_hash, 'peminjam']
    );

    return res.status(201).json({
      message: 'Registrasi berhasil',
      userId: result.insertId,
    });
  } catch (err) {
    console.error('REGISTER ERROR:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

/* ===============================
   LOGIN
================================ */
export async function login(req, res) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ error: error.details[0].message });

    const { email, password } = value;

    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (!rows.length)
      return res.status(401).json({ error: 'Email tidak terdaftar' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(401).json({ error: 'Password salah' });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    await addRefreshToken(user.id, refreshToken);

    res.cookie('token', accessToken, {
      ...cookieOptions(),
      maxAge: 24 * 60 * 60 * 1000, // 24 jam
    });

    res.cookie('refreshToken', refreshToken, {
      ...cookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: 'Login berhasil',
      role: user.role,
      redirect: user.role === 'admin' ? '/admin' : '/dashboard',
      token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

/* ===============================
   LOGOUT (GET & POST SAFE)
================================ */
export async function logout(req, res) {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
        await removeRefreshTokenForUser(decoded.id, refreshToken);
      } catch {
        // refresh token invalid / expired → ignore
      }
    }

    res.clearCookie('token', cookieOptions());
    res.clearCookie('refreshToken', cookieOptions());

    // 🔥 SINGLE SOURCE OF TRUTH
    return res.redirect(`${FRONTEND_URL}/login`);
  } catch (err) {
    console.error('LOGOUT ERROR:', err);

    // Fail-safe
    res.clearCookie('token');
    res.clearCookie('refreshToken');

    return res.redirect(`${FRONTEND_URL}/login`);
  }
}

/* ===============================
   REFRESH TOKEN
================================ */
export async function refreshToken(req, res) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token)
      return res.status(401).json({ error: 'No refresh token' });

    const decoded = jwt.verify(token, REFRESH_SECRET);

    const [rows] = await pool.query(
      'SELECT * FROM refresh_tokens WHERE user_id = ? AND token = ?',
      [decoded.id, token]
    );
    if (!rows.length)
      return res.status(401).json({ error: 'Invalid refresh token' });

    const [userRows] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [decoded.id]
    );
    if (!userRows.length)
      return res.status(401).json({ error: 'User not found' });

    const user = userRows[0];
    const newAccessToken = signAccessToken(user);

    res.cookie('token', newAccessToken, {
      ...cookieOptions(),
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: 'Access token diperbarui',
      token: newAccessToken,
    });
  } catch (err) {
    console.error('REFRESH ERROR:', err);
    return res.status(401).json({ error: 'Token tidak valid' });
  }
}

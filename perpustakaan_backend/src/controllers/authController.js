import dotenv from 'dotenv';
dotenv.config();

import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '../validators/authValidator.js';
import { addRefreshToken, removeRefreshTokenForUser } from '../utils/refreshHelper.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1h';
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const REFRESH_EXPIRES = process.env.REFRESH_EXPIRES || '7d';

/* ===============================
   Helper JWT
================================ */
function signAccessToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

function signRefreshToken(user) {
  return jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
}

/* ===============================
   REGISTER
================================ */
export async function register(req, res) {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { nik, phone, email, name, gender, password } = value;

    const [nikRows] = await pool.query('SELECT id FROM users WHERE nik = ?', [nik]);
    if (nikRows.length) return res.status(409).json({ error: 'NIK sudah terdaftar' });

    const [emailRows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (emailRows.length) return res.status(409).json({ error: 'Email sudah terdaftar' });

    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (nik, phone, email, name, gender, password_hash, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nik, phone, email, name, gender, password_hash, 'peminjam']
    );

    return res.status(201).json({ message: 'Registrasi berhasil', userId: result.insertId });
  } catch (err) {
    console.error('❌ Register error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

/* ===============================
   LOGIN
================================ */
export async function login(req, res) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = value;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ error: 'Email tidak terdaftar' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Password salah' });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    await addRefreshToken(user.id, refreshToken);

    const cookieOptions = {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      secure: process.env.NODE_ENV === 'production',
    };

    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 1000 * 60 * 60 });
    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 1000 * 60 * 60 * 24 * 7 });

    let redirectTo = '/dashboard';
    if (user.role === 'admin') redirectTo = '/admin';

    return res.json({
      message: 'Login berhasil',
      role: user.role,
      redirect: redirectTo,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

/* ===============================
   LOGOUT
================================ */
export async function logout(req, res) {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
        await removeRefreshTokenForUser(decoded.id, refreshToken);
      } catch {
        // token expired / invalid → abaikan
      }
    }

    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    // ✅ Redirect ke frontend login
    return res.redirect('http://localhost:5173/login');
  } catch (err) {
    console.error('❌ Logout error:', err);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    // ✅ Tetap redirect meskipun error
    return res.redirect('http://localhost:5173/login');
  }
}

/* ===============================
   REFRESH TOKEN
================================ */
export async function refreshToken(req, res) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ error: 'No refresh token' });

    const decoded = jwt.verify(token, REFRESH_SECRET);
    const userId = decoded.id;

    const [rows] = await pool.query(
      'SELECT * FROM refresh_tokens WHERE user_id = ? AND token = ?',
      [userId, token]
    );
    if (rows.length === 0)
      return res.status(401).json({ error: 'Invalid refresh token' });

    const [userRows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (userRows.length === 0)
      return res.status(401).json({ error: 'User not found' });

    const user = userRows[0];
    const newAccess = signAccessToken(user);

    res.cookie('accessToken', newAccess, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60,
    });

    return res.json({ message: 'Access token diperbarui' });
  } catch (err) {
    console.error('❌ Refresh token error:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
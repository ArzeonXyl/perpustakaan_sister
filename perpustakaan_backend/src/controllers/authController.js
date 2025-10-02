require('dotenv').config();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const { addRefreshToken, removeRefreshTokenForUser } = require('../utils/refreshHelper');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1h';
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const REFRESH_EXPIRES = process.env.REFRESH_EXPIRES || '7d';

function signAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}
function signRefreshToken(user) {
  return jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
}

async function register(req, res) {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { nik, phone, email, name, gender, password } = value;

    // check duplicate nik/email
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
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function login(req, res) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    console
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = value;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid email' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid password' });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    // store refresh token in DB with expiry
    await addRefreshToken(user.id, refreshToken);

    // set cookies
    const cookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production' && process.env.COOKIE_SECURE === 'true',
      // optional: maxAge based on REFRESH_EXPIRES
    };

    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 1000 * 60 * 60 }); // 1 hour
    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 1000 * 60 * 60 * 24 * 7 }); // 7 days

    return res.json({ message: 'Login successful', role: user.role });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function logout(req, res) {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      // delete from DB
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
      await removeRefreshTokenForUser(decoded.id, refreshToken).catch(()=>{});
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ message: 'Logged out' });
  } catch (err) {
    console.error(err);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: 'Logged out' });
  }
}

async function refreshToken(req, res) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ error: 'No refresh token' });

    const decoded = jwt.verify(token, REFRESH_SECRET);
    const userId = decoded.id;

    // verify token exists in DB
    const [rows] = await pool.query('SELECT * FROM refresh_tokens WHERE user_id = ? AND token = ?', [userId, token]);
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid refresh token' });

    // create new access token
    const [userRows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (userRows.length === 0) return res.status(401).json({ error: 'User not found' });

    const user = userRows[0];
    const newAccess = signAccessToken(user);
    res.cookie('accessToken', newAccess, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production' && process.env.COOKIE_SECURE === 'true'
    });
    return res.json({ message: 'Access token refreshed' });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { register, login, logout, refreshToken };

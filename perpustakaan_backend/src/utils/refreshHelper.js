// src/utils/refreshHelper.js
import pool from '../db.js';

async function addRefreshToken(userId, token) {
  // simple 7 days expiry
  const days = 7;
  const expires_at = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  await pool.query(
    'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
    [userId, token, expires_at]
  );
}

async function removeRefreshTokenForUser(userId, token) {
  await pool.query(
    'DELETE FROM refresh_tokens WHERE user_id = ? AND token = ?',
    [userId, token]
  );
}

export { addRefreshToken, removeRefreshTokenForUser };

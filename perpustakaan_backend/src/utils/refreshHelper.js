const pool = require('../db');
const ms = require('ms'); // optional (but we didn't install ms -> skip) 

async function addRefreshToken(userId, token) {
  // compute expiry from REFRESH_EXPIRES, but simple: 7 days
  const days = 7;
  const expires_at = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  await pool.query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)', [userId, token, expires_at]);
}

async function removeRefreshTokenForUser(userId, token) {
  await pool.query('DELETE FROM refresh_tokens WHERE user_id = ? AND token = ?', [userId, token]);
}

module.exports = { addRefreshToken, removeRefreshTokenForUser };

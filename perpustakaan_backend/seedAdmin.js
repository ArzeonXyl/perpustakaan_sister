require('dotenv').config();
const pool = require('./db');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    const nik = '0000000000000001';
    const phone = '081234567890';
    const email = 'admin@perpus.test';
    const name = 'Super Admin';
    const gender = 'L';
    const password = 'AdminPass123'; // ganti pas real
    const hash = await bcrypt.hash(password, 10);

    // skip if exists
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length) {
      console.log('Admin sudah ada');
      process.exit(0);
    }
    const [r] = await pool.query('INSERT INTO users (nik, phone, email, name, gender, password_hash, role) VALUES (?, ?, ?, ?, ?, ?, ?)', [nik, phone, email, name, gender, hash, 'admin']);
    console.log('Admin created with id', r.insertId);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
seed();

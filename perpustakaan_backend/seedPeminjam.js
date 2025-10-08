import dotenv from 'dotenv';
import pool from './src/db.js';
import bcrypt from 'bcrypt';

dotenv.config();

async function seed() {
  try {
    const nik = '0000000000000003';
    const phone = '081234567891';
    const email = 'peminjam@gmail.com';
    const name = 'Peminjam Satu';
    const gender = 'L';
    const password = 'peminjam123'; // ganti pas real
    const hash = await bcrypt.hash(password, 10);

    // skip if exists
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length) {
      console.log('Peminjam sudah ada');
      process.exit(0);
    }

    const [r] = await pool.query(
      'INSERT INTO users (nik, phone, email, name, gender, password_hash, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nik, phone, email, name, gender, hash, 'peminjam']
    );
    console.log('Peminjam created with id', r.insertId);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
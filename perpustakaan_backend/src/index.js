// src/index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import setupAdmin from './admin/admin.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import sequelize from './models/index.js';


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // ganti sesuai alamat frontend
  credentials: true,
}));

// bungkus semua auth route pakai prefix /api
app.use('/api', authRoutes);

// setup AdminJS
await setupAdmin(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

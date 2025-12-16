// src/index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import routes & db
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import borrowingsRoutes from './routes/borrowingsRoutes.js';
import profileRoutes from './routes/profile.js';
import db from './models/index.js';
import setupAdmin from './admin/admin.js';

// 👇 Import Socket Helper
import { initSocket } from './socket.js';

const app = express();
const server = http.createServer(app);

// 👇 Inisialisasi Socket.IO
const io = initSocket(server);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

// Routes
app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', borrowingsRoutes);
app.use('/api', profileRoutes);

// Socket Connection Listener (Simple Log)
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);
  
  socket.on('joinAdminRoom', () => {
    socket.join('admin-room');
    console.log('👤 Admin joined room');
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Setup AdminJS
await setupAdmin(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connected');
    // await db.sequelize.sync({ alter: false }); // Gunakan jika perlu sync
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
  }
});

// ❌ TIDAK ADA LAGI startDBPolling() DISINI
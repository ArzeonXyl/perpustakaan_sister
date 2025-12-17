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

// Socket helper
import { initSocket } from './socket.js';

const app = express();
const server = http.createServer(app);

// Init Socket.IO (tanpa logging)
initSocket(server);

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Routes
app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', borrowingsRoutes);
app.use('/api', profileRoutes);

// Setup AdminJS
await setupAdmin(app);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  await db.sequelize.authenticate();
});

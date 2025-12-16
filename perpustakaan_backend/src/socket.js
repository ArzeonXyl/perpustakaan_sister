import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      // Sesuaikan dengan URL frontend user (5173) dan admin/backend (3000)
      origin: ['http://localhost:5173', 'http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true
    },
    path: '/socket.io/'
  });
  return io;
};

// Fungsi ini akan dipanggil di Controller/Resource untuk broadcast
export const getIO = () => {
  if (!io) {
    console.warn('⚠️ Socket.IO belum diinisialisasi!');
    return { emit: () => {} }; // Dummy function biar gak crash
  }
  return io;
};
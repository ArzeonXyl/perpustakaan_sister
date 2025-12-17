import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    path: '/socket.io/',
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    return { emit: () => {} };
  }
  return io;
};

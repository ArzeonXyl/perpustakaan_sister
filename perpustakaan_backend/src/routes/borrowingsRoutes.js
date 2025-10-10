import express from 'express';
import {
  requestBorrowing,       // user request peminjaman
  approveBorrowing,       // admin menyetujui
  rejectBorrowing,        // admin menolak
  getUserBorrowings,      // user melihat histori peminjaman
  returnBorrowing,        // admin mengembalikan buku
} from '../controllers/borrowingsController.js';

import { authUser, authAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 🔹 User mengirim request peminjaman
router.post('/borrowings/request', authUser, requestBorrowing);

// 🔹 Admin menyetujui peminjaman
router.patch('/borrowings/:id/approve', authAdmin, approveBorrowing);

// 🔹 Admin menolak peminjaman
router.patch('/borrowings/:id/reject', authAdmin, rejectBorrowing);

// 🔹 Admin mengembalikan buku
router.patch('/borrowings/:id/return', authAdmin, returnBorrowing);

// 🔹 User melihat semua riwayat peminjaman miliknya
router.get('/borrowings/mine', authUser, getUserBorrowings);

export default router;
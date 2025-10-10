import db from '../models/index.js';

// 🔹 User request peminjaman
export const requestBorrowing = async (req, res) => {
  try {
    const { user_id, book_id } = req.body;

    const user = await db.User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    const book = await db.Book.findByPk(book_id);
    if (!book) return res.status(404).json({ error: 'Buku tidak ditemukan' });

    if (book.quantity <= 0) {
      return res.status(400).json({ error: 'Stok buku habis, tidak bisa dipinjam' });
    }

    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + 7);

    const borrowing = await db.Borrowings.create({
      user_id,
      book_id,
      borrow_date: today,
      due_date: due,
      status: 'Menunggu Persetujuan',
      fine_amount: 0.00,
    });

    res.status(201).json({
      message: 'Request peminjaman berhasil dikirim',
      borrowing,
    });
  } catch (err) {
    console.error('❌ Error saat request peminjaman:', err.message);
    res.status(500).json({ error: 'Gagal membuat request peminjaman' });
  }
};

// 🔹 Admin menyetujui peminjaman
export const approveBorrowing = async (req, res) => {
  try {
    const borrowing = await db.Borrowings.findByPk(req.params.id);
    if (!borrowing || borrowing.status !== 'Menunggu Persetujuan') {
      return res.status(400).json({ error: 'Request tidak valid atau sudah diproses' });
    }

    await borrowing.update({ status: 'Dipinjam' });

    res.json({
      message: 'Peminjaman disetujui',
      borrowing,
    });
  } catch (err) {
    console.error('❌ Error saat menyetujui peminjaman:', err.message);
    res.status(500).json({ error: 'Gagal menyetujui peminjaman' });
  }
};

// 🔹 Admin menolak peminjaman
export const rejectBorrowing = async (req, res) => {
  try {
    const borrowing = await db.Borrowings.findByPk(req.params.id);
    if (!borrowing || borrowing.status !== 'Menunggu Persetujuan') {
      return res.status(400).json({ error: 'Request tidak valid atau sudah diproses' });
    }

    await borrowing.update({ status: 'Ditolak' });

    res.json({
      message: 'Peminjaman ditolak',
      borrowing,
    });
  } catch (err) {
    console.error('❌ Error saat menolak peminjaman:', err.message);
    res.status(500).json({ error: 'Gagal menolak peminjaman' });
  }
};

// 🔹 Admin mengembalikan buku
export const returnBorrowing = async (req, res) => {
  try {
    const borrowing = await db.Borrowings.findByPk(req.params.id);
    if (!borrowing || !['Dipinjam', 'Terlambat'].includes(borrowing.status)) {
      return res.status(400).json({ error: 'Data peminjaman tidak valid untuk pengembalian' });
    }

    const today = new Date();
    const dueDate = new Date(borrowing.due_date);

    let status = 'Dikembalikan';
    let fine = 0;

    if (today > dueDate) {
      status = 'Terlambat';
      const daysLate = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
      fine = daysLate * 1000;
    }

    await borrowing.update({
      return_date: today,
      status,
      fine_amount: fine,
    });

    res.json({
      message: `Buku berhasil dikembalikan. Status: ${status}, Denda: Rp${fine}`,
      borrowing,
    });
  } catch (err) {
    console.error('❌ Error saat pengembalian buku:', err.message);
    res.status(500).json({ error: 'Gagal mengembalikan buku' });
  }
};

// 🔹 User melihat riwayat peminjaman
export const getUserBorrowings = async (req, res) => {
  try {
    const records = await db.Borrowings.findAll({
      where: { user_id: req.user.id },
      include: [{ model: db.Book }],
      order: [['borrow_date', 'DESC']],
    });

    res.json(records);
  } catch (err) {
    console.error('❌ Error saat mengambil riwayat peminjaman:', err.message);
    res.status(500).json({ error: 'Gagal mengambil data peminjaman' });
  }
};
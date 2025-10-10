import db from '../models/index.js';

export async function listBooks(req, res) {
  try {
    const books = await db.Book.findAll({
      include: {
        model: db.Category,
        as: 'category',
        attributes: ['name']
      }
    });
    res.json({ books });
  } catch (err) {
    console.error('❌ Error fetching books:', err);
    res.status(500).json({ error: 'Gagal mengambil data buku' });
  }
}
import db from '../../models/index.js';

export default {
  resource: db.Book,
  options: {
    navigation: 'Katalog',
    properties: {
      id: { isVisible: false }, // opsional: sembunyikan ID kalau tidak perlu
      title: { isTitle: true }, // ✅ tampilkan judul sebagai label utama
      author: { position: 2 },
      publisher: { position: 3 },
      stock: { position: 4 },
      createdAt: { isVisible: false },
      updatedAt: { isVisible: false },
    },
    actions: {
      // kamu bisa tambahkan custom action di sini kalau perlu
    },
  },
};
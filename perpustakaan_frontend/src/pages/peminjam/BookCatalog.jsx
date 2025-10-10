import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faBookOpen,
  faBookReader,
  faJournalWhills,
  faAtlas,
  faScroll,
  faHandHolding,
} from '@fortawesome/free-solid-svg-icons';

const icons = [faBook, faBookOpen, faBookReader, faJournalWhills, faAtlas, faScroll];

export default function BookCatalog() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('/api/list-book', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        const bookList = Array.isArray(data.books) ? data.books : [];
        setBooks(bookList);
      } catch (err) {
        console.error('❌ Gagal ambil data buku:', err);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  const handleBorrow = async (bookId) => {
    try {
      const res = await fetch('/api/borrowings/request', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book_id: bookId }),
      });

      if (!res.ok) throw new Error('Gagal meminjam buku');

      const result = await res.json();
      console.log('✅ Berhasil pinjam:', result);
      alert('Buku berhasil dipinjam!');
      setSelectedBook(null);
    } catch (err) {
      console.error('❌ Error saat pinjam:', err);
      alert('Gagal meminjam buku.');
    }
  };

  const chunkedBooks = [];
  for (let i = 0; i < books.length; i += 6) {
    chunkedBooks.push(books.slice(i, i + 6));
  }

  return (
    <>
      <div className="space-y-8">
        {chunkedBooks.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-4 overflow-x-auto px-2 py-1 scroll-smooth transition-all duration-500"
          >
            {row.map((book, index) => {
              const icon = icons[(rowIndex * 6 + index) % icons.length];

              return (
                <div
                  key={book.id}
                  className="min-w-[160px] bg-white shadow rounded overflow-hidden flex flex-col justify-between hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-full h-40 flex items-center justify-center text-blue-600 text-3xl">
                    <FontAwesomeIcon icon={icon} />
                  </div>

                  <div className="p-2">
                    <h2 className="text-sm font-semibold text-gray-800 truncate">{book.title}</h2>
                    <p className="text-xs text-gray-600 truncate">Penulis: {book.author}</p>
                    <p className="text-xs text-gray-600">Stok: {book.quantity}</p>
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="mt-2 w-full text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <FontAwesomeIcon icon={faHandHolding} className="text-blue-600 text-xl" />
              <h2 className="text-lg font-bold text-gray-800">{selectedBook.title}</h2>
            </div>

            <p className="text-sm text-gray-700 mb-2">
              <strong>Penulis:</strong> {selectedBook.author}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Tahun:</strong> {selectedBook.publication_year}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Stok:</strong> {selectedBook.quantity}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <strong>Deskripsi:</strong> {selectedBook.description}
            </p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setSelectedBook(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Kembali
              </button>
              <button
                onClick={() => handleBorrow(selectedBook.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Pinjam Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
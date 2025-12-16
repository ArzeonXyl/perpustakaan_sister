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
    faSearch,
} from '@fortawesome/free-solid-svg-icons';

const icons = [faBook, faBookOpen, faBookReader, faJournalWhills, faAtlas, faScroll];

export default function BookCatalog() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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
            
            // Opsional: Refresh buku setelah meminjam agar stok terupdate di tampilan
            // fetchBooks(); 
        } catch (err) {
            console.error('❌ Error saat pinjam:', err);
            alert('Gagal meminjam buku.');
        }
    };

    // 🔥 LOGIKA FILTERING BUKU 🔥
    const filteredBooks = books.filter(book => {
        const query = searchTerm.toLowerCase().trim();
        
        if (!query) {
            return true;
        }

        const safeString = (value) => String(value || '').toLowerCase();

        return (
            safeString(book.title).includes(query) ||
            safeString(book.author).includes(query) 
        );
    });

    const chunkedBooks = [];
    for (let i = 0; i < filteredBooks.length; i += 6) {
        chunkedBooks.push(filteredBooks.slice(i, i + 6));
    }

    const noResults = filteredBooks.length === 0 && searchTerm !== '';
    const isLoading = books.length === 0 && searchTerm === '';

    return (
        <>
            {/* SEARCH INPUT */}
            <div className="mb-6 flex items-center p-3 border border-gray-300 rounded-xl bg-gray-50 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition duration-200">
                <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-3" />
                <input
                    type="text"
                    placeholder="Cari buku berdasarkan judul, penulis, atau deskripsi..."
                    className="flex-1 bg-transparent focus:outline-none text-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {/* TAMPILAN KATALOG BUKU */}
            {isLoading ? (
                <div className="text-center py-10 text-gray-500">Memuat katalog buku...</div>
            ) : noResults ? (
                <div className="text-center py-10 text-gray-500">
                    Tidak ditemukan buku dengan kata kunci "{searchTerm}".
                </div>
            ) : (
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
                                            
                                            {/* Indikator Stok di Card */}
                                            <p className={`text-xs ${book.quantity > 0 ? 'text-gray-600' : 'text-red-500 font-bold'}`}>
                                                Stok: {book.quantity}
                                            </p>

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
            )}

            {/* MODAL DETAIL BUKU */}
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
                        
                        {/* Highlight Stok di Modal */}
                        <p className="text-sm text-gray-700 mb-2">
                            <strong>Stok:</strong> 
                            <span className={selectedBook.quantity > 0 ? "ml-1" : "ml-1 text-red-600 font-bold"}>
                                {selectedBook.quantity}
                            </span>
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

                            {/* 🔥 LOGIKA TOMBOL PINJAM 🔥 */}
                            {selectedBook.quantity > 0 ? (
                                <button
                                    onClick={() => handleBorrow(selectedBook.id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Pinjam Sekarang
                                </button>
                            ) : (
                                <button
                                    disabled
                                    className="bg-red-500 text-white px-4 py-2 rounded cursor-not-allowed opacity-80"
                                    title="Stok buku ini sedang habis, tidak dapat dipinjam."
                                    onClick={(e) => {
                                        e.preventDefault();
                                        alert("Maaf, stok buku ini sedang kosong. Tidak dapat melakukan peminjaman.");
                                    }}
                                >
                                    Stok Habis
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}




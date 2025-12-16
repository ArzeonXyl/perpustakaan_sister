import React, { useEffect, useState } from 'react';
import { Search, Book, Calendar, User, BookmarkPlus, Info, X } from 'lucide-react';
import Swal from 'sweetalert2';

export default function BookCatalog() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
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
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleBorrow = async (bookId) => {
        const result = await Swal.fire({
            title: 'Konfirmasi Peminjaman',
            text: "Apakah Anda yakin ingin meminjam buku ini?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2563eb', // blue-600
            cancelButtonColor: '#d1d5db', // gray-300
            confirmButtonText: 'Ya, Pinjam!',
            cancelButtonText: 'Batal',
            cancelButtonTextColor: '#374151' // gray-700
        });

        if (!result.isConfirmed) return;
        
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

            const apiResult = await res.json();
            
            Swal.fire({
                title: 'Berhasil!',
                text: 'Buku berhasil dipinjam! Silakan tunggu persetujuan admin.',
                icon: 'success',
                confirmButtonColor: '#2563eb'
            });
            
            setSelectedBook(null);
            
            // Update local state to reflect quantity change if needed
            // For now just alert is enough
        } catch (err) {
            console.error('❌ Error saat pinjam:', err);
            Swal.fire({
                title: 'Gagal!',
                text: 'Gagal meminjam buku. Mungkin stok habis atau Anda sudah meminjamnya.',
                icon: 'error',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    // 🔥 LOGIKA FILTERING BUKU 🔥
    const filteredBooks = books.filter(book => {
        const query = searchTerm.toLowerCase().trim();
        if (!query) return true;
        const safeString = (value) => String(value || '').toLowerCase();
        return (
            safeString(book.title).includes(query) ||
            safeString(book.author).includes(query) 
        );
    });

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Katalog Buku</h1>
                    <p className="text-gray-500 mt-1">Temukan dan pinjam buku favorit Anda dari koleksi kami.</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari judul atau penulis..."
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Content Section */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : filteredBooks.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <Book className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Tidak ada buku ditemukan</h3>
                    <p className="mt-1 text-gray-500">Coba kata kunci lain atau hubungi admin.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
                            {/* Book Cover Placeholder */}
                            <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden cursor-pointer" onClick={() => setSelectedBook(book)}>
                                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                                <Book size={64} className="text-blue-200 drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-blue-600 shadow-sm">
                                    {book.category?.name || 'Umum'}
                                </div>
                            </div>

                            {/* Book Info */}
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 
                                    className="text-lg font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors cursor-pointer"
                                    onClick={() => setSelectedBook(book)}
                                >
                                    {book.title}
                                </h3>
                                
                                <div className="space-y-2 mb-4 flex-1">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <User size={14} className="mr-2 text-gray-400" />
                                        <span className="truncate">{book.author}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar size={14} className="mr-2 text-gray-400" />
                                        <span>{book.publication_year}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 gap-2">
                                    <button
                                        onClick={() => setSelectedBook(book)}
                                        className="flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <Info size={16} className="mr-2" />
                                        Detail
                                    </button>
                                    
                                    <button
                                        onClick={() => handleBorrow(book.id)}
                                        disabled={book.quantity <= 0}
                                        className={`
                                            flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                            ${book.quantity > 0 
                                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 hover:shadow-lg' 
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                                        `}
                                    >
                                        <BookmarkPlus size={16} className="mr-2" />
                                        Pinjam
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Book Detail Modal */}
            {selectedBook && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex flex-col md:flex-row">
                            {/* Modal Image Section */}
                            <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8 min-h-[200px]">
                                <Book size={80} className="text-blue-200 drop-shadow-md" />
                            </div>

                            {/* Modal Content Section */}
                            <div className="flex-1 p-6 md:p-8 relative">
                                <button 
                                    onClick={() => setSelectedBook(null)}
                                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="mb-6">
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 mb-3">
                                        {selectedBook.category?.name || 'Umum'}
                                    </span>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedBook.title}</h2>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <User size={16} className="mr-2 text-gray-400" />
                                            {selectedBook.author}
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar size={16} className="mr-2 text-gray-400" />
                                            {selectedBook.publication_year}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Deskripsi</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {selectedBook.description || 'Tidak ada deskripsi untuk buku ini.'}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-500">Stok Tersedia</p>
                                        <p className={`text-xl font-bold ${selectedBook.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                            {selectedBook.quantity} <span className="text-sm font-normal text-gray-400">buku</span>
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleBorrow(selectedBook.id)}
                                        disabled={selectedBook.quantity <= 0}
                                        className={`
                                            flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200
                                            ${selectedBook.quantity > 0 
                                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5' 
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                                        `}
                                    >
                                        <BookmarkPlus size={20} className="mr-2" />
                                        {selectedBook.quantity > 0 ? 'Pinjam Buku' : 'Stok Habis'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}




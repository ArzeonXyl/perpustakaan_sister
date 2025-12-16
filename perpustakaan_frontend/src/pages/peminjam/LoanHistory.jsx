import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, BookOpen, Clock, CheckCircle, XCircle, AlertTriangle, RotateCcw } from 'lucide-react';

export default function LoanHistory() {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const res = await axios.get('/api/borrowings/mine', { withCredentials: true });
        setBorrowings(res.data);
      } catch (err) {
        setError('Gagal memuat histori peminjaman');
        console.error('❌ Error fetching borrowings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Dipinjam':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Clock size={12} className="mr-1" /> Dipinjam</span>;
      case 'Dikembalikan':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle size={12} className="mr-1" /> Dikembalikan</span>;
      case 'Terlambat':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><AlertTriangle size={12} className="mr-1" /> Terlambat</span>;
      case 'Menunggu Persetujuan':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock size={12} className="mr-1" /> Menunggu</span>;
      case 'Ditolak':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"><XCircle size={12} className="mr-1" /> Ditolak</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle size={48} className="mb-4" />
        <p className="text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Histori Peminjaman</h1>
          <p className="text-gray-500 mt-1">Riwayat lengkap peminjaman buku Anda.</p>
        </div>
      </div>

      {borrowings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={40} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Peminjaman</h3>
          <p className="text-gray-500">Anda belum pernah meminjam buku. Mulai jelajahi katalog kami!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Buku</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal Pinjam</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Jatuh Tempo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Denda</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {borrowings.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.book?.title || 'Judul tidak tersedia'}</p>
                          <p className="text-xs text-gray-500">ID: #{item.book?.id || '-'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(item.borrow_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(item.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4">
                      {item.fine_amount > 0 ? (
                        <span className="text-red-600 font-semibold">Rp {item.fine_amount.toLocaleString('id-ID')}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
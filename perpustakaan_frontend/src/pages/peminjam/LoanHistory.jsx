import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (borrowings.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <h2 className="text-2xl font-semibold">Histori Pinjaman</h2>
        <p>Data peminjaman Anda akan muncul setelah Anda mulai meminjam.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Histori Pinjaman</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Judul Buku</th>
              <th className="px-4 py-2 border">Tanggal Pinjam</th>
              <th className="px-4 py-2 border">Jatuh Tempo</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Denda</th>
            </tr>
          </thead>
          <tbody>
            {borrowings.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="px-4 py-2 border">{item.book?.title || '—'}</td>
                <td className="px-4 py-2 border">{new Date(item.borrow_date).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{new Date(item.due_date).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{item.status}</td>
                <td className="px-4 py-2 border">Rp{item.fine_amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
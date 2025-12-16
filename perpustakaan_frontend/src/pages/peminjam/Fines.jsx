import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle, Clock, DollarSign, FileText } from 'lucide-react';

export default function Fines() {
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFines = async () => {
      try {
        const res = await axios.get('/api/fines/mine', { withCredentials: true });
        setFines(res.data);
      } catch (err) {
        setError('Gagal memuat data denda');
        console.error('❌ Error fetching fines:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFines();
  }, []);

  // Calculate total unpaid fines
  const totalUnpaid = fines
    .filter(f => f.paid_status === 'Belum Dibayar')
    .reduce((sum, f) => sum + parseFloat(f.total_fine), 0);

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
        <AlertCircle size={48} className="mb-4" />
        <p className="text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Denda & Sanksi</h1>
          <p className="text-gray-500 mt-1">Kelola dan pantau status denda keterlambatan pengembalian buku.</p>
        </div>
        
        {/* Summary Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 min-w-[250px]">
          <div className="p-3 bg-red-50 rounded-full text-red-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Belum Dibayar</p>
            <p className="text-2xl font-bold text-gray-800">
              Rp {totalUnpaid.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>

      {fines.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak Ada Denda</h3>
          <p className="text-gray-500">Hebat! Anda tidak memiliki catatan denda keterlambatan.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Buku</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Detail Keterlambatan</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Denda</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fines.map((fine) => (
                  <tr key={fine.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{fine.borrowing?.book?.title || 'Judul tidak tersedia'}</p>
                          <p className="text-xs text-gray-500">ID: #{fine.borrowing?.book?.id || '-'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={14} className="mr-2 text-gray-400" />
                          <span>{fine.days_late} Hari Terlambat</span>
                        </div>
                        <span className="text-xs text-gray-400">
                          Per tanggal: {new Date(fine.fine_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        Rp {parseFloat(fine.total_fine).toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        fine.paid_status === 'Sudah Dibayar' 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {fine.paid_status === 'Sudah Dibayar' ? (
                          <CheckCircle size={12} className="mr-1.5" />
                        ) : (
                          <AlertCircle size={12} className="mr-1.5" />
                        )}
                        {fine.paid_status}
                      </span>
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
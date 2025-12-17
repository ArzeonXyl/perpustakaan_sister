// src/components/admin/Logout.jsx
import React from 'react';
import api from '@/services/api';

export default function Logout() {
  const handleLogout = async () => {
    try {
      await api.post('/logout');

      localStorage.removeItem('token');

      // Redirect ke halaman login frontend
      window.location.href = '/login';
    } catch {
      alert('Logout gagal');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}

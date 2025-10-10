import React, { useState } from 'react';
import { BookOpen, History, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../components/Sidebar.jsx';
import BookCatalog from './BookCatalog';
import LoanHistory from './LoanHistory';
import Fines from './Fines';

const sidebarMenus = [
  { name: 'Buku', path: 'buku', icon: BookOpen, component: BookCatalog },
  { name: 'Histori Pinjaman', path: 'histori', icon: History, component: LoanHistory },
  { name: 'Denda', path: 'denda', icon: DollarSign, component: Fines },
];

export default function DashboardPeminjam() {
  const [activeMenu, setActiveMenu] = useState('buku');
  const navigate = useNavigate();

  const ActiveComponent =
    sidebarMenus.find((menu) => menu.path === activeMenu)?.component || BookCatalog;

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('❌ Gagal logout dari server:', err);
    }

    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sidebarMenus={sidebarMenus}
        handleLogout={handleLogout}
      />

      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {activeMenu === 'buku'
            ? 'Katalog Buku'
            : activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
        </h1>
        <div>
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
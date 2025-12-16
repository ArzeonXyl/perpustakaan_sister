import React, { useState, useEffect } from 'react';
import { BookOpen, History, User, AlertCircle, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Sidebar from '../../components/Sidebar.jsx';
import BookCatalog from './BookCatalog';
import LoanHistory from './LoanHistory';
import ProfilePage from './Profile';
import Fines from './Fines';

const sidebarMenus = [
  { name: 'Katalog Buku', path: 'buku', icon: BookOpen, component: BookCatalog },
  { name: 'Histori Pinjaman', path: 'histori', icon: History, component: LoanHistory },
  { name: 'Denda & Sanksi', path: 'denda', icon: AlertCircle, component: Fines },
  { name: 'Profil Saya', path: 'profile', icon: User, component: ProfilePage },
];

export default function DashboardPeminjam() {
  const [activeMenu, setActiveMenu] = useState('buku');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkFines = async () => {
      try {
        const res = await fetch('/api/fines/mine', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) return;
        
        const data = await res.json();
        const fines = Array.isArray(data) ? data : [];
        const unpaidFines = fines.filter(f => f.paid_status === 'Belum Dibayar');

        if (unpaidFines.length > 0) {
          Swal.fire({
            title: 'Pemberitahuan Denda',
            html: `Anda memiliki <b class="text-red-600">${unpaidFines.length} denda</b> yang belum dibayar.<br>Harap segera selesaikan pembayaran.`,
            icon: 'warning',
            confirmButtonText: 'Lihat Denda',
            confirmButtonColor: '#ef4444',
            showCancelButton: true,
            cancelButtonText: 'Tutup',
            cancelButtonColor: '#6b7280'
          }).then((result) => {
            if (result.isConfirmed) {
              setActiveMenu('denda');
            }
          });
        }
      } catch (err) {
        console.error('Error checking fines:', err);
      }
    };

    checkFines();
  }, []);

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
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sidebarMenus={sidebarMenus}
        handleLogout={handleLogout}
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <span className="font-bold text-xl text-gray-800">RumaBaca</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <ActiveComponent />
          </div>
        </div>
      </main>
    </div>
  );
}
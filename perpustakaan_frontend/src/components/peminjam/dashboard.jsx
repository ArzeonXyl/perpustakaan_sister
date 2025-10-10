import React, { useState } from 'react';
import { LogOut, BookOpen, History, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoanHistory from './LoanHistory'; // Buat komponen placeholder ini
import Fines from './Fines'; // Buat komponen placeholder ini

const sidebarMenus = [
    { name: 'Buku', path: 'buku', icon: BookOpen, component: BookCatalog },
    { name: 'Histori Pinjaman', path: 'histori', icon: History, component: LoanHistory },
    { name: 'Denda', path: 'denda', icon: DollarSign, component: Fines },
];

export default function Dashboard() {
    const [activeMenu, setActiveMenu] = useState('buku');
    const navigate = useNavigate();

    // Tentukan komponen mana yang akan dirender berdasarkan activeMenu
    const ActiveComponent = sidebarMenus.find(menu => menu.path === activeMenu)?.component || BookCatalog;

    const handleLogout = () => {
        // Hapus token atau informasi sesi di sini (misal: dari localStorage)
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        
        // Arahkan kembali ke halaman homescreen
        navigate('/');
    };

    const MenuItem = ({ menu }) => {
        const isActive = menu.path === activeMenu;
        const baseClass = 'flex items-center p-3 rounded-lg transition duration-200 cursor-pointer';
        
        const className = isActive
            ? `${baseClass} font-extrabold text-blue-700 bg-blue-50` // Aktif: Bold & Biru
            : `${baseClass} font-medium text-gray-900 opacity-50 hover:opacity-100`; // Non-aktif: Opacity 50% & Hitam

        return (
            <div 
                className={className} 
                onClick={() => setActiveMenu(menu.path)}
            >
                <menu.icon size={20} className="mr-3" />
                <span className="text-lg">{menu.name}</span>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-5 shadow-lg">
                
                {/* Logo RumaBaca */}
                <div className="text-3xl font-extrabold text-blue-700 mb-10 text-center">
                    RumaBaca
                </div>

                {/* Menu Navigasi */}
                <nav className="space-y-2 flex-grow">
                    {sidebarMenus.map((menu) => (
                        <MenuItem key={menu.path} menu={menu} />
                    ))}
                </nav>

                {/* Tombol Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
                >
                    <LogOut size={20} className="mr-3" />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Konten Utama: Katalog Buku */}
            <main className="flex-1 overflow-y-auto p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    {activeMenu === 'buku' ? 'Katalog Buku' : activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
                </h1>
                <div className="bg-white p-6 rounded-xl shadow-md min-h-[80vh]">
                    <ActiveComponent />
                </div>
            </main>
        </div>
    );
}
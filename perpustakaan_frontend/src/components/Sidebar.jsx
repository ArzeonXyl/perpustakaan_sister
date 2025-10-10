import React from 'react';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

// Komponen MenuItem (diambil dari DashboardPeminjam)
const MenuItem = ({ menu, activeMenu, setActiveMenu }) => {
    const isActive = menu.path === activeMenu;
    const baseClass = 'flex items-center p-3 rounded-lg transition duration-200 cursor-pointer';
    
    // Styling Sidebar: Bold & Biru jika aktif, Opacity 50% & Hitam jika non-aktif
    const className = isActive
        ? `${baseClass} font-extrabold text-blue-700 bg-blue-50` 
        : `${baseClass} font-medium text-gray-900 opacity-50 hover:opacity-100`;

    return (
        <div className={className} onClick={() => setActiveMenu(menu.path)}>
            <menu.icon size={20} className="mr-3" />
            <span className="text-lg">{menu.name}</span>
        </div>
    );
};


export default function Sidebar({ activeMenu, setActiveMenu, sidebarMenus, handleLogout }) {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-5 shadow-lg">
            
            {/* Logo RumaBaca (Link ke Home) */}
            <Link to="/" className="text-3xl font-extrabold text-blue-700 mb-10 text-center hover:text-blue-800 transition">
                RumaBaca
            </Link>

            {/* Menu Navigasi */}
            <nav className="space-y-2 flex-grow">
                {sidebarMenus.map((menu) => (
                    <MenuItem 
                        key={menu.path} 
                        menu={menu} 
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu}
                    />
                ))}
            </nav>

            {/* Tombol Logout */}
            <button
                onClick={handleLogout}
                className="flex items-center justify-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 shadow-md mt-4"
            >
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
            </button>
        </aside>
    );
}
import React from 'react';
import { LogOut, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Komponen MenuItem
const MenuItem = ({ menu, activeMenu, setActiveMenu, closeSidebar }) => {
    const isActive = menu.path === activeMenu;
    const baseClass = 'flex items-center p-3 my-1 rounded-xl transition-all duration-200 cursor-pointer group';
    
    const className = isActive
        ? `${baseClass} bg-blue-600 text-white shadow-md shadow-blue-200` 
        : `${baseClass} text-gray-600 hover:bg-blue-50 hover:text-blue-600`;

    const handleClick = () => {
        setActiveMenu(menu.path);
        if (closeSidebar) closeSidebar();
    }

    return (
        <div className={className} onClick={handleClick}>
            <menu.icon size={20} className={`mr-3 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
            <span className="font-medium tracking-wide">{menu.name}</span>
        </div>
    );
};

export default function Sidebar({ activeMenu, setActiveMenu, sidebarMenus, handleLogout, isOpen, closeSidebar }) {
    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            <aside className={`
                fixed lg:static inset-y-0 left-0 z-30
                w-72 bg-white border-r border-gray-100 flex flex-col p-6 shadow-xl lg:shadow-none
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                
                {/* Header Sidebar */}
                <div className="flex items-center justify-between mb-10">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                            R
                        </div>
                        <span className="text-2xl font-bold text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors">
                            RumaBaca
                        </span>
                    </Link>
                    <button 
                        onClick={closeSidebar}
                        className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Menu Navigasi */}
                <nav className="space-y-1 flex-grow">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">Menu Utama</p>
                    {sidebarMenus.map((menu) => (
                        <MenuItem 
                            key={menu.path} 
                            menu={menu} 
                            activeMenu={activeMenu}
                            setActiveMenu={setActiveMenu}
                            closeSidebar={closeSidebar}
                        />
                    ))}
                </nav>

                {/* Tombol Logout */}
                <div className="pt-6 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center w-full p-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 font-medium group"
                    >
                        <LogOut size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span>Keluar</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
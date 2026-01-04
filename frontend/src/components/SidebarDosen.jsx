import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiHome,
  FiBookOpen,
  FiRefreshCw,
  FiLogOut,
} from 'react-icons/fi';

function SidebarDosen({ logout }) {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard/dosen' },
    { icon: FiBookOpen, label: 'Publikasiku', path: '/publikasi-ku' },
    { icon: FiRefreshCw, label: 'Sinkronisasi Publikasi', path: '/sinkronisasi-publikasi' },
  ];

  return (
    <div
      className={`bg-gray-800 text-white h-screen transition-all duration-300 
      ${isOpen ? 'w-64' : 'w-16'} flex flex-col`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4">
        <h2
          className={`text-xl font-bold transition-all duration-300 whitespace-nowrap
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 overflow-hidden'}`}
        >
          SINTA
        </h2>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-8 h-8"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Menu */}
      <ul className="flex-1 mt-4 space-y-2">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <li key={label}>
            <Link
              to={path}
              className={`h-12 px-5 flex items-center gap-3 hover:bg-gray-700 transition-colors block ${location.pathname === path ? 'bg-gray-700' : ''
                }`}
            >
              <Icon size={20} className="min-w-[20px]" />
              <span
                className={`transition-all duration-300 whitespace-nowrap
                ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}
              >
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div className="px-3 pb-4">
        <button
          onClick={logout}
          className="h-12 w-full flex items-center gap-3 px-3
          bg-red-600 hover:bg-red-700 rounded transition-colors"
        >
          <FiLogOut size={20} className="min-w-[20px]" />
          <span
            className={`transition-all duration-300 whitespace-nowrap
            ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}

export default SidebarDosen;

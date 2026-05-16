"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Beranda', path: '/pelanggan' },
    { name: 'Layanan', path: '/pelanggan#layanan' },
    { name: 'Pesanan Saya', path: '/pelanggan/pesanan' }, // Ini menu barunya!
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">✂️</span>
          <h1 className="text-xl font-bold text-[#4a3728] tracking-tight">JahitKu</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`text-sm font-medium transition-colors ${
                pathname === item.path ? 'text-[#4a3728] font-bold' : 'text-gray-500 hover:text-[#4a3728]'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Profile & Logout */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-800">Naila Putri</p>
            <p className="text-[10px] text-gray-400">Pelanggan Member</p>
          </div>
          <button className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-100 transition-all">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
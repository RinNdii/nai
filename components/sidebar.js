"use client";
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar({ role, color }) {
  const router = useRouter();
  const pathname = usePathname();

  // Daftar menu khusus untuk Admin
  const menuAdmin = [
    { nama: 'Dashboard', path: '/admin', icon: '📊' },
    { nama: 'Daftar Pesanan', path: '/admin/pesanan', icon: '📝' },
    { nama: 'Data Penjahit', path: '/admin/penjahit', icon: '🧵' },
    { nama: 'Laporan', path: '/admin/laporan', icon: '📈' },
  ];

  return (
    <aside className={`w-64 min-h-screen text-white p-6 ${color} flex flex-col shadow-xl`}>
      {/* Logo & Judul */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <span className="text-2xl">✂️</span>
        <h1 className="text-xl font-bold tracking-wider">JahitKu</h1>
      </div>

      {/* Menu Navigasi */}
      <nav className="flex-1 space-y-2">
        <p className="text-[10px] uppercase tracking-[2px] text-gray-400 mb-4 px-2 font-bold">Menu Utama</p>
        
        {menuAdmin.map((item) => (
          <Link key={item.path} href={item.path}>
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
              pathname === item.path 
              ? 'bg-white/10 border border-white/20 text-white' 
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}>
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.nama}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Bagian Bawah / Logout */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <button 
          onClick={() => router.push('/login')}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium text-sm"
        >
          <span>🚪</span> Keluar
        </button>
      </div>
    </aside>
  );
}
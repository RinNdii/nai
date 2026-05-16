"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Ini tambahan supaya bisa pindah halaman

export default function LoginPage() {
  const [role, setRole] = useState('pelanggan');
  const router = useRouter(); // Inisialisasi router

  // Fungsi untuk menangani saat tombol login diklik
  const handleLogin = (e) => {
    e.preventDefault(); // Supaya halaman tidak refresh

    // Logika pindah halaman sesuai folder yang kamu buat
    if (role === 'admin') {
      router.push('/admin');
    } else if (role === 'penjahit') {
      router.push('/penjahit');
    } else {
      router.push('/pelanggan');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="text-2xl">✂️</span>
            <h1 className="text-2xl font-bold text-[#4a3728]">JahitKu</h1>
          </div>
          <p className="text-gray-500 text-sm">Selamat Datang! Silakan login untuk melanjutkan</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button 
            type="button" // Tambahkan type button agar tidak trigger submit form
            onClick={() => setRole('pelanggan')}
            className={`p-3 rounded-lg border text-xs flex flex-col items-center gap-2 transition-all ${role === 'pelanggan' ? 'border-[#4a3728] bg-orange-50 text-[#4a3728]' : 'border-gray-200 text-gray-500'}`}
          >
            <span className="text-xl">👤</span> Pelanggan
          </button>
          <button 
            type="button"
            onClick={() => setRole('admin')}
            className={`p-3 rounded-lg border text-xs flex flex-col items-center gap-2 transition-all ${role === 'admin' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500'}`}
          >
            <span className="text-xl">🛡️</span> Admin
          </button>
          <button 
            type="button"
            onClick={() => setRole('penjahit')}
            className={`p-3 rounded-lg border text-xs flex flex-col items-center gap-2 transition-all ${role === 'penjahit' ? 'border-green-600 bg-green-50 text-green-600' : 'border-gray-200 text-gray-500'}`}
          >
            <span className="text-xl">🧵</span> Penjahit
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              required
              type="email" 
              placeholder="Masukkan email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a3728] outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              required
              type="password" 
              placeholder="Masukkan password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a3728] outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" className="rounded" /> Ingat saya
            </label>
            <a href="#" className="hover:underline">Lupa password?</a>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-[#4a3728] text-white rounded-lg font-semibold hover:bg-[#3d2d21] transition-colors mt-4 shadow-md active:scale-95"
          >
            Login sebagai {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>
      </div>
    </div>
  );
}
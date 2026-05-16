"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Akun berhasil dibuat! Silakan login.");
    router.push('/login'); // Lempar ke halaman login setelah daftar
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="text-2xl">✂️</span>
            <h1 className="text-2xl font-bold text-[#4a3728]">JahitKu</h1>
          </div>
          <p className="text-gray-500 text-sm">Daftar akun baru untuk mulai memesan</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input 
              required
              type="text" 
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a3728] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              required
              type="email" 
              placeholder="Masukkan email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a3728] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              required
              type="password" 
              placeholder="Buat password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a3728] outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-[#4a3728] text-white rounded-lg font-semibold hover:bg-[#3d2d21] transition-colors mt-4"
          >
            Daftar Sekarang
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Sudah punya akun? <Link href="/login" className="text-[#4a3728] font-bold hover:underline">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}
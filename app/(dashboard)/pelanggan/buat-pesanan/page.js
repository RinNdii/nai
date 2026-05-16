"use client";
import React from 'react';
import Navbar from "@/components/navbar";
import { useRouter } from 'next/navigation';

export default function BuatPesananPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesanan berhasil dikirim!");
    router.push('/pelanggan'); // Balik ke depan setelah pesan
  };

  return (
    <div className="bg-[#fdf8f4] min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-orange-50 overflow-hidden flex flex-col md:flex-row">
          
          {/* Sisi Kiri - Informasi */}
          <div className="md:w-1/3 bg-[#4a3728] p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Buat Pesanan</h2>
            <p className="text-orange-100 text-sm leading-relaxed mb-6">
              Lengkapi detail pesanan Anda untuk mendapatkan hasil jahitan yang sempurna.
            </p>
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <span>📍</span> Ambil di Toko / Kirim ke Rumah
              </div>
              <div className="flex items-center gap-3">
                <span>⏱️</span> Pengerjaan 3-7 Hari Kerja
              </div>
            </div>
          </div>

          {/* Sisi Kanan - Form */}
          <div className="md:w-2/3 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#4a3728] mb-2">Pilih Layanan</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4a3728] outline-none transition-all">
                  <option>Jahit Kebaya</option>
                  <option>Jahit Seragam</option>
                  <option>Jahit Pakaian Pria</option>
                  <option>Jahit Dress</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4a3728] mb-2">Deskripsi / Catatan</label>
                <textarea 
                  rows="2"
                  placeholder="Contoh: model nya mau pakai furing..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4a3728] outline-none transition-all"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4a3728] mb-2">Lingkar Dada</label>
                <textarea 
                  rows="1"
                  placeholder="... cm"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4a3728] outline-none transition-all"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4a3728] mb-2">Lebar Bahu</label>
                <textarea 
                  rows="1"
                  placeholder="... cm"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4a3728] outline-none transition-all"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4a3728] mb-2">Lingkar Pinggang</label>
                <textarea 
                  rows="1"
                  placeholder="... cm"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4a3728] outline-none transition-all"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4a3728] mb-2">Lingkar Panggul</label>
                <textarea 
                  rows="1"
                  placeholder="... cm"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4a3728] outline-none transition-all"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4a3728] mb-2">Panjang Lengan</label>
                <textarea 
                  rows="1"
                  placeholder="... cm"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4a3728] outline-none transition-all"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4a3728] mb-2">Tinggi</label>
                <textarea 
                  rows="1"
                  placeholder="... cm"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4a3728] outline-none transition-all"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4a3728] mb-2">Tanggal Pengambilan</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4a3728] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4a3728] mb-2">Upload Referensi (Opsional)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:bg-orange-50 transition-all cursor-pointer">
                  <p className="text-xs text-gray-400">Pilih file atau tarik gambar ke sini (JPG, PNG)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4a3728] mb-2">Metode Pembayaran</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4a3728] outline-none transition-all">
                  <option>Bank BRI</option>
                  <option>Bank BCA</option>
                  <option>Bank Mandiri</option>
                  <option>Dana</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#4a3728] text-white rounded-xl font-bold shadow-lg hover:bg-[#3d2d21] active:scale-95 transition-all mt-4"
              >
                Kirim Pesanan Sekarang
              </button>
            </form>
          </div>
          
        </div>
      </main>
    </div>
  );
}
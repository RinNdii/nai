// app/(dashboard)/penjahit/page.js
"use client";
import Sidebar from "@/components/sidebar";
import StatusBadge from "@/components/statusbadge";

export default function PenjahitDashboard() {
  // Data dummy pesanan yang sedang dikerjakan penjahit
  const daftarTugas = [
    { id: 1, pelanggan: "Naila Putri", kain: "Satin Silk", layanan: "Kebaya Modern", status: "Diproses", deadline: "15 Mei" },
    { id: 2, pelanggan: "Rizky", kain: "Katun", layanan: "Seragam Kantor", status: "Menunggu", deadline: "20 Mei" },
  ];

  return (
    <div className="flex min-h-screen bg-[#fcfdfc]">
      {/* Sidebar khusus Penjahit warna Hijau Emerald */}
      <Sidebar role="penjahit" color="bg-[#064e3b]" /> 
      
      <main className="flex-1 p-10">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Ruang Kerja Penjahit</h1>
            <p className="text-gray-500">Lihat dan perbarui progress jahitan kamu di sini</p>
          </div>
          <div className="bg-green-50 px-6 py-4 rounded-2xl border border-green-100 text-right">
            <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Tugas Aktif</p>
            <p className="text-2xl font-black text-green-800">2 Pesanan</p>
          </div>
        </header>

        {/* List Tugas dalam bentuk Kartu yang Estetik */}
        <div className="grid gap-6">
          {daftarTugas.map((tugas) => (
            <div key={tugas.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                  🧵
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{tugas.layanan}</h3>
                  <p className="text-sm text-gray-400">Pelanggan: <span className="font-semibold text-gray-600">{tugas.pelanggan}</span> • Bahan: {tugas.kain}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Deadline</p>
                  <p className="text-sm font-semibold text-red-500">{tugas.deadline}</p>
                </div>
                
                <div className="flex flex-col gap-2">
                   <StatusBadge status={tugas.status} />
                   <button className="text-[10px] text-green-700 font-bold hover:underline">Update Status</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
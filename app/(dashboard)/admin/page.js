// app/(dashboard)/admin/page.js
import Sidebar from "@/components/sidebar";
import StatusBadge from "@/components/statusbadge";

export default function AdminDashboard() {
  // Data dummy untuk tabel pesanan
  const pesananMasuk = [
    { id: 1, nama: "Naila Putri", layanan: "Jahit Kebaya", status: "Diproses", tgl: "10 Mei 2026" },
    { id: 2, nama: "Rizky", layanan: "Jahit Seragam", status: "Menunggu", tgl: "11 Mei 2026" },
    { id: 3, nama: "Amel", layanan: "Jahit Dress", status: "Selesai", tgl: "09 Mei 2026" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar warna Biru Navy */}
      <Sidebar role="admin" color="bg-[#0f172a]" /> 
      
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
            <p className="text-gray-500">Kelola semua pesanan pelanggan di sini</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 uppercase font-bold">Total Pesanan</p>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 uppercase font-bold">Perlu Diproses</p>
              <p className="text-2xl font-bold text-orange-500">2</p>
            </div>
          </div>
        </header>

        {/* Tabel Pesanan yang Estetik */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-5 text-sm font-semibold text-gray-600">Nama Pelanggan</th>
                <th className="p-5 text-sm font-semibold text-gray-600">Layanan</th>
                <th className="p-5 text-sm font-semibold text-gray-600">Tanggal</th>
                <th className="p-5 text-sm font-semibold text-gray-600">Status</th>
                <th className="p-5 text-sm font-semibold text-gray-600 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pesananMasuk.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                        {item.nama.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-700">{item.nama}</span>
                    </div>
                  </td>
                  <td className="p-5 text-gray-600 text-sm">{item.layanan}</td>
                  <td className="p-5 text-gray-600 text-sm">{item.tgl}</td>
                  <td className="p-5">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-blue-600 hover:underline text-sm font-medium">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
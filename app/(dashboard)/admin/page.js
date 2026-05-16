import Sidebar from "@/components/sidebar";
import StatusBadge from "@/components/statusbadge";
import { requireUser } from "@/lib/auth";
import { ORDER_STATUS } from "@/lib/constants";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const user = await requireUser("admin");
  const pesananMasuk = await prisma.pesanan.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      pelanggan: true,
      penjahit: true,
    },
  });
  const perluDiproses = pesananMasuk.filter((item) => item.status !== ORDER_STATUS.SELESAI).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" color="bg-[#0f172a]" user={user} /> 
      
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
            <p className="text-gray-500">Kelola semua pesanan pelanggan di sini</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 uppercase font-bold">Total Pesanan</p>
              <p className="text-2xl font-bold text-blue-600">{pesananMasuk.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 uppercase font-bold">Perlu Diproses</p>
              <p className="text-2xl font-bold text-orange-500">{perluDiproses}</p>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-5 text-sm font-semibold text-gray-600">Kode</th>
                <th className="p-5 text-sm font-semibold text-gray-600">Nama Pelanggan</th>
                <th className="p-5 text-sm font-semibold text-gray-600">Layanan</th>
                <th className="p-5 text-sm font-semibold text-gray-600">Tanggal Ambil</th>
                <th className="p-5 text-sm font-semibold text-gray-600">Status</th>
                <th className="p-5 text-sm font-semibold text-gray-600 text-right">Penjahit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pesananMasuk.length > 0 ? pesananMasuk.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-5 text-sm font-bold text-[#0f172a]">{item.kode}</td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                        {item.pelanggan.nama.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-700">{item.pelanggan.nama}</span>
                    </div>
                  </td>
                  <td className="p-5 text-gray-600 text-sm">{item.layanan}</td>
                  <td className="p-5 text-gray-600 text-sm">
                    {new Date(item.tanggalAmbil).toLocaleDateString("id-ID")}
                  </td>
                  <td className="p-5">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-5 text-right">
                    <span className="text-sm text-gray-500">
                      {item.penjahit?.nama ?? "Belum ditetapkan"}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    Belum ada data pesanan di database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

import Sidebar from "@/components/sidebar";
import OrderStatusActions from "@/components/order-status-actions";
import StatusBadge from "@/components/statusbadge";
import { requireUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function PenjahitDashboard() {
  const user = await requireUser("penjahit");
  const daftarTugas = await prisma.pesanan.findMany({
    where: {
      OR: [
        { penjahitId: user.id },
        { penjahitId: null },
      ],
    },
    orderBy: { tanggalAmbil: "asc" },
    include: {
      pelanggan: true,
      penjahit: true,
    },
  });

  return (
    <div className="flex min-h-screen bg-[#fcfdfc]">
      <Sidebar role="penjahit" color="bg-[#064e3b]" user={user} /> 
      
      <main className="flex-1 p-10">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Ruang Kerja Penjahit</h1>
            <p className="text-gray-500">Lihat dan perbarui progress jahitan kamu di sini</p>
          </div>
          <div className="bg-green-50 px-6 py-4 rounded-2xl border border-green-100 text-right">
            <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Tugas Aktif</p>
            <p className="text-2xl font-black text-green-800">{daftarTugas.length} Pesanan</p>
          </div>
        </header>

        <div className="grid gap-6">
          {daftarTugas.length > 0 ? daftarTugas.map((tugas) => (
            <div key={tugas.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                  🧵
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{tugas.layanan}</h3>
                  <p className="text-sm text-gray-400">
                    Pelanggan: <span className="font-semibold text-gray-600">{tugas.pelanggan.nama}</span>
                    {" "}• Kode: {tugas.kode}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {tugas.deskripsi || "Belum ada catatan tambahan dari pelanggan."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Deadline</p>
                  <p className="text-sm font-semibold text-red-500">
                    {new Date(tugas.tanggalAmbil).toLocaleDateString("id-ID")}
                  </p>
                </div>
                
                <div className="flex flex-col gap-2">
                   <StatusBadge status={tugas.status} />
                   <OrderStatusActions orderId={tugas.id} currentStatus={tugas.status} />
                </div>
              </div>
            </div>
          )) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-400">
              Belum ada pesanan yang perlu dikerjakan saat ini.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

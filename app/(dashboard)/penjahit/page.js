import Sidebar from "@/components/sidebar";
import OrderStatusActions from "@/components/order-status-actions";
import RevenueChart from "@/components/revenue-chart";
import StatusBadge from "@/components/statusbadge";
import { requireUser } from "@/lib/auth";
import { ORDER_STATUS } from "@/lib/constants";
import { buildRevenueChartData, formatRupiah } from "@/lib/order-utils";
import prisma from "@/lib/prisma";

export default async function PenjahitDashboard() {
  const user = await requireUser("penjahit");
  const daftarTugas = await prisma.pesanan.findMany({
    where: {
      OR: [{ penjahitId: user.id }, { penjahitId: null }],
    },
    orderBy: { tanggalAmbil: "asc" },
    include: {
      pelanggan: true,
      penjahit: true,
    },
  });
  const pesananSaya = await prisma.pesanan.findMany({
    where: {
      penjahitId: user.id,
    },
    orderBy: { tanggalAmbil: "asc" },
  });
  const pesananSelesai = pesananSaya.filter(
    (item) => item.status === ORDER_STATUS.SELESAI,
  );
  const totalPendapatan = pesananSelesai.reduce(
    (total, item) => total + item.harga,
    0,
  );
  const revenueChartData = buildRevenueChartData(pesananSelesai);

  return (
    <div className="flex min-h-screen bg-[#fcfdfc]">
      <Sidebar role="penjahit" color="bg-[#064e3b]" user={user} />

      <main className="flex-1 p-10">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Ruang Kerja Penjahit
            </h1>
            <p className="text-gray-500">
              Lihat dan perbarui progress jahitan kamu di sini
            </p>
          </div>
          <div className="flex gap-4">
            <div className="rounded-2xl border border-green-100 bg-green-50 px-6 py-4 text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-green-600">
                Tugas Aktif
              </p>
              <p className="text-2xl font-black text-green-800">
                {daftarTugas.length} Pesanan
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-6 py-4 text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Total Pendapatan
              </p>
              <p className="text-2xl font-black text-emerald-800">
                {formatRupiah(totalPendapatan)}
              </p>
            </div>
          </div>
        </header>

        <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <RevenueChart
            title="Grafik Pendapatan"
            subtitle="Pendapatan dari pesanan selesai yang kamu kerjakan."
            data={revenueChartData}
            colorClassName="bg-green-600"
          />
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">
              Ringkasan Penjahit
            </h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-green-700">
                  Pesanan Selesai
                </p>
                <p className="mt-2 text-2xl font-black text-green-900">
                  {pesananSelesai.length}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                  Nilai Rata-rata Pesanan
                </p>
                <p className="mt-2 text-xl font-bold text-slate-900">
                  {formatRupiah(
                    pesananSelesai.length > 0
                      ? Math.round(totalPendapatan / pesananSelesai.length)
                      : 0,
                  )}
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-6">
          {daftarTugas.length > 0 ? (
            daftarTugas.map((tugas) => (
              <div
                key={tugas.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                    🧵
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {tugas.layanan}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Pelanggan:{" "}
                      <span className="font-semibold text-gray-600">
                        {tugas.pelanggan.nama}
                      </span>{" "}
                      • Kode: {tugas.kode}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-emerald-700">
                      Nilai Pesanan: {formatRupiah(tugas.harga)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {tugas.deskripsi ||
                        "Belum ada catatan tambahan dari pelanggan."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">
                      Deadline
                    </p>
                    <p className="text-sm font-semibold text-red-500">
                      {new Date(tugas.tanggalAmbil).toLocaleDateString("id-ID")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <StatusBadge status={tugas.status} />
                    <OrderStatusActions
                      orderId={tugas.id}
                      currentStatus={tugas.status}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-400">
              Belum ada pesanan yang perlu dikerjakan saat ini.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

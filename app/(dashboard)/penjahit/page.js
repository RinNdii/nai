import PenjahitSummaryCards from "@/components/penjahit-summary-cards";
import PenjahitTaskList from "@/components/penjahit-task-list";
import Sidebar from "@/components/sidebar";
import RevenueChart from "@/components/revenue-chart";
import { requireUser } from "@/lib/auth";
import { formatRupiah } from "@/lib/order-utils";
import { getPenjahitDashboardData } from "@/lib/dashboard-data";

export default async function PenjahitDashboard() {
  const user = await requireUser("penjahit");
  const { pesananSelesai, perluDikerjakan, totalPendapatan, revenueChartData } =
    await getPenjahitDashboardData(user.id);

  return (
    <div className="flex min-h-screen bg-[#fcfdfc]">
      <Sidebar role="penjahit" color="bg-[#064e3b]" user={user} />

      <main className="flex-1 p-10">
        <header className="mb-10 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Ruang Kerja Penjahit
            </h1>
            <p className="text-gray-500">
              Lihat dan perbarui progress jahitan kamu di sini
            </p>
          </div>
          <PenjahitSummaryCards
            perluDikerjakan={perluDikerjakan.length}
            pesananSelesai={pesananSelesai.length}
            totalPendapatan={totalPendapatan}
          />
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

        <PenjahitTaskList
          title="Perlu Dikerjakan"
          description="Daftar pesanan yang masih menunggu atau sedang diproses."
          tasks={perluDikerjakan}
          emptyMessage="Belum ada pesanan yang perlu dikerjakan saat ini."
        />

        <div className="mt-10">
          <PenjahitTaskList
            title="Pesanan Selesai"
            description="Riwayat pesanan yang sudah selesai kamu kerjakan."
            tasks={pesananSelesai}
            emptyMessage="Belum ada pesanan selesai."
            showActions={false}
          />
        </div>
      </main>
    </div>
  );
}

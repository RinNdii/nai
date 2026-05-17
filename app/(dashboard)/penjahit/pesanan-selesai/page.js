import PenjahitSummaryCards from "@/components/penjahit-summary-cards";
import PenjahitTaskList from "@/components/penjahit-task-list";
import Sidebar from "@/components/sidebar";
import { requireUser } from "@/lib/auth";
import { getPenjahitDashboardData } from "@/lib/dashboard-data";

export default async function PenjahitPesananSelesaiPage() {
  const user = await requireUser("penjahit");
  const { perluDikerjakan, pesananSelesai, totalPendapatan } =
    await getPenjahitDashboardData(user.id);

  return (
    <div className="flex min-h-screen bg-[#fcfdfc]">
      <Sidebar role="penjahit" color="bg-[#064e3b]" user={user} />

      <main className="flex-1 p-10">
        <header className="mb-10 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Pesanan Selesai
            </h1>
            <p className="text-gray-500">
              Riwayat semua pesanan yang sudah selesai kamu kerjakan.
            </p>
          </div>
          <PenjahitSummaryCards
            perluDikerjakan={perluDikerjakan.length}
            pesananSelesai={pesananSelesai.length}
            totalPendapatan={totalPendapatan}
          />
        </header>

        <PenjahitTaskList
          title="Riwayat Pesanan Selesai"
          description="Pesanan yang sudah selesai tetap tampil di sini sebagai arsip kerja."
          tasks={pesananSelesai}
          emptyMessage="Belum ada pesanan selesai."
          showActions={false}
        />
      </main>
    </div>
  );
}

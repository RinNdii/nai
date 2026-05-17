import PenjahitSummaryCards from "@/components/penjahit-summary-cards";
import PenjahitTaskList from "@/components/penjahit-task-list";
import Sidebar from "@/components/sidebar";
import { requireUser } from "@/lib/auth";
import { getPenjahitDashboardData } from "@/lib/dashboard-data";

export default async function PenjahitPerluDikerjakanPage() {
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
              Perlu Dikerjakan
            </h1>
            <p className="text-gray-500">
              Lihat semua pesanan yang masih aktif untuk dikerjakan.
            </p>
          </div>
          <PenjahitSummaryCards
            perluDikerjakan={perluDikerjakan.length}
            pesananSelesai={pesananSelesai.length}
            totalPendapatan={totalPendapatan}
          />
        </header>

        <PenjahitTaskList
          title="Daftar Pekerjaan Aktif"
          description="Pesanan menunggu atau diproses yang bisa kamu tindak lanjuti."
          tasks={perluDikerjakan}
          emptyMessage="Belum ada pesanan yang perlu dikerjakan saat ini."
        />
      </main>
    </div>
  );
}

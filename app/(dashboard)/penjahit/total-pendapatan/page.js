import PenjahitSummaryCards from "@/components/penjahit-summary-cards";
import PenjahitTaskList from "@/components/penjahit-task-list";
import RevenueChart from "@/components/revenue-chart";
import Sidebar from "@/components/sidebar";
import { requireUser } from "@/lib/auth";
import { getPenjahitDashboardData } from "@/lib/dashboard-data";

export default async function PenjahitTotalPendapatanPage() {
  const user = await requireUser("penjahit");
  const {
    perluDikerjakan,
    pesananSelesai,
    totalPendapatan,
    revenueChartData,
  } = await getPenjahitDashboardData(user.id);

  return (
    <div className="flex min-h-screen bg-[#fcfdfc]">
      <Sidebar role="penjahit" color="bg-[#064e3b]" user={user} />

      <main className="flex-1 p-10">
        <header className="mb-10 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Total Pendapatan
            </h1>
            <p className="text-gray-500">
              Pantau pendapatan dari pesanan selesai yang kamu kerjakan.
            </p>
          </div>
          <PenjahitSummaryCards
            perluDikerjakan={perluDikerjakan.length}
            pesananSelesai={pesananSelesai.length}
            totalPendapatan={totalPendapatan}
          />
        </header>

        <div className="mb-8">
          <RevenueChart
            title="Grafik Pendapatan"
            subtitle="Pendapatan dari pesanan selesai yang kamu kerjakan."
            data={revenueChartData}
            colorClassName="bg-green-600"
          />
        </div>

        <PenjahitTaskList
          title="Sumber Pendapatan"
          description="Pesanan selesai yang berkontribusi ke total pendapatanmu."
          tasks={pesananSelesai}
          emptyMessage="Belum ada pendapatan karena belum ada pesanan selesai."
          showActions={false}
        />
      </main>
    </div>
  );
}

import AdminOrdersTable from "@/components/admin-orders-table";
import AdminSummaryCards from "@/components/admin-summary-cards";
import RevenueChart from "@/components/revenue-chart";
import Sidebar from "@/components/sidebar";
import { requireUser } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/dashboard-data";

export default async function AdminTotalPendapatanPage() {
  const user = await requireUser("admin");
  const {
    pesananMasuk,
    perluDiprosesList,
    pesananSelesai,
    totalPendapatan,
    revenueChartData,
  } = await getAdminDashboardData();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" color="bg-[#0f172a]" user={user} />

      <main className="flex-1 p-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Total Pendapatan
            </h1>
            <p className="text-gray-500">
              Ringkasan pendapatan dari pesanan yang sudah selesai.
            </p>
          </div>
          <AdminSummaryCards
            totalPesanan={pesananMasuk.length}
            perluDiproses={perluDiprosesList.length}
            totalPendapatan={totalPendapatan}
          />
        </header>

        <div className="mb-8">
          <RevenueChart
            title="Grafik Pendapatan"
            subtitle="Akumulasi pendapatan dari pesanan yang sudah selesai."
            data={revenueChartData}
            colorClassName="bg-emerald-500"
          />
        </div>

        <AdminOrdersTable
          orders={pesananSelesai}
          emptyMessage="Belum ada pesanan selesai yang menghasilkan pendapatan."
        />
      </main>
    </div>
  );
}

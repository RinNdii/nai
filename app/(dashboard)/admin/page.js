import AdminOrdersTable from "@/components/admin-orders-table";
import AdminSummaryCards from "@/components/admin-summary-cards";
import RevenueChart from "@/components/revenue-chart";
import Sidebar from "@/components/sidebar";
import { requireUser } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/dashboard-data";
import { formatRupiah } from "@/lib/order-utils";

export default async function AdminDashboard() {
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
              Dashboard Admin
            </h1>
            <p className="text-gray-500">
              Kelola semua pesanan pelanggan di sini
            </p>
          </div>
          <AdminSummaryCards
            totalPesanan={pesananMasuk.length}
            perluDiproses={perluDiprosesList.length}
            totalPendapatan={totalPendapatan}
          />
        </header>

        <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <RevenueChart
            title="Grafik Pendapatan"
            subtitle="Akumulasi pendapatan dari pesanan yang sudah selesai."
            data={revenueChartData}
            colorClassName="bg-emerald-500"
          />
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">
              Ringkasan Keuangan
            </h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                  Pesanan Selesai
                </p>
                <p className="mt-2 text-2xl font-black text-emerald-900">
                  {pesananSelesai.length}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                  Rata-rata Nilai Pesanan
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

        <AdminOrdersTable
          orders={pesananMasuk}
          emptyMessage="Belum ada data pesanan di database."
        />
      </main>
    </div>
  );
}

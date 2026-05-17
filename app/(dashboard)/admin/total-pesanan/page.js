import AdminOrdersTable from "@/components/admin-orders-table";
import AdminSummaryCards from "@/components/admin-summary-cards";
import Sidebar from "@/components/sidebar";
import { requireUser } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/dashboard-data";

export default async function AdminTotalPesananPage() {
  const user = await requireUser("admin");
  const { pesananMasuk, perluDiprosesList, totalPendapatan } =
    await getAdminDashboardData();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" color="bg-[#0f172a]" user={user} />

      <main className="flex-1 p-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Total Pesanan</h1>
            <p className="text-gray-500">
              Lihat semua pesanan pelanggan yang masuk ke sistem.
            </p>
          </div>
          <AdminSummaryCards
            totalPesanan={pesananMasuk.length}
            perluDiproses={perluDiprosesList.length}
            totalPendapatan={totalPendapatan}
          />
        </header>

        <AdminOrdersTable
          orders={pesananMasuk}
          emptyMessage="Belum ada pesanan yang tercatat."
        />
      </main>
    </div>
  );
}

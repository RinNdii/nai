import AdminOrdersTable from "@/components/admin-orders-table";
import AdminSummaryCards from "@/components/admin-summary-cards";
import Sidebar from "@/components/sidebar";
import { requireUser } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/dashboard-data";

export default async function AdminPerluDiprosesPage() {
  const user = await requireUser("admin");
  const { pesananMasuk, perluDiprosesList, totalPendapatan } =
    await getAdminDashboardData();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" color="bg-[#0f172a]" user={user} />

      <main className="flex-1 p-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Perlu Diproses
            </h1>
            <p className="text-gray-500">
              Fokus ke pesanan yang masih menunggu atau sedang dikerjakan.
            </p>
          </div>
          <AdminSummaryCards
            totalPesanan={pesananMasuk.length}
            perluDiproses={perluDiprosesList.length}
            totalPendapatan={totalPendapatan}
          />
        </header>

        <AdminOrdersTable
          orders={perluDiprosesList}
          emptyMessage="Tidak ada pesanan yang perlu diproses saat ini."
        />
      </main>
    </div>
  );
}

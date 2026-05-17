import AdminLayananManager from "@/components/admin-layanan-manager";
import Sidebar from "@/components/sidebar";
import { requireUser } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/dashboard-data";

export default async function AdminTambahLayananPage() {
  const user = await requireUser("admin");
  const { layananList } = await getAdminDashboardData();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" color="bg-[#0f172a]" user={user} />

      <main className="flex-1 p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tambah Layanan</h1>
          <p className="mt-2 text-gray-500">
            Tambahkan layanan baru yang bisa dipilih pelanggan saat membuat
            pesanan.
          </p>
        </header>

        <AdminLayananManager
          initialLayanan={layananList}
          showForm={true}
          showList={false}
        />
      </main>
    </div>
  );
}

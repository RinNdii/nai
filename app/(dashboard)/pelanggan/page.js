import CardLayanan from "@/components/cardlayanan";
import Navbar from "@/components/navbar";
import { requireUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function PelangganPage() {
  const user = await requireUser("pelanggan");
  const layananList = await prisma.layanan.findMany({
    where: { aktif: true },
    orderBy: { nama: "asc" },
  });

  return (
    <div className="bg-[#fdf8f4] min-h-screen">
      <Navbar user={user} />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#4a3728] mb-2">Halo, {user.nama}</h1>
          <p className="text-gray-500">Pilih jenis layanan jahit yang sesuai dengan kebutuhan Anda</p>
        </header>

        <div id="layanan" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {layananList.length > 0 ? (
            layananList.map((item) => (
              <CardLayanan
                key={item.id}
                id={item.id}
                judul={item.nama}
                deskripsi={item.deskripsi}
                harga={item.harga}
                icon={item.icon ?? "🧵"}
              />
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-orange-100 bg-white p-10 text-center text-gray-400">
              Belum ada layanan aktif yang tersedia saat ini.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

import CardLayanan from "@/components/cardlayanan";
import Navbar from "@/components/navbar";
import { requireUser } from "@/lib/auth";
import { LAYANAN_OPTIONS } from "@/lib/constants";

const layananIcons = {
  "Jahit Kebaya": "👗",
  "Jahit Seragam": "👔",
  "Jahit Pakaian Pria": "🧥",
  "Jahit Dress": "💃",
  "Permak Pakaian": "✂️",
  Lainnya: "🧵",
};

export default async function PelangganPage() {
  const user = await requireUser("pelanggan");

  return (
    <div className="bg-[#fdf8f4] min-h-screen">
      <Navbar user={user} />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#4a3728] mb-2">Halo, {user.nama}</h1>
          <p className="text-gray-500">Pilih jenis layanan jahit yang sesuai dengan kebutuhan Anda</p>
        </header>

        <div id="layanan" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {LAYANAN_OPTIONS.map((item) => (
            <CardLayanan 
              key={item.judul}
              judul={item.judul}
              deskripsi={item.deskripsi}
              icon={layananIcons[item.judul] ?? "🧵"}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

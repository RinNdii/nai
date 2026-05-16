import Navbar from "@/components/navbar";
import CardLayanan from "@/components/cardlayanan";

export default function PelangganPage() {
  const daftarLayanan = [
    { judul: "Jahit Kebaya", desk: "Jahit kebaya modern maupun tradisional", icon: "👗" },
    { judul: "Jahit Seragam", desk: "Seragam sekolah, kantor, komunitas, dll", icon: "👔" },
    { judul: "Jahit Pakaian Pria", desk: "Kemeja, jas, celana, dan lainnya", icon: "🧥" },
    { judul: "Jahit Dress", desk: "Dress pesta, casual, atau formal", icon: "💃" },
    { judul: "Permak Pakaian", desk: "Mengecilkan, memotong, atau memperbaiki jahitan", icon: "✂️" },
    { judul: "Lainnya", desk: "Layanan jahit lainnya sesuai kebutuhan Anda", icon: "🧵" },
  ];

  return (
    <div className="bg-[#fdf8f4] min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#4a3728] mb-2">Pilih Layanan Jahit</h1>
          <p className="text-gray-500">Pilih jenis layanan yang sesuai dengan kebutuhan Anda</p>
        </header>

        {/* Grid Kartu Layanan yang Estetik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {daftarLayanan.map((item, index) => (
            <CardLayanan 
              key={index}
              judul={item.judul}
              deskripsi={item.desk}
              icon={item.icon}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
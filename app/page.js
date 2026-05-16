import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="bg-[#fdf8f4] min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-12 py-20 flex flex-col md:flex-row items-center justify-between">
        {/* Teks Utama */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-6xl font-serif text-[#4a3728] leading-tight font-bold">
            Jahit Sesuai Gayamu, <br/> Dengan Kualitas Terbaik
          </h2>
          <p className="text-gray-600 text-lg">
            Kami siap membantu mewujudkan pakaian impianmu dengan hasil jahitan rapi, profesional, dan bahan pilihan yang nyaman dipakai.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#4a3728] text-white px-8 py-4 rounded-md font-semibold hover:bg-[#3d2d21] transition-all">
              Lihat Layanan
            </button>
            <button className="border-2 border-[#4a3728] text-[#4a3728] px-8 py-4 rounded-md font-semibold hover:bg-[#f5e6d3] transition-all">
              Tentang Kami
            </button>
          </div>
        </div>

        {/* Gambar Hero sesuai desain */}
        <div className="md:w-1/2 flex justify-end mt-12 md:mt-0">
          <div className="relative">
            <div className="bg-[#e9dcc9] rounded-t-full w-[400px] h-[500px] flex items-end justify-center overflow-hidden border-b-8 border-[#4a3728]">
              <img 
                src="/images/mannequin.png" 
                alt="Mannequin" 
                className="w-full object-contain"
              />
            </div>
            {/* Dekorasi tambahan */}
            <div className="absolute -bottom-4 -left-4 bg-white p-4 shadow-xl rounded-lg border border-orange-100">
              <p className="text-xs font-bold text-[#4a3728]">⭐ 5.0 Rating</p>
              <p className="text-[10px] text-gray-500">1000+ Pelanggan Puas</p>
            </div>
          </div>
        </div>
      </main>

      {/* Baris Keunggulan di bawah */}
      <section className="bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-2xl mb-2">🧵</p>
            <h4 className="font-bold text-sm">Kualitas Terbaik</h4>
          </div>
          <div className="text-center">
            <p className="text-2xl mb-2">🧺</p>
            <h4 className="font-bold text-sm">Bahan Pilihan</h4>
          </div>
          <div className="text-center">
            <p className="text-2xl mb-2">⚡</p>
            <h4 className="font-bold text-sm">Pengerjaan Cepat</h4>
          </div>
          <div className="text-center">
            <p className="text-2xl mb-2">🤝</p>
            <h4 className="font-bold text-sm">Layanan Ramah</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
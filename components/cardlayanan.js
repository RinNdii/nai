import Link from "next/link";

import { formatRupiah } from "@/lib/order-utils";

export default function CardLayanan({ id, judul, deskripsi, icon, harga }) {
  return (
    <Link href={`/pelanggan/buat-pesanan?layananId=${id}`}>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-50 flex flex-col items-center text-center transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer h-full">
        <div className="w-20 h-20 bg-orange-50 rounded-2xl mb-6 flex items-center justify-center text-4xl">
          {icon}
        </div>
        <h3 className="font-bold text-xl text-[#4a3728] mb-3">{judul}</h3>
        <p className="text-sm text-gray-400 leading-relaxed flex-1">
          {deskripsi}
        </p>
        <p className="mt-4 text-sm font-bold text-emerald-700">
          {formatRupiah(harga)}
        </p>
        <div className="mt-6 text-[#4a3728] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
          Pilih Layanan <span>→</span>
        </div>
      </div>
    </Link>
  );
}

import { formatRupiah } from "@/lib/order-utils";

export default function AdminSummaryCards({
  totalPesanan,
  perluDiproses,
  totalPendapatan,
}) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="min-w-[150px] rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <p className="text-xs font-bold uppercase text-gray-400">
          Total Pesanan
        </p>
        <p className="text-2xl font-bold text-blue-600">{totalPesanan}</p>
      </div>
      <div className="min-w-[150px] rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <p className="text-xs font-bold uppercase text-gray-400">
          Perlu Diproses
        </p>
        <p className="text-2xl font-bold text-orange-500">{perluDiproses}</p>
      </div>
      <div className="min-w-[150px] rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <p className="text-xs font-bold uppercase text-gray-400">
          Total Pendapatan
        </p>
        <p className="text-2xl font-bold text-emerald-600">
          {formatRupiah(totalPendapatan)}
        </p>
      </div>
    </div>
  );
}

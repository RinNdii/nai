import { formatRupiah } from "@/lib/order-utils";

export default function PenjahitSummaryCards({
  perluDikerjakan,
  pesananSelesai,
  totalPendapatan,
}) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="rounded-2xl border border-green-100 bg-green-50 px-6 py-4 text-right">
        <p className="text-xs font-bold uppercase tracking-wider text-green-600">
          Perlu Dikerjakan
        </p>
        <p className="text-2xl font-black text-green-800">
          {perluDikerjakan} Pesanan
        </p>
      </div>
      <div className="rounded-2xl border border-teal-100 bg-teal-50 px-6 py-4 text-right">
        <p className="text-xs font-bold uppercase tracking-wider text-teal-600">
          Pesanan Selesai
        </p>
        <p className="text-2xl font-black text-teal-800">
          {pesananSelesai} Pesanan
        </p>
      </div>
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-6 py-4 text-right">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
          Total Pendapatan
        </p>
        <p className="text-2xl font-black text-emerald-800">
          {formatRupiah(totalPendapatan)}
        </p>
      </div>
    </div>
  );
}

import { formatRupiah } from "@/lib/order-utils";

import StatusBadge from "@/components/statusbadge";

export default function AdminOrdersTable({ orders, emptyMessage }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <table className="w-full text-left">
        <thead className="border-b border-gray-100 bg-gray-50">
          <tr>
            <th className="p-5 text-sm font-semibold text-gray-600">Kode</th>
            <th className="p-5 text-sm font-semibold text-gray-600">
              Nama Pelanggan
            </th>
            <th className="p-5 text-sm font-semibold text-gray-600">Layanan</th>
            <th className="p-5 text-sm font-semibold text-gray-600">Harga</th>
            <th className="p-5 text-sm font-semibold text-gray-600">
              Tanggal Ambil
            </th>
            <th className="p-5 text-sm font-semibold text-gray-600">Status</th>
            <th className="p-5 text-right text-sm font-semibold text-gray-600">
              Penjahit
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.length > 0 ? (
            orders.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-gray-50/50">
                <td className="p-5 text-sm font-bold text-[#0f172a]">
                  {item.kode}
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      {item.pelanggan.nama.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-700">
                      {item.pelanggan.nama}
                    </span>
                  </div>
                </td>
                <td className="p-5 text-sm text-gray-600">{item.layanan}</td>
                <td className="p-5 text-sm font-semibold text-emerald-700">
                  {formatRupiah(item.harga)}
                </td>
                <td className="p-5 text-sm text-gray-600">
                  {new Date(item.tanggalAmbil).toLocaleDateString("id-ID")}
                </td>
                <td className="p-5">
                  <StatusBadge status={item.status} />
                </td>
                <td className="p-5 text-right">
                  <span className="text-sm text-gray-500">
                    {item.penjahit?.nama ?? "Belum ditetapkan"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-8 text-center text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

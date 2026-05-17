import { formatRupiah } from "@/lib/order-utils";

export default function RevenueChart({
  title,
  subtitle,
  data,
  colorClassName = "bg-blue-500",
}) {
  const maxValue = Math.max(...data.map((item) => item.value), 0);

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {data.length > 0 ? (
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="font-semibold text-gray-800">
                  {formatRupiah(item.value)}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${colorClassName}`}
                  style={{
                    width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-400">
          Belum ada data pendapatan untuk ditampilkan.
        </div>
      )}
    </section>
  );
}

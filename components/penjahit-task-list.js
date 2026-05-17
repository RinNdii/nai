import OrderStatusActions from "@/components/order-status-actions";
import StatusBadge from "@/components/statusbadge";
import { formatRupiah } from "@/lib/order-utils";

export default function PenjahitTaskList({
  title,
  description,
  tasks,
  emptyMessage,
  showActions = true,
}) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="grid gap-6">
        {tasks.length > 0 ? (
          tasks.map((tugas) => (
            <div
              key={tugas.id}
              className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md md:flex-row"
            >
              <div className="flex items-center gap-5">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${
                    showActions ? "bg-green-100" : "bg-emerald-100"
                  }`}
                >
                  {showActions ? "🧵" : "✅"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {tugas.layanan}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {tugas.pelanggan?.nama ? (
                      <>
                        Pelanggan:{" "}
                        <span className="font-semibold text-gray-600">
                          {tugas.pelanggan.nama}
                        </span>{" "}
                        •{" "}
                      </>
                    ) : null}
                    Kode: {tugas.kode}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-emerald-700">
                    Nilai Pesanan: {formatRupiah(tugas.harga)}
                  </p>
                  {showActions ? (
                    <p className="mt-1 text-xs text-gray-400">
                      {tugas.deskripsi ||
                        "Belum ada catatan tambahan dari pelanggan."}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase text-gray-400">
                    Deadline
                  </p>
                  <p className="text-sm font-semibold text-red-500">
                    {new Date(tugas.tanggalAmbil).toLocaleDateString("id-ID")}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <StatusBadge status={tugas.status} />
                  {showActions ? (
                    <OrderStatusActions
                      orderId={tugas.id}
                      currentStatus={tugas.status}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-400">
            {emptyMessage}
          </div>
        )}
      </div>
    </section>
  );
}

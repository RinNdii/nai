"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/navbar";
import { PAYMENT_METHODS } from "@/lib/constants";
import { formatRupiah } from "@/lib/order-utils";

export default function BuatPesananForm({
  user,
  initialLayananId,
  layananOptions,
}) {
  const router = useRouter();
  const fieldClassName =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-[#4a3728]";
  const defaultLayananId = useMemo(() => {
    const parsedId = Number(initialLayananId);
    const layananTerpilih = layananOptions.find((item) => item.id === parsedId);

    if (layananTerpilih) {
      return String(layananTerpilih.id);
    }

    return layananOptions[0] ? String(layananOptions[0].id) : "";
  }, [initialLayananId, layananOptions]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    layananId: defaultLayananId,
    deskripsi: "",
    lingkarDada: "",
    lebarBahu: "",
    lingkarPinggang: "",
    lingkarPanggul: "",
    panjangLengan: "",
    tinggiBadan: "",
    tanggalAmbil: "",
    referensiUrl: "",
    metodePembayaran: "",
  });
  const selectedLayanan = useMemo(
    () => layananOptions.find((item) => String(item.id) === form.layananId),
    [form.layananId, layananOptions],
  );
  const hargaOtomatis = selectedLayanan?.harga ?? 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/pesanan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Pesanan gagal dikirim.");
        return;
      }

      setSuccess(`Pesanan ${data.kode} berhasil dibuat.`);
      router.push("/pelanggan/pesanan");
      router.refresh();
    } catch {
      setError("Terjadi gangguan saat mengirim pesanan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf8f4]">
      <Navbar user={user} />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex flex-col overflow-hidden rounded-3xl border border-orange-50 bg-white shadow-sm md:flex-row">
          <div className="bg-[#4a3728] p-8 text-white md:w-1/3">
            <h2 className="mb-4 text-2xl font-bold">Buat Pesanan</h2>
            <p className="mb-6 text-sm leading-relaxed text-orange-100">
              Lengkapi detail pesanan Anda untuk mendapatkan hasil jahitan yang
              sempurna.
            </p>
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <span>📍</span> Ambil di Toko / Kirim ke Rumah
              </div>
              <div className="flex items-center gap-3">
                <span>⏱️</span> Pengerjaan 3-7 Hari Kerja
              </div>
            </div>
          </div>

          <div className="p-8 md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4a3728]">
                  Pilih Layanan
                </label>
                <select
                  required
                  name="layananId"
                  value={form.layananId}
                  onChange={handleChange}
                  className={fieldClassName}
                  disabled={layananOptions.length === 0}
                >
                  {layananOptions.length > 0 ? (
                    layananOptions.map((layanan) => (
                      <option
                        key={layanan.id}
                        value={layanan.id}
                        className="bg-white text-gray-900"
                      >
                        {layanan.nama}
                      </option>
                    ))
                  ) : (
                    <option value="" className="bg-white text-gray-500">
                      Belum ada layanan aktif
                    </option>
                  )}
                </select>
                {selectedLayanan ? (
                  <div className="mt-3 rounded-2xl border border-orange-100 bg-orange-50/60 p-4">
                    <p className="text-sm font-semibold text-[#4a3728]">
                      {selectedLayanan.icon ?? "🧵"} {selectedLayanan.nama}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">
                      {selectedLayanan.deskripsi}
                    </p>
                  </div>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4a3728]">
                  Deskripsi / Catatan
                </label>
                <textarea
                  name="deskripsi"
                  rows="2"
                  value={form.deskripsi}
                  onChange={handleChange}
                  placeholder="Contoh: model nya mau pakai furing..."
                  className={fieldClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4a3728]">
                  Lingkar Dada
                </label>
                <input
                  name="lingkarDada"
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.lingkarDada}
                  onChange={handleChange}
                  placeholder="... cm"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4a3728]">
                  Lebar Bahu
                </label>
                <input
                  name="lebarBahu"
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.lebarBahu}
                  onChange={handleChange}
                  placeholder="... cm"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4a3728]">
                  Lingkar Pinggang
                </label>
                <input
                  name="lingkarPinggang"
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.lingkarPinggang}
                  onChange={handleChange}
                  placeholder="... cm"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4a3728]">
                  Lingkar Panggul
                </label>
                <input
                  name="lingkarPanggul"
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.lingkarPanggul}
                  onChange={handleChange}
                  placeholder="... cm"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4a3728]">
                  Panjang Lengan
                </label>
                <input
                  name="panjangLengan"
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.panjangLengan}
                  onChange={handleChange}
                  placeholder="... cm"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4a3728]">
                  Tinggi
                </label>
                <input
                  name="tinggiBadan"
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.tinggiBadan}
                  onChange={handleChange}
                  placeholder="... cm"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4a3728]">
                  Tanggal Pengambilan
                </label>
                <input
                  required
                  name="tanggalAmbil"
                  type="date"
                  value={form.tanggalAmbil}
                  onChange={handleChange}
                  className={fieldClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4a3728]">
                  Link Referensi (Opsional)
                </label>
                <input
                  name="referensiUrl"
                  type="url"
                  value={form.referensiUrl}
                  onChange={handleChange}
                  placeholder="https://contoh-referensi.com/model-baju"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4a3728]">
                  Harga Otomatis
                </label>
                <input
                  value={formatRupiah(hargaOtomatis)}
                  readOnly
                  className={`${fieldClassName} bg-[#fdf8f4] font-semibold text-[#4a3728]`}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Harga dihitung otomatis berdasarkan layanan yang dipilih.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4a3728]">
                  Metode Pembayaran
                </label>
                <select
                  name="metodePembayaran"
                  value={form.metodePembayaran}
                  onChange={handleChange}
                  className={fieldClassName}
                >
                  <option value="" className="bg-white text-gray-500">
                    Pilih metode pembayaran
                  </option>
                  {PAYMENT_METHODS.map((item) => (
                    <option key={item} className="bg-white text-gray-900">
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[#4a3728]">
                  Ringkasan Pembayaran
                </p>
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  <div className="flex items-center justify-between gap-3">
                    <span>Layanan</span>
                    <span className="font-semibold text-[#4a3728]">
                      {selectedLayanan?.nama || "Belum dipilih"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Metode Pembayaran</span>
                    <span className="font-semibold text-[#4a3728]">
                      {form.metodePembayaran || "Belum dipilih"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-orange-100 pt-2">
                    <span className="font-medium">Total Bayar</span>
                    <span className="text-lg font-bold text-[#4a3728]">
                      {formatRupiah(hargaOtomatis)}
                    </span>
                  </div>
                </div>
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              {success && (
                <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={
                  isSubmitting || !form.metodePembayaran || !form.layananId
                }
                className="mt-4 w-full rounded-xl bg-[#4a3728] py-4 font-bold text-white shadow-lg transition-all hover:bg-[#3d2d21] active:scale-95"
              >
                {isSubmitting
                  ? "Memproses Pembayaran..."
                  : !form.layananId
                    ? "Layanan Belum Tersedia"
                    : form.metodePembayaran
                    ? `Bayar via ${form.metodePembayaran} & Buat Pesanan`
                    : "Pilih Pembayaran Terlebih Dahulu"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

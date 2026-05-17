"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { formatRupiah } from "@/lib/order-utils";

const initialForm = {
  nama: "",
  deskripsi: "",
  harga: "",
  icon: "🧵",
  aktif: true,
};

export default function AdminLayananManager({ initialLayanan }) {
  const router = useRouter();
  const [layananList, setLayananList] = useState(initialLayanan);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeCount = useMemo(
    () => layananList.filter((item) => item.aktif).length,
    [layananList],
  );

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      nama: item.nama,
      deskripsi: item.deskripsi,
      harga: String(item.harga),
      icon: item.icon || "🧵",
      aktif: item.aktif,
    });
    setFeedback({ type: "", message: "" });
  };

  const handleDelete = async (id) => {
    setFeedback({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/layanan/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        setFeedback({ type: "error", message: result.message });
        return;
      }

      setLayananList((current) => current.filter((item) => item.id !== id));
      setFeedback({ type: "success", message: result.message });
      router.refresh();
    } catch {
      setFeedback({
        type: "error",
        message: "Gagal menghapus layanan. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ type: "", message: "" });
    setIsSubmitting(true);

    const endpoint = editingId ? `/api/layanan/${editingId}` : "/api/layanan";
    const method = editingId ? "PATCH" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          harga: Number(form.harga),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setFeedback({ type: "error", message: result.message });
        return;
      }

      if (editingId) {
        setLayananList((current) =>
          current.map((item) => (item.id === result.id ? result : item)),
        );
        setFeedback({
          type: "success",
          message: "Layanan berhasil diperbarui.",
        });
      } else {
        setLayananList((current) =>
          [...current, result].sort((left, right) => left.nama.localeCompare(right.nama)),
        );
        setFeedback({
          type: "success",
          message: "Layanan baru berhasil ditambahkan.",
        });
      }

      resetForm();
      router.refresh();
    } catch {
      setFeedback({
        type: "error",
        message: "Gagal menyimpan layanan. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Kelola Layanan</h2>
            <p className="mt-1 text-sm text-gray-500">
              Admin dapat menambah, mengubah, menonaktifkan, atau menghapus
              layanan dari sini.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 px-4 py-3 text-right">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Layanan Aktif
            </p>
            <p className="text-2xl font-black text-slate-900">{activeCount}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Nama layanan
            </label>
            <input
              required
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
              placeholder="Contoh: Jahit Gamis"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_180px]">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Harga
              </label>
              <input
                required
                min="0"
                step="1"
                name="harga"
                type="number"
                value={form.harga}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                placeholder="450000"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Ikon
              </label>
              <input
                name="icon"
                value={form.icon}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                placeholder="🧵"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Deskripsi
            </label>
            <textarea
              required
              rows="4"
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
              placeholder="Jelaskan detail layanan agar pelanggan mudah memilih."
            />
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700">
            <input
              type="checkbox"
              name="aktif"
              checked={form.aktif}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300"
            />
            Tampilkan layanan ini untuk pelanggan
          </label>

          {feedback.message ? (
            <p
              className={`rounded-xl px-4 py-3 text-sm ${
                feedback.type === "error"
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {feedback.message}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Menyimpan..."
                : editingId
                  ? "Simpan Perubahan"
                  : "Tambah Layanan"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              disabled={isSubmitting}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Daftar Layanan</h2>
            <p className="mt-1 text-sm text-gray-500">
              Pelanggan hanya melihat layanan yang statusnya aktif.
            </p>
          </div>
          <div className="rounded-xl bg-emerald-50 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
              Total Layanan
            </p>
            <p className="text-2xl font-black text-emerald-900">
              {layananList.length}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {layananList.length > 0 ? (
            layananList.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-100 p-5 transition hover:border-gray-200 hover:bg-gray-50/50"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                      {item.icon || "🧵"}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-gray-800">
                          {item.nama}
                        </h3>
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                            item.aktif
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {item.aktif ? "Aktif" : "Nonaktif"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-500">
                        {item.deskripsi}
                      </p>
                      <p className="mt-3 text-sm font-semibold text-emerald-700">
                        {formatRupiah(item.harga)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      disabled={isSubmitting}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={isSubmitting}
                      className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-400">
              Belum ada layanan. Tambahkan layanan pertama dari form di samping.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

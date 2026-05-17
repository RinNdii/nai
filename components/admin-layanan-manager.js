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

export default function AdminLayananManager({
  initialLayanan,
  showForm = true,
  showList = true,
}) {
  const router = useRouter();
  const [layananList, setLayananList] = useState(initialLayanan);
  const [form, setForm] = useState(initialForm);
  const [editForm, setEditForm] = useState(initialForm);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeCount = useMemo(
    () => layananList.filter((item) => item.aktif).length,
    [layananList],
  );

  const resetForm = () => {
    setForm(initialForm);
  };

  const syncLayananList = (updatedItem) => {
    setLayananList((current) =>
      current
        .map((item) => (item.id === updatedItem.id ? updatedItem : item))
        .sort((left, right) => left.nama.localeCompare(right.nama)),
    );
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditForm({
      nama: item.nama,
      deskripsi: item.deskripsi,
      harga: String(item.harga),
      icon: item.icon || "🧵",
      aktif: item.aktif,
    });
    setFeedback({ type: "", message: "" });
  };

  const closeEditModal = () => {
    setEditingItem(null);
    setEditForm(initialForm);
  };

  const openDeleteModal = (item) => {
    setDeleteTarget(item);
    setFeedback({ type: "", message: "" });
  };

  const closeDeleteModal = () => {
    setDeleteTarget(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    setFeedback({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/layanan/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        setFeedback({ type: "error", message: result.message });
        return;
      }

      setLayananList((current) =>
        current.filter((item) => item.id !== deleteTarget.id),
      );
      setFeedback({ type: "success", message: result.message });
      closeDeleteModal();
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

    try {
      const response = await fetch("/api/layanan", {
        method: "POST",
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

      setLayananList((current) =>
        [...current, result].sort((left, right) =>
          left.nama.localeCompare(right.nama),
        ),
      );
      setFeedback({
        type: "success",
        message: "Layanan baru berhasil ditambahkan.",
      });

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

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!editingItem) {
      return;
    }

    setFeedback({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/layanan/${editingItem.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editForm,
          harga: Number(editForm.harga),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setFeedback({ type: "error", message: result.message });
        return;
      }

      syncLayananList(result);
      setFeedback({
        type: "success",
        message: "Layanan berhasil diperbarui.",
      });
      closeEditModal();
      router.refresh();
    } catch {
      setFeedback({
        type: "error",
        message: "Gagal memperbarui layanan. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFields = (currentForm, onChange) => (
    <>
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Nama layanan
        </label>
        <input
          required
          name="nama"
          value={currentForm.nama}
          onChange={onChange}
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
            value={currentForm.harga}
            onChange={onChange}
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
            value={currentForm.icon}
            onChange={onChange}
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
          value={currentForm.deskripsi}
          onChange={onChange}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
          placeholder="Jelaskan detail layanan agar pelanggan mudah memilih."
        />
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700">
        <input
          type="checkbox"
          name="aktif"
          checked={currentForm.aktif}
          onChange={onChange}
          className="h-4 w-4 rounded border-gray-300"
        />
        Tampilkan layanan ini untuk pelanggan
      </label>
    </>
  );

  return (
    <section
      className={`mt-8 grid gap-6 ${
        showForm && showList ? "xl:grid-cols-[0.95fr_1.05fr]" : "grid-cols-1"
      }`}
    >
      {showForm ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Kelola Layanan
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Admin dapat menambah, mengubah, menonaktifkan, atau menghapus
                layanan dari sini.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 px-4 py-3 text-right">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Layanan Aktif
              </p>
              <p className="text-2xl font-black text-slate-900">
                {activeCount}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {renderFields(form, handleChange)}

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
                {isSubmitting ? "Menyimpan..." : "Tambah Layanan"}
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
      ) : null}

      {showList ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Daftar Layanan
              </h2>
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
                        onClick={() => openDeleteModal(item)}
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
                Belum ada layanan. Tambahkan layanan pertama dari form di
                samping.
              </div>
            )}
          </div>
        </div>
      ) : null}

      {editingItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 px-4 py-6">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Edit Layanan
                </p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">
                  Perbarui detail layanan
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Ubah nama, harga, deskripsi, ikon, atau status layanan sesuai
                  kebutuhan.
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditModal}
                disabled={isSubmitting}
                className="rounded-full bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-500 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="mt-6 space-y-4">
              {renderFields(editForm, handleEditChange)}

              <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={isSubmitting}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {deleteTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 px-4 py-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
              !
            </div>
            <h3 className="mt-4 text-2xl font-bold text-gray-900">
              Hapus layanan?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Layanan <span className="font-semibold">{deleteTarget.nama}</span>{" "}
              akan dihapus permanen jika belum dipakai pada pesanan. Tindakan ini
              tidak bisa dibatalkan.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={isSubmitting}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

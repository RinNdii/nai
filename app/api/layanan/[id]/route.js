import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import prisma from "@/lib/prisma";

function normalizeLayananInput(body) {
  const nama = body.nama?.trim();
  const deskripsi = body.deskripsi?.trim();
  const harga = Number(body.harga);
  const icon = body.icon?.trim() || "🧵";

  return {
    nama,
    deskripsi,
    harga,
    icon,
    aktif: Boolean(body.aktif),
  };
}

function validateLayananInput(data) {
  if (!data.nama) {
    return "Nama layanan wajib diisi.";
  }

  if (!data.deskripsi) {
    return "Deskripsi layanan wajib diisi.";
  }

  if (!Number.isInteger(data.harga) || data.harga < 0) {
    return "Harga layanan harus berupa angka bulat nol atau lebih.";
  }

  return null;
}

export async function PATCH(request, { params }) {
  const user = await getCurrentUser();

  if (!user || user.role !== ROLES.ADMIN) {
    return NextResponse.json(
      { message: "Hanya admin yang dapat mengubah layanan." },
      { status: 403 },
    );
  }

  const { id } = await params;
  const layananId = Number(id);

  if (!Number.isInteger(layananId)) {
    return NextResponse.json(
      { message: "ID layanan tidak valid." },
      { status: 400 },
    );
  }

  const body = await request.json();
  const data = normalizeLayananInput(body);
  const validationError = validateLayananInput(data);

  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  try {
    const layanan = await prisma.layanan.update({
      where: { id: layananId },
      data,
    });

    return NextResponse.json(layanan);
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Nama layanan sudah digunakan." },
        { status: 409 },
      );
    }

    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Layanan tidak ditemukan." },
        { status: 404 },
      );
    }

    throw error;
  }
}

export async function DELETE(_request, { params }) {
  const user = await getCurrentUser();

  if (!user || user.role !== ROLES.ADMIN) {
    return NextResponse.json(
      { message: "Hanya admin yang dapat menghapus layanan." },
      { status: 403 },
    );
  }

  const { id } = await params;
  const layananId = Number(id);

  if (!Number.isInteger(layananId)) {
    return NextResponse.json(
      { message: "ID layanan tidak valid." },
      { status: 400 },
    );
  }

  const totalPesanan = await prisma.pesanan.count({
    where: { layananId },
  });

  if (totalPesanan > 0) {
    return NextResponse.json(
      {
        message:
          "Layanan sudah dipakai pada pesanan. Nonaktifkan layanan ini daripada menghapusnya.",
      },
      { status: 400 },
    );
  }

  try {
    await prisma.layanan.delete({
      where: { id: layananId },
    });

    return NextResponse.json({ message: "Layanan berhasil dihapus." });
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Layanan tidak ditemukan." },
        { status: 404 },
      );
    }

    throw error;
  }
}

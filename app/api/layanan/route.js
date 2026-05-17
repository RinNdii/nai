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
    aktif: body.aktif ?? true,
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

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Silakan login terlebih dahulu." },
      { status: 401 },
    );
  }

  const where = user.role === ROLES.ADMIN ? {} : { aktif: true };
  const layanan = await prisma.layanan.findMany({
    where,
    orderBy: [{ aktif: "desc" }, { nama: "asc" }],
  });

  return NextResponse.json(layanan);
}

export async function POST(request) {
  const user = await getCurrentUser();

  if (!user || user.role !== ROLES.ADMIN) {
    return NextResponse.json(
      { message: "Hanya admin yang dapat menambah layanan." },
      { status: 403 },
    );
  }

  const body = await request.json();
  const data = normalizeLayananInput(body);
  const validationError = validateLayananInput(data);

  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  try {
    const layanan = await prisma.layanan.create({ data });
    return NextResponse.json(layanan, { status: 201 });
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Nama layanan sudah digunakan." },
        { status: 409 },
      );
    }

    throw error;
  }
}

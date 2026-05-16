import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { LAYANAN_OPTIONS, PAYMENT_METHODS, ROLES } from "@/lib/constants";
import { generateOrderCode, serializeOrder } from "@/lib/order-utils";
import prisma from "@/lib/prisma";

function parseMeasurement(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Silakan login terlebih dahulu." },
      { status: 401 }
    );
  }

  const where =
    user.role === ROLES.PELANGGAN
      ? { pelangganId: user.id }
      : user.role === ROLES.PENJAHIT
        ? { penjahitId: user.id }
        : {};

  const orders = await prisma.pesanan.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      pelanggan: true,
      penjahit: true,
    },
  });

  return NextResponse.json(orders.map(serializeOrder));
}

export async function POST(request) {
  const user = await getCurrentUser();

  if (!user || user.role !== ROLES.PELANGGAN) {
    return NextResponse.json(
      { message: "Hanya pelanggan yang dapat membuat pesanan." },
      { status: 403 }
    );
  }

  const body = await request.json();

  if (!body.layanan || !body.tanggalAmbil || !body.metodePembayaran) {
    return NextResponse.json(
      { message: "Layanan, tanggal ambil, dan metode pembayaran wajib diisi." },
      { status: 400 }
    );
  }

  const layananValid = LAYANAN_OPTIONS.some((item) => item.judul === body.layanan);
  const pembayaranValid = PAYMENT_METHODS.includes(body.metodePembayaran);

  if (!layananValid || !pembayaranValid) {
    return NextResponse.json(
      { message: "Pilihan layanan atau pembayaran tidak valid." },
      { status: 400 }
    );
  }

  const defaultTailor = await prisma.user.findFirst({
    where: { role: ROLES.PENJAHIT },
    orderBy: { id: "asc" },
  });

  const order = await prisma.pesanan.create({
    data: {
      kode: generateOrderCode(),
      layanan: body.layanan,
      deskripsi: body.deskripsi?.trim() || null,
      metodePembayaran: body.metodePembayaran,
      referensiUrl: body.referensiUrl?.trim() || null,
      lingkarDada: parseMeasurement(body.lingkarDada),
      lebarBahu: parseMeasurement(body.lebarBahu),
      lingkarPinggang: parseMeasurement(body.lingkarPinggang),
      lingkarPanggul: parseMeasurement(body.lingkarPanggul),
      panjangLengan: parseMeasurement(body.panjangLengan),
      tinggiBadan: parseMeasurement(body.tinggiBadan),
      tanggalAmbil: new Date(body.tanggalAmbil),
      pelangganId: user.id,
      penjahitId: defaultTailor?.id ?? null,
    },
    include: {
      pelanggan: true,
      penjahit: true,
    },
  });

  return NextResponse.json(serializeOrder(order), { status: 201 });
}

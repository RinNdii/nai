import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { ORDER_STATUS, ROLES } from "@/lib/constants";
import { serializeOrder } from "@/lib/order-utils";
import prisma from "@/lib/prisma";

const ALLOWED_STATUS = Object.values(ORDER_STATUS);

export async function PATCH(request, { params }) {
  const user = await getCurrentUser();

  if (!user || ![ROLES.ADMIN, ROLES.PENJAHIT].includes(user.role)) {
    return NextResponse.json(
      { message: "Tidak memiliki akses untuk memperbarui pesanan." },
      { status: 403 }
    );
  }

  const { id } = await params;
  const { status } = await request.json();

  if (!ALLOWED_STATUS.includes(status)) {
    return NextResponse.json(
      { message: "Status pesanan tidak valid." },
      { status: 400 }
    );
  }

  const existingOrder = await prisma.pesanan.findUnique({
    where: { id: Number(id) },
  });

  if (!existingOrder) {
    return NextResponse.json(
      { message: "Pesanan tidak ditemukan." },
      { status: 404 }
    );
  }

  const updatedOrder = await prisma.pesanan.update({
    where: { id: Number(id) },
    data: {
      status,
      penjahitId:
        user.role === ROLES.PENJAHIT && !existingOrder.penjahitId
          ? user.id
          : existingOrder.penjahitId,
    },
    include: {
      pelanggan: true,
      penjahit: true,
    },
  });

  return NextResponse.json(serializeOrder(updatedOrder));
}

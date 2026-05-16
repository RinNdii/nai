import { NextResponse } from "next/server";

import { createSession, sanitizeUser, setSessionCookie } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const { nama, email, password } = await request.json();

  if (!nama || !email || !password) {
    return NextResponse.json(
      { message: "Nama, email, dan password wajib diisi." },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password minimal 6 karakter." },
      { status: 400 }
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "Email sudah terdaftar." },
      { status: 409 }
    );
  }

  const user = await prisma.user.create({
    data: {
      nama: nama.trim(),
      email: normalizedEmail,
      password,
      role: ROLES.PELANGGAN,
    },
  });

  const { token, expiresAt } = await createSession(user.id);
  await setSessionCookie(token, expiresAt);

  return NextResponse.json(
    {
      user: sanitizeUser(user),
    },
    { status: 201 }
  );
}

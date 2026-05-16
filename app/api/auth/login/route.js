import { NextResponse } from "next/server";

import { createSession, sanitizeUser, setSessionCookie } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const { email, password, role } = await request.json();

  if (!email || !password || !role) {
    return NextResponse.json(
      { message: "Email, password, dan role wajib diisi." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email.trim().toLowerCase(),
    },
  });

  if (!user || user.password !== password || user.role !== role) {
    return NextResponse.json(
      { message: "Email, password, atau role tidak sesuai." },
      { status: 401 }
    );
  }

  const { token, expiresAt } = await createSession(user.id);
  await setSessionCookie(token, expiresAt);

  return NextResponse.json({
    user: sanitizeUser(user),
  });
}

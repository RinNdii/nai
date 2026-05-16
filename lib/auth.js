import { randomUUID } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

const SESSION_COOKIE = "jahitku_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    nama: user.nama,
    email: user.email,
    role: user.role,
  };
}

export async function createSession(userId) {
  const token = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return { token, expiresAt };
}

export async function setSessionCookie(token, expiresAt) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export async function deleteSession(token) {
  if (!token) {
    return;
  }

  await prisma.session.deleteMany({
    where: { token },
  });
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) {
    await clearSessionCookie();
    return null;
  }

  if (session.expiresAt.getTime() < Date.now()) {
    await deleteSession(token);
    await clearSessionCookie();
    return null;
  }

  return session;
}

export async function getCurrentUser() {
  const session = await getCurrentSession();
  return sanitizeUser(session?.user ?? null);
}

export async function requireUser(role) {
  const user = await getCurrentUser();

  if (!user || (role && user.role !== role)) {
    redirect("/login");
  }

  return user;
}

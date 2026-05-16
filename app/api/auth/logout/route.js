import { NextResponse } from "next/server";

import {
  clearSessionCookie,
  deleteSession,
  getCurrentSession,
} from "@/lib/auth";

export async function POST() {
  const session = await getCurrentSession();

  if (session) {
    await deleteSession(session.token);
  }

  await clearSessionCookie();

  return NextResponse.json({ ok: true });
}

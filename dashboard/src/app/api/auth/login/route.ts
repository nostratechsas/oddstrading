import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  verifyCredentials,
} from "@/lib/auth";

/** Slows down credential stuffing without needing a store to rate-limit against. */
const FAILURE_DELAY_MS = 600;

export async function POST(request: Request) {
  let user = "";
  let password = "";

  try {
    const body = await request.json();
    user = typeof body.user === "string" ? body.user : "";
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  let ok = false;
  try {
    ok = verifyCredentials(user, password);
  } catch (error) {
    // Missing env vars — a server misconfiguration, not a bad password.
    console.error("[auth] configuración incompleta:", error);
    return NextResponse.json(
      { error: "El servidor no tiene configurado el acceso." },
      { status: 500 },
    );
  }

  if (!ok) {
    await new Promise((resolve) => setTimeout(resolve, FAILURE_DELAY_MS));
    return NextResponse.json(
      { error: "Usuario o contraseña incorrectos." },
      { status: 401 },
    );
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(user), sessionCookieOptions);

  return NextResponse.json({ ok: true });
}

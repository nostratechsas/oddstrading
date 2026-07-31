import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/LoginForm";
import { SESSION_COOKIE, readSessionToken } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Acceder — OddsTrading",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  // Verified here rather than in middleware, which has no node:crypto: an
  // already-signed-in visitor skips the form, an invalid cookie just sees it.
  const store = await cookies();
  if (readSessionToken(store.get(SESSION_COOKIE)?.value)) redirect("/");

  return <LoginShell />;
}

function LoginShell() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-bg px-4">
      {/* Brand glow behind the card — same gradient as the logo mark. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-40 [background:radial-gradient(60%_45%_at_50%_0%,#0d2b4a,transparent_70%)]"
      />
      <LoginForm />
    </main>
  );
}

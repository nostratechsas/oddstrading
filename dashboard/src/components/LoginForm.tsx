"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

const CONTACT_EMAIL = "contact@oddstradingview.com";
const SITE = "https://oddstradingview.com";

export function LoginForm() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setError(body.error ?? "No se pudo iniciar sesión.");
        setPending(false);
        return;
      }

      // `next` comes from the middleware redirect. Read at submit time from
      // the URL rather than through useSearchParams, which would opt the whole
      // form out of server rendering. Only same-site paths are accepted, so a
      // crafted ?next=https://evil.example cannot bounce the user off-site.
      const next = new URLSearchParams(window.location.search).get("next");
      const target = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
      router.replace(target);
      router.refresh();
    } catch {
      setError("No hay conexión con el servidor.");
      setPending(false);
    }
  };

  return (
    <div className="relative z-1 w-full max-w-[23rem]">
      <div className="mb-7 flex flex-col items-center gap-3">
        <Image
          src="/assets/brand/oddstrading-mark.png"
          alt=""
          aria-hidden="true"
          width={768}
          height={642}
          priority
          className="h-auto max-h-14 w-auto drop-shadow-[0_0_24px_rgb(34_197_94/0.3)]"
        />
        <Image
          src="/assets/brand/oddstrading-wordmark.png"
          alt="OddsTrading"
          width={385}
          height={72}
          priority
          className="h-auto max-h-6 w-auto"
        />
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-card border border-line bg-panel p-6 shadow-[0_8px_32px_rgb(0_0_0/0.4)]"
      >
        <h1 className="text-base font-semibold">Acceder al panel</h1>
        <p className="mt-1 mb-5 text-xs text-muted">
          Introduce las credenciales que te entregamos al activar tu demo.
        </p>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">Usuario</span>
          <input
            name="user"
            type="text"
            autoComplete="username"
            required
            autoFocus
            value={user}
            onChange={(event) => setUser(event.target.value)}
            className="w-full rounded-input border border-line-strong bg-raised px-3.5 py-2.5 text-sm text-ink outline-none transition-colors duration-150 placeholder:text-faint focus:border-up/50"
            placeholder="usuario"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-xs font-medium text-muted">Contraseña</span>
          <span className="relative block">
            <input
              name="password"
              type={reveal ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-input border border-line-strong bg-raised py-2.5 pr-11 pl-3.5 text-sm text-ink outline-none transition-colors duration-150 placeholder:text-faint focus:border-up/50"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setReveal((current) => !current)}
              aria-label={reveal ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-faint transition-colors duration-150 hover:text-ink"
            >
              {reveal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </span>
        </label>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-down/30 bg-down-soft px-3 py-2 text-xs text-down"
          >
            {error}
          </p>
        )}

        <Button type="submit" fullWidth disabled={pending} className="mt-5 disabled:opacity-70">
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Comprobando…
            </>
          ) : (
            <>
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              Entrar
            </>
          )}
        </Button>
        {/* States plainly where an account comes from. Without this the screen
            reads like a public sign-up, and a visitor with no credentials has
            no idea what to do next. */}
        <div className="mt-5 border-t border-line pt-4">
          <p className="text-xs leading-relaxed text-muted">
            <b className="font-semibold text-ink">¿No tienes cuenta?</b> El acceso al
            panel se entrega al contratar el <b className="font-semibold text-ink">demo
            de 7 días</b>. No hay registro abierto.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Solicitud de demo — OddsTrading")}`}
            className="mt-3 flex items-center justify-center gap-2 rounded-btn border border-line-strong px-4 py-2 text-xs font-medium text-ink transition-colors duration-150 hover:bg-hover"
          >
            <Mail className="h-3.5 w-3.5 text-up" aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
        </div>
      </form>

      <p className="mt-4 text-center text-[11px] text-faint">
        Acceso restringido ·{" "}
        <a
          href={SITE}
          className="underline decoration-line-strong underline-offset-2 transition-colors duration-150 hover:text-muted"
        >
          oddstradingview.com
        </a>
      </p>
    </div>
  );
}

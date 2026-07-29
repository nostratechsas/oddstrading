// 📖 Docs: obsidian/backend/api-architecture.md
/**
 * Single-field lead capture. Posts to the same-origin `/api/contact` route
 * handler through the typed client — the browser never calls an upstream CRM
 * directly.
 */
"use client";

import { useState } from "react";

import { apiFetch } from "@/lib/api-client";

type Status = "idle" | "sending" | "sent" | "error";

const MESSAGES: Record<Exclude<Status, "idle" | "sending">, string> = {
  sent: "¡Listo! Revisa tu correo: te enviamos la API key.",
  error: "No pudimos registrar tu correo. Inténtalo de nuevo en un momento.",
};

export const LeadForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [hint, setHint] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus("error");
      setHint("Escribe un correo válido para continuar.");
      return;
    }

    setStatus("sending");
    try {
      await apiFetch<{ received: boolean }>("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Lead landing",
          email: email.trim(),
          message: "Solicitud de API key desde la landing de OddsTrading.",
        }),
      });
      setEmail("");
      setStatus("sent");
      setHint(MESSAGES.sent);
    } catch {
      setStatus("error");
      setHint(MESSAGES.error);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="mt-3 flex w-full flex-col items-center gap-4">
      <div className="flex w-full flex-wrap justify-center gap-2.5">
        <label htmlFor="lead-email" className="sr-only">
          Correo de trabajo
        </label>
        <input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tu@empresa.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full max-w-[21rem] rounded-pill border border-border-hairline-strong bg-surface-raised px-6 py-3.5 text-[0.9375rem] transition-colors duration-[var(--duration-fast)] ease-entrance placeholder:text-foreground-subtle focus:border-accent-soft-strong focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 rounded-pill border border-transparent bg-action-primary py-2.5 pr-2.5 pl-6 text-base font-medium tracking-tight text-action-primary-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-primary-hover disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Obtener API key"}
          <span
            aria-hidden="true"
            className="grid h-8.5 w-8.5 shrink-0 place-items-center rounded-pill bg-background/15 transition-transform duration-[var(--duration-normal)] ease-entrance group-hover:translate-x-0.5 group-hover:-translate-y-px"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
        </button>
      </div>

      <p
        role="status"
        className={`min-h-5 text-sm ${status === "error" ? "text-signal-down" : "text-accent-emphasis"}`}
      >
        {hint}
      </p>
    </form>
  );
};

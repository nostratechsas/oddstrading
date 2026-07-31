"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, Moon, Settings, Sun, User } from "lucide-react";

import { alerts } from "@/lib/data";
import { useDashboard, type Section } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV: { id: Section; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "mercados", label: "Mercados" },
  { id: "competidores", label: "Competidores" },
  { id: "alertas", label: "Alertas" },
  { id: "arbitraje", label: "Arbitraje" },
  { id: "analytics", label: "Analytics" },
];

/** Closes a popover on outside click and on Escape. */
function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return ref;
}

export function Header() {
  const router = useRouter();
  const { section, setSection, notify } = useDashboard();
  const [light, setLight] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [read, setRead] = useState(false);

  const closeBell = useCallback(() => setBellOpen(false), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const bellRef = useDismiss(bellOpen, closeBell);
  const menuRef = useDismiss(menuOpen, closeMenu);

  // The palette is authored for the dark canvas; `light-mode` on the root flips
  // the semantic tokens in globals.css so the toggle does something real.
  useEffect(() => {
    document.documentElement.classList.toggle("light-mode", light);
  }, [light]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  };

  return (
    <header className="relative z-40 flex h-14 shrink-0 items-center gap-6 border-b border-line bg-rail pr-4 pl-5">
      <button
        type="button"
        onClick={() => setSection("dashboard")}
        className="flex min-w-0 cursor-pointer items-center gap-2"
        aria-label="Ir al inicio"
      >
        <Image
          src="/assets/brand/oddstrading-mark.png"
          alt=""
          aria-hidden="true"
          width={768}
          height={642}
          priority
          className="h-auto max-h-8 w-auto shrink-0 drop-shadow-[0_0_14px_rgb(34_197_94/0.28)]"
        />
        <Image
          src="/assets/brand/oddstrading-wordmark.png"
          alt="OddsTrading"
          width={385}
          height={72}
          priority
          className="h-auto max-h-4.5 w-auto min-w-0 max-w-full object-contain"
        />
      </button>

      <nav className="hidden h-full items-center gap-1 md:flex" aria-label="Principal">
        {NAV.map((item) => {
          const active = item.id === section;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex h-full cursor-pointer items-center px-3.5 text-sm transition-colors duration-150",
                active
                  ? "font-semibold text-ink after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-up"
                  : "text-muted hover:text-ink",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <span className="hidden items-center gap-2 rounded-full border border-line-strong bg-raised px-3 py-1.5 text-xs font-medium sm:flex">
          <i className="animate-live h-1.5 w-1.5 rounded-full bg-up" aria-hidden="true" />
          En vivo
        </span>

        <button
          type="button"
          onClick={() => {
            setLight((current) => !current);
            notify(light ? "Tema oscuro activado" : "Tema claro activado");
          }}
          aria-label={light ? "Cambiar a tema oscuro" : "Cambiar a tema claro"}
          aria-pressed={light}
          className="flex cursor-pointer items-center gap-0.5 rounded-full border border-line-strong bg-raised p-1 transition-colors duration-150 hover:bg-hover"
        >
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-150",
              !light && "bg-hover",
            )}
          >
            <Moon
              className={cn("h-3.5 w-3.5", light ? "text-faint" : "text-ink")}
              aria-hidden="true"
            />
          </span>
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-150",
              light && "bg-hover",
            )}
          >
            <Sun
              className={cn("h-3.5 w-3.5", light ? "text-ink" : "text-faint")}
              aria-hidden="true"
            />
          </span>
        </button>

        <div ref={bellRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setBellOpen((current) => !current);
              setRead(true);
            }}
            aria-expanded={bellOpen}
            aria-haspopup="dialog"
            aria-label={`Notificaciones${read ? "" : " (3 sin leer)"}`}
            className="relative cursor-pointer rounded-full p-2 transition-colors duration-150 hover:bg-hover"
          >
            <Bell className="h-4.5 w-4.5 text-muted" aria-hidden="true" />
            {!read && (
              <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-up text-[9px] font-bold text-white">
                3
              </span>
            )}
          </button>

          {bellOpen && (
            <div
              role="dialog"
              aria-label="Notificaciones"
              className="absolute right-0 mt-2 w-80 rounded-card border border-line-strong bg-rail p-1.5 shadow-[0_12px_40px_rgb(0_0_0/0.6)]"
            >
              <p className="px-2.5 py-2 text-[11px] font-semibold tracking-wide text-faint uppercase">
                Notificaciones
              </p>
              <ul className="max-h-80 overflow-y-auto">
                {alerts.map((alert) => (
                  <li key={alert.title}>
                    <button
                      type="button"
                      onClick={() => {
                        setSection("alertas");
                        setBellOpen(false);
                      }}
                      className="w-full cursor-pointer rounded-lg px-2.5 py-2 text-left transition-colors duration-150 hover:bg-hover"
                    >
                      <span className="block text-[13px] font-medium text-ink">{alert.title}</span>
                      <span className="block truncate text-xs text-muted">{alert.body}</span>
                      <span className="block text-[11px] text-faint">{alert.time}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setSection("alertas");
                  setBellOpen(false);
                }}
                className="mt-1 w-full cursor-pointer rounded-lg py-2 text-center text-xs font-medium text-up transition-colors duration-150 hover:bg-hover"
              >
                Ver todas las alertas
              </button>
            </div>
          )}
        </div>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="flex cursor-pointer items-center gap-2.5 rounded-full py-1 pr-1.5 pl-1 transition-colors duration-150 hover:bg-hover"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white"
              style={{ background: "linear-gradient(135deg,#475569,#1e293b)" }}
              aria-hidden="true"
            >
              TP
            </span>
            <span className="hidden text-left lg:block">
              <span className="block text-[13px] leading-tight font-semibold">Trader Pro</span>
              <span className="block text-[11px] leading-tight text-faint">Nivel 4</span>
            </span>
            <ChevronDown
              className={cn(
                "hidden h-3.5 w-3.5 text-faint transition-transform duration-150 lg:block",
                menuOpen && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-52 rounded-card border border-line-strong bg-rail p-1.5 shadow-[0_12px_40px_rgb(0_0_0/0.6)]"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  notify("Perfil disponible en la versión completa");
                  setMenuOpen(false);
                }}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-muted transition-colors duration-150 hover:bg-hover hover:text-ink"
              >
                <User className="h-4 w-4" aria-hidden="true" /> Mi perfil
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  notify("Ajustes disponibles en la versión completa");
                  setMenuOpen(false);
                }}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-muted transition-colors duration-150 hover:bg-hover hover:text-ink"
              >
                <Settings className="h-4 w-4" aria-hidden="true" /> Ajustes
              </button>
              <hr className="my-1 border-line" />
              <button
                type="button"
                role="menuitem"
                onClick={logout}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-down transition-colors duration-150 hover:bg-down-soft"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

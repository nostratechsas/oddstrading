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

/** "virtual.demo" → "VD" for the avatar chip. */
const initialsOf = (user: string): string =>
  user
    .split(/[.\-_@\s]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || user.slice(0, 2).toUpperCase();

export function Header() {
  const router = useRouter();
  const {
    user,
    section,
    setSection,
    notify,
    unread,
    markRead,
    markAllRead,
    theme,
    toggleTheme,
  } = useDashboard();
  const [bellOpen, setBellOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeBell = useCallback(() => setBellOpen(false), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const bellRef = useDismiss(bellOpen, closeBell);
  const menuRef = useDismiss(menuOpen, closeMenu);

  const light = theme === "light";

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
            toggleTheme();
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
            onClick={() => setBellOpen((current) => !current)}
            aria-expanded={bellOpen}
            aria-haspopup="dialog"
            aria-label={`Notificaciones${unread.length ? ` (${unread.length} sin leer)` : ""}`}
            className="relative cursor-pointer rounded-full p-2 transition-colors duration-150 hover:bg-hover"
          >
            <Bell className="h-4.5 w-4.5 text-muted" aria-hidden="true" />
            {unread.length > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-up text-[9px] font-bold text-white">
                {unread.length}
              </span>
            )}
          </button>

          {bellOpen && (
            <div
              role="dialog"
              aria-label="Notificaciones"
              className="absolute right-0 mt-2 w-80 rounded-card border border-line-strong bg-rail p-1.5 shadow-[0_12px_40px_rgb(0_0_0/0.6)]"
            >
              <div className="flex items-center justify-between px-2.5 py-2">
                <p className="text-[11px] font-semibold tracking-wide text-faint uppercase">
                  Notificaciones
                </p>
                {unread.length > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="cursor-pointer text-[11px] font-medium text-up transition-colors duration-150 hover:text-[#4ade80]"
                  >
                    Marcar todas
                  </button>
                )}
              </div>

              <ul className="max-h-80 overflow-y-auto">
                {alerts.map((alert) => {
                  const isUnread = unread.includes(alert.title);
                  return (
                    <li key={alert.title}>
                      <button
                        type="button"
                        onClick={() => {
                          markRead(alert.title);
                          setSection("alertas");
                          setBellOpen(false);
                        }}
                        className="flex w-full cursor-pointer gap-2 rounded-lg px-2.5 py-2 text-left transition-colors duration-150 hover:bg-hover"
                      >
                        {/* A dot, not just weight — unread state must not rely
                            on colour or boldness alone. */}
                        <span
                          className={cn(
                            "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                            isUnread ? "bg-up" : "bg-transparent",
                          )}
                          aria-hidden="true"
                        />
                        <span className="min-w-0">
                          <span
                            className={cn(
                              "block text-[13px]",
                              isUnread ? "font-semibold text-ink" : "text-muted",
                            )}
                          >
                            {alert.title}
                            {isUnread && <span className="sr-only"> (sin leer)</span>}
                          </span>
                          <span className="block truncate text-xs text-muted">{alert.body}</span>
                          <span className="block text-[11px] text-faint">{alert.time}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
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
              {initialsOf(user)}
            </span>
            <span className="hidden text-left lg:block">
              <span className="block max-w-[9rem] truncate text-[13px] leading-tight font-semibold">
                {user}
              </span>
              <span className="block text-[11px] leading-tight text-faint">Plan gratuito</span>
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
              className="absolute right-0 mt-2 w-56 rounded-card border border-line-strong bg-rail p-1.5 shadow-[0_12px_40px_rgb(0_0_0/0.6)]"
            >
              <div className="border-b border-line px-2.5 pt-1.5 pb-2.5">
                <p className="truncate text-[13px] font-semibold text-ink">{user}</p>
                <p className="text-[11px] text-faint">Plan gratuito · acceso limitado</p>
              </div>

              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  notify("Perfil disponible en la versión completa");
                  setMenuOpen(false);
                }}
                className="mt-1 flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-muted transition-colors duration-150 hover:bg-hover hover:text-ink"
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

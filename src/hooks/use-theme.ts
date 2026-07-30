"use client";

/**
 * Theme store. The active theme is written to `data-theme` on `<html>`, which is
 * what the Tier 2 overrides in `globals.css` key off, and mirrored to
 * `localStorage` so a reload keeps the choice.
 *
 * Light is the default. There is deliberately no `prefers-color-scheme` sync:
 * the light palette is the designed default for this site, not a fallback.
 */
import { create } from "zustand";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "oddstrading-theme";

interface ThemeState {
  theme: Theme;
  /** False until the stored value has been read, so nothing renders mid-guess. */
  hydrated: boolean;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
  hydrate: () => void;
}

const apply = (theme: Theme) => {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
};

export const useTheme = create<ThemeState>((set, get) => ({
  theme: "light",
  hydrated: false,

  setTheme: (theme) => {
    apply(theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Private mode / storage disabled — the choice just won't survive a reload.
    }
    set({ theme });
  },

  toggle: () => get().setTheme(get().theme === "dark" ? "light" : "dark"),

  hydrate: () => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      stored = null;
    }
    const theme: Theme = stored === "dark" ? "dark" : "light";
    apply(theme);
    set({ theme, hydrated: true });
  },
}));

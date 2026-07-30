// 📖 Docs: obsidian/frontend/component-conventions.md
/**
 * Live odds board — the hero's proof element. Ticks a random cell every ~1.9 s
 * and flashes it up (mint) or down (coral). The flash is a discrete colour
 * change, so it stays a token-backed CSS transition per ADR-0014.
 */
"use client";

import { useEffect, useState } from "react";

import { Bezel } from "@/components/ui/bezel";
import { PulseDot } from "@/components/ui/pulse-dot";
import type { SiteContent } from "@/data/content/es";
import type { OddsRow } from "@/data/content/shapes";

export interface LiveBoardProps {
  board: SiteContent["board"];
}

type Direction = "up" | "down" | null;

interface BoardState {
  odds: number[][];
  flash: { row: number; col: number; dir: Direction };
}

const ACCENTS: Record<OddsRow["accent"], string> = {
  primary: "bg-data-accent-primary",
  secondary: "bg-data-accent-secondary",
  tertiary: "bg-data-accent-tertiary",
  quaternary: "bg-data-accent-quaternary",
};

const COLUMNS = ["home", "draw", "away"] as const;

export const LiveBoard = ({ board }: LiveBoardProps) => {
  const rows = board.rows;

  // Prices and the flash marker move together, so they live in one state slice:
  // the direction can only be derived from the value it replaces.
  const [state, setState] = useState<BoardState>(() => ({
    odds: rows.map((row) => [row.home, row.draw, row.away]),
    flash: { row: -1, col: -1, dir: null },
  }));
  const [latency, setLatency] = useState(84);
  const { odds, flash } = state;

  useEffect(() => {
    const id = window.setInterval(() => {
      const row = Math.floor(Math.random() * rows.length);
      const col = Math.floor(Math.random() * COLUMNS.length);
      const delta = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.06 + 0.01);

      setState((current) => {
        const previous = current.odds[row][col];
        const value = Math.max(1.15, Math.round((previous + delta) * 100) / 100);
        return {
          odds: current.odds.map((line, r) =>
            r === row ? line.map((v, c) => (c === col ? value : v)) : line,
          ),
          flash: { row, col, dir: value > previous ? "up" : "down" },
        };
      });
      setLatency(72 + Math.floor(Math.random() * 34));
    }, 1900);

    return () => window.clearInterval(id);
  }, [rows.length]);

  return (
    <Bezel glow innerClassName="flex flex-col gap-5 p-6">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[0.6875rem] tracking-[0.18em] text-foreground-muted uppercase">
          <PulseDot />
          {board.live}
        </span>
        <span className="text-xs text-accent-emphasis tabular-nums">{latency} ms</span>
      </div>

      <div>
        <p className="text-[0.6875rem] tracking-wide text-foreground-subtle">{board.competition}</p>
        <h2 className="mt-1 text-xl font-normal tracking-tight">
          {board.match}{" "}
          <span className="px-1 text-base text-foreground-subtle">{board.versus}</span>{" "}
          {board.rival}
        </h2>
        <p className="mt-1 text-xs text-foreground-subtle">{board.meta}</p>
      </div>

      <ul className="flex flex-col gap-1">
        {rows.map((row, rowIndex) => (
          <li
            key={row.book}
            className="grid grid-cols-[1.4fr_repeat(3,1fr)] items-center gap-2 rounded-control bg-surface-glass px-3 py-2.5 transition-colors duration-[var(--duration-normal)] ease-entrance hover:bg-surface-raised"
          >
            <span className="flex items-center gap-2 text-[0.8125rem] text-foreground-muted">
              <i className={`h-1.5 w-1.5 shrink-0 rounded-pill ${ACCENTS[row.accent]}`} aria-hidden="true" />
              {row.book}
            </span>
            {COLUMNS.map((column, colIndex) => {
              const active = flash.row === rowIndex && flash.col === colIndex;
              const tone = !active
                ? ""
                : flash.dir === "up"
                  ? "bg-accent-soft text-signal-up"
                  : "bg-signal-down/10 text-signal-down";
              return (
                <span
                  key={column}
                  className={`rounded-md py-0.5 text-center text-[0.8125rem] tabular-nums transition-colors duration-[var(--duration-slow)] ease-entrance ${tone}`}
                >
                  {odds[rowIndex][colIndex].toFixed(2)}
                </span>
              );
            })}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-border-hairline pt-3 text-xs text-foreground-subtle">
        <span>{board.footNote}</span>
        <span>
          {board.edgeLabel}{" "}
          <b className="font-medium text-accent-emphasis">{board.edge}</b> {board.edgeSuffix}
        </span>
      </div>
    </Bezel>
  );
};

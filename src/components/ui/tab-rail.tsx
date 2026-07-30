// 📖 Docs: obsidian/frontend/components/ui.md
/**
 * TabRail — a real tablist whose selection is marked by one pill that slides
 * between tabs, rather than each tab repainting its own background.
 *
 * Port of 21st.dev's "Animated Tabs" (ibelick) onto `@react-spring/web`. The
 * original animates a framer-motion `layoutId`; framer-motion is banned by hard
 * rule #1 (ADR-0002), so the pill is measured off the active button and sprung
 * to that box instead. See ADR-0022.
 *
 * The rail wraps, so the pill springs `y` and `height` alongside `x` and
 * `width` — selecting a tab on the second row slides it down to meet it.
 */
"use client";

import { animated, useSpring } from "@react-spring/web";
import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";

import { useWindowWidth } from "@/hooks/use-window-size";

export interface TabRailItem {
  id: string;
  label: string;
}

/**
 * `solid` fills the pill with the foreground — the page's primary tab set.
 * `subtle` is the raised-chip treatment used inside a bezel's own chrome.
 */
export type TabRailTone = "solid" | "subtle";

export interface TabRailProps {
  items: readonly TabRailItem[];
  /** Id of the selected tab. */
  active: string;
  onSelect: (id: string) => void;
  /** Accessible name for the tablist. */
  label: string;
  /** Builds a tab's `id`, so its panel can point back at it. */
  tabId: (id: string) => string;
  /** Builds the `id` of the panel a tab controls. May be one shared panel. */
  panelId: (id: string) => string;
  tone?: TabRailTone;
  size?: "sm" | "md";
  className?: string;
}

interface PillBox {
  x: number;
  y: number;
  width: number;
  height: number;
  /**
   * False on the first measure and on re-measures after a resize — the pill
   * should appear and re-fit in place, and only travel on a real selection.
   */
  animate: boolean;
}

const PILL_TONES: Record<TabRailTone, string> = {
  solid: "bg-foreground",
  subtle: "border border-border-hairline bg-surface-raised",
};

const LABEL_TONES: Record<TabRailTone, { on: string; off: string }> = {
  solid: {
    on: "border-transparent text-background",
    off: "border-border-hairline text-foreground-muted hover:text-foreground",
  },
  subtle: {
    on: "border-transparent text-foreground",
    off: "border-transparent text-foreground-subtle hover:text-foreground",
  },
};

const SIZES = {
  sm: { rail: "gap-1", tab: "px-3.5 py-1.5 text-xs" },
  md: { rail: "gap-1.5", tab: "px-4 py-2 text-sm" },
} as const;

export const TabRail = ({
  items,
  active,
  onSelect,
  label,
  tabId,
  panelId,
  tone = "solid",
  size = "md",
  className = "",
}: TabRailProps) => {
  const tabsRef = useRef(new Map<string, HTMLButtonElement>());
  const measuredFor = useRef<string | null>(null);
  const [pill, setPill] = useState<PillBox | null>(null);
  const viewportWidth = useWindowWidth();

  useLayoutEffect(() => {
    const node = tabsRef.current.get(active);
    if (!node) return;

    // The rail is `relative`, so it is the buttons' offset parent and these
    // offsets are already rail-relative — no rect arithmetic needed.
    const animate =
      measuredFor.current !== null && measuredFor.current !== active;
    measuredFor.current = active;

    setPill({
      x: node.offsetLeft,
      y: node.offsetTop,
      width: node.offsetWidth,
      height: node.offsetHeight,
      animate,
    });
  }, [active, items, viewportWidth]);

  const indicator = useSpring({
    to: pill
      ? {
          x: pill.x,
          y: pill.y,
          width: pill.width,
          height: pill.height,
          opacity: 1,
        }
      : { opacity: 0 },
    immediate: !pill?.animate,
    config: { tension: 280, friction: 32 },
  });

  const focus = (id: string) => {
    onSelect(id);
    tabsRef.current.get(id)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = items.findIndex((item) => item.id === active);
    const step = (delta: number) =>
      focus(items[(index + delta + items.length) % items.length].id);

    switch (event.key) {
      case "ArrowRight":
        step(1);
        break;
      case "ArrowLeft":
        step(-1);
        break;
      case "Home":
        focus(items[0].id);
        break;
      case "End":
        focus(items[items.length - 1].id);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  const labels = LABEL_TONES[tone];
  // The selected label is styled for the pill it sits on, so it may only take
  // that styling once the pill has a box — otherwise the server markup renders
  // `text-background` over no pill at all and the label is invisible until
  // hydration. The measure happens in a layout effect, so this never paints.
  const marked = pill !== null;

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={`relative flex flex-wrap ${SIZES[size].rail} ${className}`}
    >
      {/* First in the DOM so the labels, which are positioned too, paint above
          it — both have an auto z-index, so paint order is document order. */}
      <animated.span
        aria-hidden="true"
        className={`absolute top-0 left-0 rounded-pill ${PILL_TONES[tone]}`}
        style={indicator}
      />

      {items.map((item) => {
        const selected = item.id === active;
        return (
          <button
            key={item.id}
            ref={(node) => {
              if (node) tabsRef.current.set(item.id, node);
              else tabsRef.current.delete(item.id);
            }}
            type="button"
            role="tab"
            id={tabId(item.id)}
            aria-selected={selected}
            aria-controls={panelId(item.id)}
            // Roving tabindex: the rail is one stop, arrows move within it.
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(item.id)}
            className={`relative rounded-pill border ${SIZES[size].tab} transition-colors duration-[var(--duration-fast)] ease-entrance ${
              selected && marked ? labels.on : labels.off
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

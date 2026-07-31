"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  /** Optional leading glyph — a flag, a bookie chip, a coloured dot. */
  icon?: ReactNode;
}

export interface SelectProps {
  options: readonly SelectOption[];
  value: string;
  onChange: (value: string) => void;
  /** Muted prefix — "País", "Liga", "Evento". */
  label?: string;
  /** Accessible name when no visible `label` is given. */
  ariaLabel?: string;
  className?: string;
  /** Dropdown alignment against the trigger. */
  align?: "start" | "end";
}

/**
 * Dark listbox. Built by hand rather than pulled from a library so it matches
 * the reference chrome exactly and ships no extra runtime.
 *
 * Keyboard: Enter/Space/ArrowDown open it, arrows move, Enter picks, Escape
 * closes and returns focus to the trigger.
 */
export function Select({
  options,
  value,
  onChange,
  label,
  ariaLabel,
  className,
  align = "start",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const selected = options.find((option) => option.value === value) ?? options[0];
  const currentIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  // Close on outside click and on Escape. Bound only while open so a page full
  // of selects does not carry a dozen idle listeners.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const pick = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActive(currentIndex);
      setOpen(true);
    }
  };

  const onListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (index + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index - 1 + options.length) % options.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      pick(active);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(options.length - 1);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        onClick={() => {
          setActive(currentIndex);
          setOpen((current) => !current);
        }}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 rounded-input border bg-panel px-3.5 py-2 text-sm transition-colors duration-150 hover:bg-hover",
          open ? "border-up/40" : "border-line-strong",
          className,
        )}
      >
        {label && <span className="shrink-0 text-muted">{label}</span>}
        <span className="flex min-w-0 flex-1 items-center gap-1.5 text-left font-medium">
          {selected?.icon}
          <span className="truncate">{selected?.label}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-faint transition-transform duration-150",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          tabIndex={-1}
          ref={(node) => {
            node?.focus();
          }}
          onKeyDown={onListKeyDown}
          aria-label={ariaLabel ?? label}
          className={cn(
            "absolute z-50 mt-1.5 max-h-64 min-w-full overflow-y-auto rounded-input border border-line-strong bg-rail p-1 shadow-[0_12px_32px_rgb(0_0_0/0.55)] outline-none",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => pick(index)}
                  onMouseEnter={() => setActive(index)}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-[13px] whitespace-nowrap transition-colors duration-150",
                    index === active ? "bg-hover text-ink" : "text-muted",
                  )}
                >
                  {option.icon}
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 shrink-0 text-up" aria-hidden="true" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

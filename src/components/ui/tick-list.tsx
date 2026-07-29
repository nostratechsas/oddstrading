// 📖 Docs: obsidian/frontend/component-conventions.md
/**
 * Feature list with a drawn checkmark per row. The mark is a rotated
 * two-border pseudo-element (`.tick-marker`, globals.css `@layer components`)
 * because utilities cannot express it.
 */
export interface TickListProps {
  items: readonly string[];
  className?: string;
}

export const TickList = ({ items, className = "" }: TickListProps) => (
  <ul className={`flex flex-col gap-2.5 ${className}`}>
    {items.map((item) => (
      <li
        key={item}
        className="tick-marker relative pl-6 text-sm text-foreground-muted"
      >
        {item}
      </li>
    ))}
  </ul>
);

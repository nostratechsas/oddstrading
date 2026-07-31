import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-panel shadow-[0_1px_2px_rgb(0_0_0/0.3)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between gap-3 px-5 pt-4 pb-3", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-[13px] font-bold tracking-wide uppercase", className)}
      {...props}
    />
  );
}

/**
 * The green "Ver todos / Ver todas" header action. A button, not an anchor —
 * it expands a list in place rather than navigating anywhere.
 */
export function CardLink({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "shrink-0 cursor-pointer text-xs font-medium text-up transition-colors duration-150 hover:text-[#4ade80]",
        className,
      )}
      {...props}
    />
  );
}

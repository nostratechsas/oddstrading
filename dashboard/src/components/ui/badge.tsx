import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold",
  {
    variants: {
      variant: {
        up: "bg-up-soft text-up",
        down: "bg-down-soft text-down",
        gold: "bg-gold-soft text-gold",
        solid: "bg-up px-2 text-[10px] font-bold tracking-wide text-white uppercase",
        count: "bg-up px-1.5 text-[10px] font-bold text-white",
      },
    },
    defaultVariants: { variant: "up" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

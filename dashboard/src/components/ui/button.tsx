import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-btn text-sm font-semibold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-up",
  {
    variants: {
      variant: {
        primary:
          "bg-up text-white shadow-[0_0_16px_rgb(34_197_94/0.25)] hover:bg-[#1db954] hover:shadow-[0_0_22px_rgb(34_197_94/0.4)] active:scale-[0.98]",
        ghost:
          "border border-line-strong bg-raised text-ink hover:bg-hover active:scale-[0.98]",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, fullWidth, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, fullWidth }), className)} {...props} />
  );
}

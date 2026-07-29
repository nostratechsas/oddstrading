// 📖 Docs: obsidian/frontend/components/common.md
/**
 * Brand lockup — the symbol beside the wordmark.
 *
 * The two are separate files on purpose. The symbol comes from the favicon
 * master, so it stays crisp at any size; the wordmark is cropped from the
 * logotype. Composing them lets the symbol carry real visual weight without the
 * wordmark growing past what a navigation pill can hold.
 *
 * > [!important] Sized by `max-h`, never `h`
 * > A fixed height makes the lockup an unshrinkable block: inside a grid column
 * > it overflows and paints over the neighbouring column instead of scaling
 * > down. `max-h-*` + `h-auto` + `max-w-full` caps it when there is room and
 * > lets it shrink proportionally when there is not.
 */
import Image from "next/image";

export type LockupSize = "sm" | "md" | "lg" | "xl";

export interface BrandLockupProps {
  mark: string;
  wordmark: string;
  alt: string;
  size?: LockupSize;
  /** Only the first logo above the fold should preload. */
  priority?: boolean;
  className?: string;
}

/**
 * Sizes are read against the adaptive grid: the root font-size follows the
 * viewport off a 1920 px design base, so `max-h-16` lands at ~49 px at 1500 px
 * wide and ~64 px at 1920 px. The steps are chosen for how they land on screen,
 * not for their nominal rem value.
 */
const MARK: Record<LockupSize, string> = {
  sm: "max-h-9",
  md: "max-h-10 md:max-h-11",
  lg: "max-h-12 xl:max-h-16",
  xl: "max-h-16 xl:max-h-20",
};

const WORD: Record<LockupSize, string> = {
  sm: "max-h-5",
  md: "max-h-5 md:max-h-6",
  lg: "max-h-7 xl:max-h-9",
  xl: "max-h-9 xl:max-h-11",
};

const GAP: Record<LockupSize, string> = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-3",
  xl: "gap-3.5",
};

export const BrandLockup = ({
  mark,
  wordmark,
  alt,
  size = "lg",
  priority = false,
  className = "",
}: BrandLockupProps) => (
  <span className={`inline-flex min-w-0 max-w-full items-center ${GAP[size]} ${className}`}>
    <Image
      src={mark}
      alt=""
      aria-hidden="true"
      width={768}
      height={642}
      priority={priority}
      className={`${MARK[size]} h-auto w-auto shrink-0 drop-shadow-[0_0_20px_var(--accent-soft-strong)]`}
    />
    <Image
      src={wordmark}
      alt={alt}
      width={385}
      height={72}
      priority={priority}
      className={`${WORD[size]} h-auto w-auto min-w-0 max-w-full object-contain`}
    />
  </span>
);

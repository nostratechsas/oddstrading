// 📖 Docs: obsidian/frontend/components/common.md
/**
 * Brand lockup — the symbol beside the wordmark.
 *
 * The two are separate files on purpose. The symbol comes from the 2000 px
 * favicon master, so it stays crisp at any size; the wordmark is cropped from
 * the logotype. Composing them lets the symbol carry real visual weight
 * (`size="lg"` more than doubles it) without the wordmark growing past what a
 * navigation pill can hold.
 */
import Image from "next/image";

export type LockupSize = "md" | "lg" | "xl";

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
 * Sizes are read against the adaptive grid: the root font-size is derived from
 * the viewport with a 1920 px design base, so `h-16` renders ~49 px at 1500 px
 * wide, not 64 px. The steps below are chosen for how they land on screen, not
 * for their nominal rem value.
 */
const MARK: Record<LockupSize, string> = {
  md: "h-11",
  lg: "h-16",
  xl: "h-24",
};

const WORD: Record<LockupSize, string> = {
  md: "h-6",
  lg: "h-9",
  xl: "h-12",
};

const GAP: Record<LockupSize, string> = {
  md: "gap-2",
  lg: "gap-3",
  xl: "gap-4",
};

export const BrandLockup = ({
  mark,
  wordmark,
  alt,
  size = "lg",
  priority = false,
  className = "",
}: BrandLockupProps) => (
  <span className={`inline-flex items-center ${GAP[size]} ${className}`}>
    <Image
      src={mark}
      alt=""
      aria-hidden="true"
      width={768}
      height={642}
      priority={priority}
      className={`${MARK[size]} w-auto drop-shadow-[0_0_20px_var(--accent-soft-strong)]`}
    />
    <Image
      src={wordmark}
      alt={alt}
      width={385}
      height={72}
      priority={priority}
      className={`${WORD[size]} w-auto`}
    />
  </span>
);

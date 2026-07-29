// 📖 Docs: obsidian/architecture/folder-structure.md → "Asset convention"
/**
 * Hero backdrop: the brand cover film, composited transparently.
 *
 * The source clip has no alpha channel — its background sits at roughly #131313.
 * `mix-blend-mode: screen` maps black to fully transparent, so only the glowing
 * UI in the footage survives and it reads as a true cut-out over the OLED
 * canvas instead of a video rectangle. A radial veil then fades its edges into
 * the page so there is no visible seam.
 */
export interface HeroBackdropProps {
  src: string;
}

export const HeroBackdrop = ({ src }: HeroBackdropProps) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 -top-24 -z-1 h-[95vh] overflow-hidden"
  >
    <video
      className="h-full w-full scale-105 object-cover opacity-30 mix-blend-screen"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
    <span className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_28%,transparent,var(--background)_72%)]" />
    <span className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-b from-transparent to-background" />
  </div>
);

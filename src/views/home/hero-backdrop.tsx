// 📖 Docs: obsidian/architecture/folder-structure.md → "Asset convention"
/**
 * Hero backdrop: the brand cover film, composited transparently.
 *
 * The source clip has no alpha channel — its background sits at roughly #131313
 * — so it is blended rather than masked. The blend mode and opacity come from
 * theme tokens: `screen` on the OLED canvas maps black to transparent so only
 * the glowing UI survives; `multiply` on paper keeps that same UI readable
 * instead of washing it to white. A radial veil then fades the edges into the
 * page so there is no visible seam either way.
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
      className="h-full w-full scale-105 object-cover opacity-[var(--video-opacity)] mix-blend-[var(--video-blend)]"
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

// 📖 Docs: obsidian/architecture/folder-structure.md → "Asset convention"
/**
 * Hero backdrop: the brand cover film, composited transparently and drifting on
 * scroll.
 *
 * The source clip has no alpha channel — its background sits at roughly #131313
 * — so it is blended rather than masked. The blend mode and opacity come from
 * theme tokens: `screen` on the OLED canvas maps black to transparent so only
 * the glowing UI survives; `multiply` on paper keeps that same UI readable
 * instead of washing it to white. A radial veil then fades the edges into the
 * page so there is no visible seam either way.
 *
 * The film also lags the page as it scrolls — the parallax depth cue from
 * 21st.dev's "Hero Parallax", rebuilt on `<SpringTrigger mode="scrub">` because
 * framer-motion is banned by hard rule #1 (ADR-0002). See ADR-0022.
 *
 * This stays a Server Component: `<SpringTrigger>` is the client boundary and
 * every prop crossing it is serialisable.
 */
import { SpringTrigger } from "@/components/animation/springs/spring-trigger";

export interface HeroBackdropProps {
  src: string;
}

/**
 * How far the film lags the page over one hero-height of scroll, in px. Must
 * stay under the overscan below or the drift would expose the frame's edge.
 */
const DRIFT = 96;

export const HeroBackdrop = ({ src }: HeroBackdropProps) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 -top-24 -z-1 h-[95vh] overflow-hidden"
  >
    <SpringTrigger
      tag="div"
      className="absolute inset-0"
      innerTag="div"
      // 8rem of bleed above and below, so DRIFT can never uncover the frame.
      innerClassName="absolute inset-x-0 -top-32 h-[calc(95vh+16rem)]"
      mode="scrub"
      start="top top"
      end="bottom top"
      from={{ y: 0 }}
      to={{ y: DRIFT }}
      // A full-bleed video is the worst case for scroll-linked repaint, and the
      // depth cue is barely legible on a phone — not worth the frame budget.
      disableOnMobile
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
    </SpringTrigger>
    <span className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_28%,transparent,var(--background)_72%)]" />
    <span className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-b from-transparent to-background" />
  </div>
);

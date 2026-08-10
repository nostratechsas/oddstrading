// 📖 Docs: obsidian/workflows/new-page.md
/**
 * Hero — headline, value proposition, the two calls to action and the live odds
 * board, over the transparently-composited brand film.
 */
import { ActionLink } from "@/components/ui/action-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Shell } from "@/components/ui/shell";
import type { SiteContent } from "@/data/content/es";

import { HeroBackdrop } from "./hero-backdrop";
import { HeroHeadline } from "./hero-headline";
import { LiveBoard } from "./live-board";

export interface HeroProps {
  content: SiteContent;
}

/** The brand cover film. Exported because the showcase band reuses it. */
export const VIDEO_SRC = "/assets/hero/portada.mp4";

export const Hero = ({ content }: HeroProps) => {
  const { hero, board, base } = content;

  return (
    <section id={base ? "inicio" : "top"} className="relative pt-32 md:pt-40">
      <HeroBackdrop src={VIDEO_SRC} />

      <Shell className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <Eyebrow live>{hero.eyebrow}</Eyebrow>
          </Reveal>

          <HeroHeadline lines={hero.headline} accent={hero.headlineAccent} />

          <Reveal step={2}>
            <p className="max-w-[52ch] text-base leading-relaxed text-foreground-muted lg:max-w-[40ch]">
              {hero.lede}
            </p>
          </Reveal>

          <Reveal step={3} className="flex flex-wrap gap-3">
            <ActionLink href={`${base}/checkout`} size="lg">
              {hero.primaryCta}
            </ActionLink>
            <ActionLink href={`${base}/#integration`} tone="ghost" size="lg" icon="chevron">
              {hero.secondaryCta}
            </ActionLink>
          </Reveal>

          <Reveal step={4}>
            <p className="text-xs text-foreground-subtle">{hero.note}</p>
          </Reveal>
        </div>

        <Reveal step={3}>
          <LiveBoard board={board} />
        </Reveal>
      </Shell>
    </section>
  );
};

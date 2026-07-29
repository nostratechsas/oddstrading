// 📖 Docs: obsidian/workflows/new-page.md
/**
 * Hero — headline, value proposition, the two calls to action and the live
 * odds board, over the transparently-composited brand film.
 */
import { ActionLink } from "@/components/ui/action-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Shell } from "@/components/ui/shell";
import { HeroBackdrop } from "./hero-backdrop";
import { HeroHeadline } from "./hero-headline";
import { LiveBoard, type LiveBoardProps } from "./live-board";

export interface HeroProps {
  eyebrow: string;
  headline: readonly string[];
  headlineAccent: string;
  lede: string;
  note: string;
  videoSrc: string;
  board: LiveBoardProps;
}

export const Hero = ({
  eyebrow,
  headline,
  headlineAccent,
  lede,
  note,
  videoSrc,
  board,
}: HeroProps) => (
  <section id="inicio" className="relative pt-32 md:pt-40">
    <HeroBackdrop src={videoSrc} />

    <Shell className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
      <div className="flex flex-col items-start gap-6">
        <Reveal>
          <Eyebrow live>{eyebrow}</Eyebrow>
        </Reveal>

        <HeroHeadline lines={headline} accent={headlineAccent} />

        <Reveal step={2}>
          <p className="max-w-[52ch] text-base leading-relaxed text-foreground-muted lg:max-w-[38ch]">
            {lede}
          </p>
        </Reveal>

        <Reveal step={3} className="flex flex-wrap gap-3">
          <ActionLink href="#precios" size="lg">
            Crear cuenta gratis
          </ActionLink>
          <ActionLink href="#integracion" tone="ghost" size="lg" icon="chevron">
            Ver documentación
          </ActionLink>
        </Reveal>

        <Reveal step={4}>
          <p className="text-xs text-foreground-subtle">{note}</p>
        </Reveal>
      </div>

      <Reveal step={3}>
        <LiveBoard {...board} />
      </Reveal>
    </Shell>
  </section>
);

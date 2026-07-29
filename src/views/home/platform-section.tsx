// 📖 Docs: obsidian/workflows/new-page.md
/**
 * Platform bento — an asymmetric 6-column grid that tiles without gaps:
 * row 1 wide + narrow, rows 2-3 a tall cell beside two wide cells.
 */
import { Bezel } from "@/components/ui/bezel";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { TickList } from "@/components/ui/tick-list";
import type { platformContent } from "@/data/mocks/home";

import { CardIcon, type CardIconName } from "./card-icon";

export interface PlatformSectionProps {
  content: typeof platformContent;
}

const CardShell = ({
  icon,
  title,
  children,
  className = "",
  step = 0,
}: {
  icon: CardIconName;
  title: string;
  children: React.ReactNode;
  className?: string;
  step?: number;
}) => (
  <Reveal tag="article" step={step} className={className}>
    <Bezel className="h-full" innerClassName="flex h-full flex-col gap-3 p-8">
      <CardIcon name={icon} />
      <h3 className="text-xl font-normal tracking-tight">{title}</h3>
      {children}
    </Bezel>
  </Reveal>
);

export const PlatformSection = ({ content }: PlatformSectionProps) => (
  <section id="plataforma" className="py-20 md:py-28">
    <Shell>
      <header className="mb-12 flex max-w-[62ch] flex-col items-start gap-5">
        <Reveal>
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </Reveal>
        <SectionHeading lead={content.headline} muted={content.headlineMuted} />
        <Reveal step={2}>
          <p className="max-w-[52ch] text-foreground-muted">{content.lede}</p>
        </Reveal>
      </header>

      <div className="grid gap-4 md:grid-cols-6">
        <CardShell icon="stream" title={content.streaming.title} className="md:col-span-4">
          <p className="text-[0.9375rem] text-foreground-muted">{content.streaming.body}</p>
        </CardShell>

        <CardShell icon="globe" title={content.regions.title} step={1} className="md:col-span-2">
          <p className="text-[0.9375rem] text-foreground-muted">{content.regions.body}</p>
        </CardShell>

        <CardShell
          icon="engine"
          title={content.engines.title}
          step={2}
          className="md:col-span-2 md:row-span-2"
        >
          <p className="text-[0.9375rem] text-foreground-muted">{content.engines.body}</p>
          <TickList items={content.engines.items} className="mt-3" />
        </CardShell>

        <Reveal tag="article" step={1} className="md:col-span-4">
          <Bezel className="h-full" innerClassName="flex h-full flex-col gap-8 p-8 md:flex-row md:justify-between">
            <div className="flex max-w-[36ch] flex-col gap-3">
              <CardIcon name="history" />
              <h3 className="text-xl font-normal tracking-tight">{content.history.title}</h3>
              <p className="text-[0.9375rem] text-foreground-muted">{content.history.body}</p>
            </div>
            <ul className="flex shrink-0 flex-wrap gap-6 border-t border-border-hairline pt-6 md:flex-col md:border-t-0 md:border-l md:pt-0 md:pl-8">
              {content.history.metrics.map((metric) => (
                <li key={metric.label}>
                  <b className="block text-2xl font-light tracking-tight">{metric.value}</b>
                  <span className="text-xs text-foreground-subtle">{metric.label}</span>
                </li>
              ))}
            </ul>
          </Bezel>
        </Reveal>

        <Reveal tag="article" step={2} className="md:col-span-4">
          <Bezel className="h-full" innerClassName="flex h-full flex-col gap-8 p-8 md:flex-row md:justify-between">
            <div className="flex max-w-[36ch] flex-col gap-3">
              <CardIcon name="shield" />
              <h3 className="text-xl font-normal tracking-tight">{content.identity.title}</h3>
              <p className="text-[0.9375rem] text-foreground-muted">{content.identity.body}</p>
            </div>
            <ul className="flex w-full flex-col gap-3 md:w-2/5">
              {content.identity.aliases.map((alias) => (
                <li
                  key={alias.to}
                  className="flex flex-col gap-0.5 rounded-control border border-border-hairline bg-surface-glass px-3.5 py-2.5"
                >
                  <span className="text-xs text-foreground-subtle">{alias.from}</span>
                  <b className="text-xs font-normal text-accent-emphasis">{alias.to}</b>
                </li>
              ))}
            </ul>
          </Bezel>
        </Reveal>
      </div>
    </Shell>
  </section>
);

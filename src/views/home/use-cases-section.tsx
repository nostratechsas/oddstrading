// 📖 Docs: obsidian/workflows/new-page.md
/**
 * Use cases — a hairline-divided band of four audiences.
 */
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";

export interface UseCasesSectionProps {
  content: {
    eyebrow: string;
    headline: string;
    headlineMuted: string;
    items: readonly { kicker: string; title: string; body: string }[];
  };
}

export const UseCasesSection = ({ content }: UseCasesSectionProps) => (
  <section className="py-16 md:py-22">
    <Shell>
      <header className="mb-10 flex flex-col items-start gap-5">
        <Reveal>
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </Reveal>
        <SectionHeading lead={content.headline} muted={content.headlineMuted} />
      </header>

      <Reveal
        tag="ul"
        className="grid gap-px border-y border-border-hairline bg-border-hairline md:grid-cols-2 lg:grid-cols-4"
      >
        {content.items.map((item) => (
          <li
            key={item.kicker}
            className="flex flex-col gap-2.5 bg-background px-6 py-8 transition-colors duration-[var(--duration-normal)] ease-entrance hover:bg-background-elevated"
          >
            <span className="text-[0.6875rem] tracking-[0.16em] text-accent-emphasis uppercase">
              {item.kicker}
            </span>
            <h3 className="text-lg font-normal tracking-tight">{item.title}</h3>
            <p className="text-[0.9375rem] text-foreground-muted">{item.body}</p>
          </li>
        ))}
      </Reveal>
    </Shell>
  </section>
);

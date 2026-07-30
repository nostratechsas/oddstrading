// 📖 Docs: obsidian/frontend/html-semantics.md
/**
 * FAQ — native `<details>` sharing a `name`, which makes the browser enforce a
 * single open item. No client JavaScript, so this stays a Server Component.
 */
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import type { SiteContent } from "@/data/content/es";

export interface FaqSectionProps {
  content: SiteContent["faq"];
  email: string;
}

export const FaqSection = ({ content, email }: FaqSectionProps) => (
  <section id="faq" className="py-16 md:py-22">
    <Shell className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
      <header className="flex flex-col items-start gap-5 lg:sticky lg:top-28">
        <Reveal>
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </Reveal>
        <SectionHeading lead={content.headline} muted={content.headlineMuted} />
        <Reveal step={2}>
          <p className="text-foreground-muted">
            {content.ledePrefix}{" "}
            <a
              href={`mailto:${email}`}
              className="text-accent-emphasis transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-action-primary-hover"
            >
              {email}
            </a>
            .
          </p>
        </Reveal>
      </header>

      <Reveal tag="div" className="flex flex-col">
        {content.items.map((item, index) => (
          <details
            key={item.question}
            name="faq"
            className={`accordion-item group border-b border-border-hairline ${index === 0 ? "border-t" : ""}`}
          >
            <summary className="flex cursor-pointer items-center justify-between gap-8 py-6 text-base font-normal tracking-tight transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent-emphasis group-open:text-accent-emphasis">
              {item.question}
              <span aria-hidden="true" className="relative h-3.5 w-3.5 shrink-0">
                <span className="absolute top-1/2 left-0 h-px w-3.5 -translate-y-1/2 bg-current" />
                <span className="absolute top-0 left-1/2 h-3.5 w-px -translate-x-1/2 bg-current transition-opacity duration-[var(--duration-normal)] ease-entrance group-open:opacity-0" />
              </span>
            </summary>
            <p className="max-w-[62ch] pr-8 pb-6 text-[0.9375rem] text-foreground-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </Reveal>
    </Shell>
  </section>
);

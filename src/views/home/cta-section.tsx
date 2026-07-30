// 📖 Docs: obsidian/workflows/new-page.md
/**
 * Closing call to action — the lead capture inside a glowing bezel.
 */
import { Bezel } from "@/components/ui/bezel";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Shell } from "@/components/ui/shell";
import type { SiteContent } from "@/data/content/es";

import { CtaHeadline } from "./cta-headline";
import { LeadForm } from "./lead-form";

export interface CtaSectionProps {
  content: SiteContent["cta"];
}

export const CtaSection = ({ content }: CtaSectionProps) => (
  <section id="contact" className="py-20 md:py-28">
    <Shell>
      <Reveal>
        <Bezel glow innerClassName="flex flex-col items-center gap-5 px-6 py-16 text-center md:px-16 md:py-22">
          <Eyebrow live>{content.eyebrow}</Eyebrow>
          <CtaHeadline lead={content.headline} accent={content.headlineAccent} />
          <p className="max-w-[48ch] text-foreground-muted">{content.body}</p>

          <LeadForm content={content} />

          <ul className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2">
            {content.trust.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-foreground-subtle">
                <i aria-hidden="true" className="h-1 w-1 rounded-pill bg-accent-emphasis" />
                {item}
              </li>
            ))}
          </ul>
        </Bezel>
      </Reveal>
    </Shell>
  </section>
);

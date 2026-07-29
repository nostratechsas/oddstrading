// 📖 Docs: obsidian/workflows/new-page.md
/**
 * Closing call to action — the lead capture inside a glowing bezel.
 */
import { Bezel } from "@/components/ui/bezel";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Shell } from "@/components/ui/shell";

import { CtaHeadline } from "./cta-headline";
import { LeadForm } from "./lead-form";

export interface CtaSectionProps {
  trust: readonly string[];
}

export const CtaSection = ({ trust }: CtaSectionProps) => (
  <section id="contacto" className="py-20 md:py-28">
    <Shell>
      <Reveal>
        <Bezel glow innerClassName="flex flex-col items-center gap-5 px-6 py-16 text-center md:px-16 md:py-22">
          <Eyebrow live>Empieza hoy</Eyebrow>
          <CtaHeadline lead="La línea se mueve." accent="Muévete antes." />
          <p className="max-w-[48ch] text-foreground-muted">
            Déjanos tu correo y coordinamos una demo técnica con datos reales. Si ya sabes qué
            plan necesitas, puedes contratarlo directo.
          </p>

          <LeadForm />

          <ul className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2">
            {trust.map((item) => (
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

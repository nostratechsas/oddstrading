// 📖 Docs: obsidian/workflows/new-page.md
/**
 * Integration — three steps beside the live request/response samples, then the
 * official SDK entry points.
 */
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import type { CodeSample } from "@/data/mocks/home";

import { CodePanel } from "./code-panel";

export interface IntegrationSectionProps {
  steps: readonly { index: string; title: string; body: string }[];
  samples: readonly CodeSample[];
  sdks: readonly { name: string; command: string }[];
}

export const IntegrationSection = ({ steps, samples, sdks }: IntegrationSectionProps) => (
  <section id="integracion" className="py-20 md:py-28">
    <Shell>
      <header className="mb-12 flex max-w-[62ch] flex-col items-start gap-5">
        <Reveal>
          <Eyebrow>Integración</Eyebrow>
        </Reveal>
        <SectionHeading lead="De la API key" muted="a producción, hoy." />
        <Reveal step={2}>
          <p className="max-w-[52ch] text-foreground-muted">
            JSON plano, paginación predecible y SDKs oficiales. La primera cuota llega antes de
            que termines el café.
          </p>
        </Reveal>
      </header>

      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Reveal tag="ol" className="flex flex-col gap-8">
          {steps.map((step) => (
            <li key={step.index} className="relative border-l border-border-hairline-strong pl-6">
              <span
                aria-hidden="true"
                className="absolute -left-[3.5px] top-2.5 h-1.5 w-1.5 rounded-pill bg-accent-emphasis shadow-[0_0_0_4px_var(--accent-soft)]"
              />
              <span className="text-xs tracking-widest text-accent-emphasis">{step.index}</span>
              <h3 className="mt-1 text-lg font-normal tracking-tight">{step.title}</h3>
              <p className="mt-1 max-w-[34ch] text-[0.9375rem] text-foreground-muted">{step.body}</p>
            </li>
          ))}
        </Reveal>

        <Reveal step={1}>
          <CodePanel samples={samples} />
        </Reveal>
      </div>

      <Reveal tag="ul" className="mt-12 grid gap-4 md:grid-cols-3">
        {sdks.map((sdk) => (
          <li key={sdk.name}>
            <a
              href="#contacto"
              className="flex flex-col gap-1.5 rounded-control border border-border-hairline bg-surface-glass px-6 py-5 transition-colors duration-[var(--duration-normal)] ease-entrance hover:border-border-hairline-strong hover:bg-surface-raised"
            >
              <b className="text-base font-normal tracking-tight">{sdk.name}</b>
              <code className="text-xs text-foreground-subtle">{sdk.command}</code>
            </a>
          </li>
        ))}
      </Reveal>
    </Shell>
  </section>
);

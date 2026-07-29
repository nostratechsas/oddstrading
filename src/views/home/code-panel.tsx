// 📖 Docs: obsidian/frontend/html-semantics.md
/**
 * Tabbed request/response samples with a copy control. Colouring comes from the
 * shared tokenizer, so no highlighting dependency ships to the client.
 */
"use client";

import { useId, useState } from "react";

import { Bezel } from "@/components/ui/bezel";
import type { CodeSample } from "@/data/mocks/home";
import { tokenizeLine, type TokenKind } from "@/utils/code/tokenize";

export interface CodePanelProps {
  samples: readonly CodeSample[];
}

const TONES: Record<TokenKind, string> = {
  plain: "",
  comment: "text-foreground-subtle",
  string: "text-accent-code-string",
  number: "text-data-accent-quaternary",
  keyword: "text-accent-code-key",
};

export const CodePanel = ({ samples }: CodePanelProps) => {
  const [active, setActive] = useState(samples[0].id);
  const [copied, setCopied] = useState(false);
  const baseId = useId();
  const sample = samples.find((item) => item.id === active) ?? samples[0];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(sample.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Bezel innerClassName="overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-border-hairline p-3">
        <div role="tablist" aria-label="Ejemplos de código" className="flex gap-1">
          {samples.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                onClick={() => setActive(item.id)}
                className={`rounded-pill border px-3.5 py-1.5 text-xs transition-colors duration-[var(--duration-fast)] ease-entrance ${
                  selected
                    ? "border-border-hairline bg-surface-raised text-foreground"
                    : "border-transparent text-foreground-subtle hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={copy}
          className="rounded-pill border border-border-hairline px-3.5 py-1.5 text-xs text-foreground-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-accent-soft-strong hover:text-accent-emphasis"
        >
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>

      <pre
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${sample.id}`}
        className="overflow-x-auto p-6 text-[0.8125rem] leading-7"
      >
        <code>
          {sample.code.split("\n").map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {tokenizeLine(line).map((token, tokenIndex) => (
                <span key={tokenIndex} className={TONES[token.kind]}>
                  {token.text}
                </span>
              ))}
              {line.length === 0 ? " " : null}
            </span>
          ))}
        </code>
      </pre>
    </Bezel>
  );
};

// 📖 Docs: obsidian/frontend/html-semantics.md
/**
 * Tabbed request/response samples with a copy control. Colouring comes from the
 * shared tokenizer, so no highlighting dependency ships to the client.
 */
"use client";

import { useCallback, useId, useState } from "react";

import { Bezel } from "@/components/ui/bezel";
import { TabRail } from "@/components/ui/tab-rail";
import type { CodeSample } from "@/data/content/shapes";
import { tokenizeLine, type TokenKind } from "@/utils/code/tokenize";

export interface CodePanelProps {
  samples: readonly CodeSample[];
  tablistLabel: string;
  copyLabel: string;
  copiedLabel: string;
}

const TONES: Record<TokenKind, string> = {
  plain: "",
  comment: "text-foreground-subtle",
  string: "text-accent-code-string",
  number: "text-data-accent-quaternary",
  keyword: "text-accent-code-key",
};

export const CodePanel = ({
  samples,
  tablistLabel,
  copyLabel,
  copiedLabel,
}: CodePanelProps) => {
  const [active, setActive] = useState(samples[0].id);
  const [copied, setCopied] = useState(false);
  const baseId = useId();
  const sample = samples.find((item) => item.id === active) ?? samples[0];

  const tabId = useCallback((id: string) => `${baseId}-tab-${id}`, [baseId]);
  // Every tab drives the same `<pre>`, so they all control one panel id.
  const panelId = useCallback(() => `${baseId}-panel`, [baseId]);

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
        <TabRail
          items={samples}
          active={active}
          onSelect={setActive}
          label={tablistLabel}
          tabId={tabId}
          panelId={panelId}
          tone="subtle"
          size="sm"
        />
        <button
          type="button"
          onClick={copy}
          className="rounded-pill border border-border-hairline px-3.5 py-1.5 text-xs text-foreground-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-accent-soft-strong hover:text-accent-emphasis"
        >
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>

      <pre
        id={panelId()}
        role="tabpanel"
        aria-labelledby={tabId(sample.id)}
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

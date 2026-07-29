/**
 * Minimal, dependency-free tokenizer for the snippets shown in the integration
 * section. It only needs to distinguish five categories well enough to read —
 * it is a presentation aid, not a parser, so unknown syntax falls through as
 * plain text rather than being mangled.
 */
export type TokenKind = "plain" | "comment" | "string" | "number" | "keyword";

export interface CodeToken {
  text: string;
  kind: TokenKind;
}

const KEYWORDS = new Set([
  "import", "from", "const", "new", "if", "for", "in", "return", "await",
  "async", "export", "class", "def", "print", "curl",
]);

const PATTERN =
  /(#[^\n]*|\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g;

/** Splits one line of source into coloured tokens. */
export const tokenizeLine = (line: string): CodeToken[] => {
  const tokens: CodeToken[] = [];
  let cursor = 0;

  for (const match of line.matchAll(PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      tokens.push({ text: line.slice(cursor, index), kind: "plain" });
    }

    const [raw, comment, string, number, word] = match;
    if (comment) tokens.push({ text: raw, kind: "comment" });
    else if (string) tokens.push({ text: raw, kind: "string" });
    else if (number) tokens.push({ text: raw, kind: "number" });
    else if (word) {
      tokens.push({ text: raw, kind: KEYWORDS.has(word) ? "keyword" : "plain" });
    }

    cursor = index + raw.length;
  }

  if (cursor < line.length) {
    tokens.push({ text: line.slice(cursor), kind: "plain" });
  }

  return tokens;
};

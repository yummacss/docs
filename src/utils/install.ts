export type TokenKind = "command" | "argument" | "flag" | "text";

export interface Token {
  kind: TokenKind;
  text: string;
  /** Tokens are positional, so identity is position. */
  id: string;
}

/**
 * Eclipsa, as Shiki resolves it for a shell line.
 *
 * Shiki runs on the server during page generation, and this command is built in
 * a client component from a registry id, so there is no source string for it to
 * highlight. Running Shiki in the browser would mean shipping the core plus a
 * grammar to colour five tokens. These values were read out of `codeToTokens`
 * for a real `pnpm dlx` line instead, so the block is coloured exactly like
 * every authored fence on the site.
 */
export const TOKEN_COLORS: Record<TokenKind, string> = {
  command: "#F5FAFF",
  argument: "#BEC6F2",
  flag: "#DDA2F6",
  text: "#B9BED5",
};

/**
 * The install command for one registry entry.
 *
 * **The variant is a flag, not part of the name.** `yummaui add` resolves the
 * component against `/ui/r/index.json` and takes `--variant` separately, so
 * `add button-danger` is not a command - it exits 1 with "Unknown component".
 * The registry id is only how the files are keyed.
 *
 * pnpm only: it is the first tab everywhere else on the site, and a two-fence
 * CodeGroup under every preview would be more chrome than the command deserves.
 */
export function buildInstall(component: string, variant: string): Token[] {
  const parts: Omit<Token, "id">[] = [
    { kind: "command", text: "pnpm" },
    { kind: "text", text: " " },
    { kind: "argument", text: "dlx" },
    { kind: "text", text: " " },
    { kind: "argument", text: "yummaui" },
    { kind: "text", text: " " },
    { kind: "argument", text: "add" },
    { kind: "text", text: " " },
    { kind: "argument", text: component },
  ];

  if (variant !== "base") {
    parts.push(
      { kind: "text", text: " " },
      { kind: "flag", text: "--variant" },
      { kind: "text", text: " " },
      { kind: "argument", text: variant },
    );
  }

  return parts.map((token, index) => ({
    ...token,
    id: `${index}-${token.kind}-${token.text}`,
  }));
}

export function tokensToText(tokens: Token[]): string {
  return tokens.map((token) => token.text).join("");
}

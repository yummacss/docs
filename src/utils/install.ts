export type TokenKind = "command" | "argument" | "text";

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
  text: "#B9BED5",
};

/**
 * The install command for one registry entry.
 *
 * pnpm only: it is the first tab everywhere else on the site, and a two-fence
 * CodeGroup under every preview would be more chrome than the command deserves.
 */
export function buildInstall(registryId: string): Token[] {
  const parts: Omit<Token, "id">[] = [
    { kind: "command", text: "pnpm" },
    { kind: "text", text: " " },
    { kind: "argument", text: "dlx" },
    { kind: "text", text: " " },
    { kind: "argument", text: "yummaui" },
    { kind: "text", text: " " },
    { kind: "argument", text: "add" },
    { kind: "text", text: " " },
    { kind: "argument", text: registryId },
  ];

  return parts.map((token, index) => ({
    ...token,
    id: `${index}-${token.kind}-${token.text}`,
  }));
}

export function tokensToText(tokens: Token[]): string {
  return tokens.map((token) => token.text).join("");
}

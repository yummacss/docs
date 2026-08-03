import type { RegistryMeta, RegistryProp } from "@/registry";

export type PropValue = string | boolean | number;

export type TokenKind =
  | "punctuation"
  | "tag"
  | "attribute"
  | "operator"
  | "string"
  | "brace"
  | "value"
  | "command"
  | "argument"
  | "text";

export interface Token {
  kind: TokenKind;
  text: string;
  /**
   * Tokens are positional, so identity is position. Two `"lg"` strings in one
   * snippet are different spans & only the index separates them.
   */
  id: string;
}

type Draft = Omit<Token, "id">;

function identify(tokens: Draft[]): Token[] {
  return tokens.map((token, index) => ({
    ...token,
    id: `${index}-${token.kind}-${token.text}`,
  }));
}

/**
 * Eclipsa, as Shiki resolves it for these exact constructs.
 *
 * The playground's snippet is built from live control state, so there is no
 * source string for the server to highlight & running Shiki in the browser
 * would mean shipping the core plus a grammar to colour nine tokens. These
 * values were read out of `codeToTokens` for a representative JSX element and
 * shell line, so a hand-built snippet is coloured exactly like every fence the
 * real highlighter produces.
 */
export const TOKEN_COLORS: Record<TokenKind, string> = {
  punctuation: "#B9BED5",
  tag: "#85B1E0",
  attribute: "#DDA2F6",
  operator: "#93DDFB",
  string: "#BEC6F2",
  brace: "#9595E3",
  value: "#DDA2F6",
  command: "#F5FAFF",
  argument: "#BEC6F2",
  text: "#B9BED5",
};

/** `alert-dialog` -> `AlertDialog`, matching the component's exported name. */
export function componentName(id: string): string {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/**
 * Only props that differ from their default are written out, which is what
 * keeps the snippet copy-pasteable rather than a dump of every option.
 */
export function activeProps(
  meta: RegistryMeta,
  values: Record<string, PropValue>,
): RegistryProp[] {
  return meta.props.filter((prop) => {
    const value = values[prop.name];
    if (value === undefined || value === "") return false;
    return value !== prop.default;
  });
}

function attribute(prop: RegistryProp, value: PropValue): Draft[] {
  const name: Draft = { kind: "attribute", text: prop.name };

  // A bare attribute is `true`; JSX has no shorthand for the other one.
  if (typeof value === "boolean") {
    return value
      ? [name]
      : [
          name,
          { kind: "operator", text: "=" },
          { kind: "brace", text: "{" },
          { kind: "value", text: "false" },
          { kind: "brace", text: "}" },
        ];
  }

  if (typeof value === "number") {
    return [
      name,
      { kind: "operator", text: "=" },
      { kind: "brace", text: "{" },
      { kind: "value", text: String(value) },
      { kind: "brace", text: "}" },
    ];
  }

  return [
    name,
    { kind: "operator", text: "=" },
    { kind: "string", text: `"${value}"` },
  ];
}

/**
 * The usage snippet, as tokens.
 *
 * `text` is the children the component was given. A component whose schema
 * declares no children slot gets `undefined` & is written self-closing, so the
 * snippet matches how it is actually used rather than inventing a text child.
 */
export function buildSnippet(
  registryId: string,
  meta: RegistryMeta,
  values: Record<string, PropValue>,
  text: string | undefined,
): Token[] {
  const name = componentName(registryId);
  const props = activeProps(meta, values);

  const tokens: Draft[] = [
    { kind: "punctuation", text: "<" },
    { kind: "tag", text: name },
  ];

  for (const prop of props) {
    tokens.push({ kind: "text", text: "\n  " });
    tokens.push(...attribute(prop, values[prop.name] as PropValue));
  }

  if (text === undefined) {
    tokens.push({ kind: "punctuation", text: props.length ? "\n/>" : " />" });
    return identify(tokens);
  }

  if (props.length) {
    tokens.push({ kind: "punctuation", text: "\n>" });
    tokens.push({ kind: "text", text: `\n  ${text}\n` });
  } else {
    tokens.push({ kind: "punctuation", text: ">" });
    tokens.push({ kind: "text", text });
  }

  tokens.push({ kind: "punctuation", text: "</" });
  tokens.push({ kind: "tag", text: name });
  tokens.push({ kind: "punctuation", text: ">" });

  return identify(tokens);
}

/**
 * The install command. pnpm only: it is the first tab everywhere else on the
 * site, and a two-fence CodeGroup does not fit a one-line panel header.
 */
export function buildInstall(registryId: string): Token[] {
  return identify([
    { kind: "command", text: "pnpm" },
    { kind: "text", text: " " },
    { kind: "argument", text: "dlx" },
    { kind: "text", text: " " },
    { kind: "argument", text: "yummaui" },
    { kind: "text", text: " " },
    { kind: "argument", text: "add" },
    { kind: "text", text: " " },
    { kind: "argument", text: registryId },
  ]);
}

export function tokensToText(tokens: Token[]): string {
  return tokens.map((token) => token.text).join("");
}

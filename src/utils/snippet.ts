import type { RegistryMeta, RegistryProp } from "@/registry";

export type PropValue = string | boolean | number;

export type TokenKind =
  // Shell, for the install command.
  | "command"
  | "argument"
  | "flag"
  // JSX, for the usage snippet.
  | "keyword"
  | "punctuation"
  | "tag"
  | "attribute"
  | "operator"
  | "string"
  | "brace"
  | "value"
  | "text";

export interface Token {
  kind: TokenKind;
  text: string;
  /** Tokens are positional, so identity is position. */
  id: string;
}

type Draft = Omit<Token, "id">;

/**
 * Eclipsa, as Shiki resolves it for these exact constructs.
 *
 * Shiki runs on the server during page generation, and both of these are built
 * in a client component from a registry id & a schema, so there is no source
 * string for it to highlight. Running Shiki in the browser would mean shipping
 * the core plus two grammars to colour a dozen tokens. These values were read
 * out of `codeToTokens` for a real shell line and a real JSX element instead,
 * so a hand-built block is coloured exactly like every authored fence.
 */
export const TOKEN_COLORS: Record<TokenKind, string> = {
  command: "#F5FAFF",
  argument: "#BEC6F2",
  flag: "#DDA2F6",
  keyword: "#9595E3",
  punctuation: "#B9BED5",
  tag: "#85B1E0",
  attribute: "#DDA2F6",
  operator: "#93DDFB",
  string: "#BEC6F2",
  brace: "#9595E3",
  value: "#DDA2F6",
  text: "#B9BED5",
};

function identify(tokens: Draft[]): Token[] {
  return tokens.map((token, index) => ({
    ...token,
    id: `${index}-${token.kind}-${token.text}`,
  }));
}

/** `alert-dialog` -> `AlertDialog`, the name you would import it under. */
export function componentName(id: string): string {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

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
  const parts: Draft[] = [
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

  return identify(parts);
}

function attribute(prop: RegistryProp, value: unknown): Draft[] {
  const name: Draft = { kind: "attribute", text: prop.name };

  // An array or an object has no readable inline spelling, so the snippet names
  // it: `items={items}` rather than four screens of seed data.
  if (typeof value === "object" && value !== null) {
    return [
      name,
      { kind: "operator", text: "=" },
      { kind: "brace", text: "{" },
      { kind: "value", text: prop.name },
      { kind: "brace", text: "}" },
    ];
  }

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
 * How you use the component, not how it is built.
 *
 * The base entry of a migrated component *is* the implementation - it is the
 * file `yummaui add button` copies - so showing its source under `### Base`
 * answers a question nobody asked there. `<Button>Label</Button>` is the answer.
 * The implementation is still one click away in the registry JSON and the `.md`
 * route.
 *
 * Only props that differ from their default are written out, which is what
 * keeps the snippet copy-pasteable rather than a dump of every option.
 */
export function buildUsage(
  id: string,
  meta: RegistryMeta,
  values: Record<string, unknown>,
): Token[] {
  const name = componentName(id);

  // The import, because a snippet you can copy but not run is not a snippet.
  // `components/ui` and the `@/` alias are what `yummaui init` defaults to, so
  // this is the path the file lands at unless you told it otherwise.
  const tokens: Draft[] = [
    { kind: "keyword", text: "import" },
    { kind: "text", text: " " },
    { kind: "tag", text: name },
    { kind: "text", text: " " },
    { kind: "keyword", text: "from" },
    { kind: "text", text: " " },
    { kind: "string", text: `"@/components/ui/${id}"` },
    { kind: "punctuation", text: ";" },
    { kind: "text", text: "\n\n" },
  ];

  const props = meta.props.filter((prop) => {
    const value = values[prop.name];
    if (value === undefined || value === "") return false;
    // An array or an object has no useful inline JSX spelling, so it is named
    // rather than dumped: `items={items}` beats four screens of seed data.
    return value !== prop.default;
  });

  tokens.push({ kind: "punctuation", text: "<" }, { kind: "tag", text: name });

  for (const prop of props) {
    tokens.push({ kind: "text", text: "\n  " });
    tokens.push(...attribute(prop, values[prop.name]));
  }

  // A component whose schema declares no children slot is written self-closing,
  // so the snippet matches how it is actually used.
  if (meta.children === undefined) {
    tokens.push({ kind: "punctuation", text: props.length ? "\n/>" : " />" });
    return identify(tokens);
  }

  if (props.length) {
    tokens.push({ kind: "punctuation", text: "\n>" });
    tokens.push({ kind: "text", text: `\n  ${meta.children}\n` });
  } else {
    tokens.push({ kind: "punctuation", text: ">" });
    tokens.push({ kind: "text", text: meta.children });
  }

  tokens.push({ kind: "punctuation", text: "</" });
  tokens.push({ kind: "tag", text: name });
  tokens.push({ kind: "punctuation", text: ">" });

  return identify(tokens);
}

export function tokensToText(tokens: Token[]): string {
  return tokens.map((token) => token.text).join("");
}

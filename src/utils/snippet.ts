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
  /**
   * Name of the collapsible region this token belongs to, if any. Consecutive
   * tokens sharing a name fold together, the way an editor's gutter arrow
   * collapses a block.
   */
  fold?: string;
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

/** pnpm first, npm second, everywhere on the site. `pnpx` does not exist. */
export const PACKAGE_MANAGERS = ["pnpm", "npm"] as const;
export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

/**
 * The install command for one registry entry.
 *
 * **The variant is a flag, not part of the name.** `yummaui add` resolves the
 * component against `/ui/r/index.json` and takes `--variant` separately, so
 * `add button-danger` is not a command - it exits 1 with "Unknown component".
 * The registry id is only how the files are keyed.
 */
export function buildInstall(
  component: string,
  variant: string,
  manager: PackageManager = "pnpm",
): Token[] {
  const runner: Draft[] =
    manager === "pnpm"
      ? [
          { kind: "command", text: "pnpm" },
          { kind: "text", text: " " },
          { kind: "argument", text: "dlx" },
        ]
      : [{ kind: "command", text: "npx" }];

  const parts: Draft[] = [
    ...runner,
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

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/**
 * A JavaScript object literal, not JSON: unquoted keys where they are valid
 * identifiers, because the snippet is meant to be pasted into a `.tsx` file.
 */
function literal(value: unknown, indent: string): Draft[] {
  if (typeof value === "string") {
    return [{ kind: "string", text: JSON.stringify(value) }];
  }
  if (value === null || typeof value !== "object") {
    return [{ kind: "value", text: String(value) }];
  }

  const inner = `${indent}  `;

  if (Array.isArray(value)) {
    const tokens: Draft[] = [{ kind: "punctuation", text: "[" }];
    for (const item of value) {
      tokens.push({ kind: "text", text: `\n${inner}` });
      tokens.push(...literal(item, inner));
      tokens.push({ kind: "punctuation", text: "," });
    }
    tokens.push({ kind: "text", text: `\n${indent}` });
    tokens.push({ kind: "punctuation", text: "]" });
    return tokens;
  }

  const tokens: Draft[] = [{ kind: "punctuation", text: "{" }];
  for (const [key, item] of Object.entries(value)) {
    tokens.push({ kind: "text", text: `\n${inner}` });
    tokens.push({
      kind: "tag",
      text: IDENTIFIER.test(key) ? key : JSON.stringify(key),
    });
    tokens.push({ kind: "punctuation", text: ": " });
    tokens.push(...literal(item, inner));
    tokens.push({ kind: "punctuation", text: "," });
  }
  tokens.push({ kind: "text", text: `\n${indent}` });
  tokens.push({ kind: "punctuation", text: "}" });
  return tokens;
}

function attribute(prop: RegistryProp, value: unknown): Draft[] {
  const name: Draft = { kind: "attribute", text: prop.name };

  // An icon prop is spelled inline as the JSX it actually is. It has to come
  // before the object branch below, because a React element *is* an object &
  // would otherwise print as `icon={icon}` referencing nothing.
  if (prop.exampleIcon) {
    return [
      name,
      { kind: "operator", text: "=" },
      { kind: "brace", text: "{" },
      { kind: "punctuation", text: "<" },
      { kind: "tag", text: prop.exampleIcon },
      { kind: "punctuation", text: " />" },
      { kind: "brace", text: "}" },
    ];
  }

  // An array or an object is declared above the element & referenced by name.
  // Spelling it inline would be unreadable; leaving it as `items={items}` with
  // nothing declared would be a snippet the reader's editor rejects.
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
    { kind: "text", text: "\n" },
  ];

  const props = meta.props.filter((prop) => {
    const value = values[prop.name];
    if (value === undefined || value === "") return false;
    return value !== prop.default;
  });

  // Icons the snippet is about to spell inline need importing too, or the
  // thing you copied does not compile.
  const icons = [
    ...new Set(
      props.flatMap((prop) => (prop.exampleIcon ? [prop.exampleIcon] : [])),
    ),
  ].sort();

  if (icons.length) {
    tokens.push(
      { kind: "keyword", text: "import" },
      { kind: "text", text: " " },
      { kind: "brace", text: "{" },
      { kind: "text", text: " " },
      { kind: "tag", text: icons.join(", ") },
      { kind: "text", text: " " },
      { kind: "brace", text: "}" },
      { kind: "text", text: " " },
      { kind: "keyword", text: "from" },
      { kind: "text", text: " " },
      { kind: "string", text: '"iconoir-react"' },
      { kind: "punctuation", text: ";" },
      { kind: "text", text: "\n" },
    );
  }

  tokens.push({ kind: "text", text: "\n" });

  tokens.push({ kind: "punctuation", text: "<" }, { kind: "tag", text: name });

  for (const prop of props) {
    tokens.push({ kind: "text", text: "\n  " });
    tokens.push(...attribute(prop, values[prop.name]));
  }

  // A component whose schema declares no children slot is written self-closing,
  // so the snippet matches how it is actually used.
  if (meta.children === undefined) {
    tokens.push({ kind: "punctuation", text: props.length ? "\n/>" : " />" });
  } else {
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
  }

  return identify([...tokens, ...declarations(props, values)]);
}

/**
 * Fixture data, below the element rather than above it.
 *
 * The component is what you came to read; the data is what it happens to be fed.
 * Every registry file already puts its own fixtures last for the same reason,
 * and it stays valid because the array is only evaluated when the component
 * renders, not when the module loads.
 *
 * The body is marked foldable so the default view is one line, `const items =
 * [ ... ];`. Folding hides nothing: the tokens are all still there & the copy
 * button takes the whole snippet either way.
 */
function declarations(
  props: RegistryProp[],
  values: Record<string, unknown>,
): Draft[] {
  const tokens: Draft[] = [];

  for (const prop of props) {
    const value = values[prop.name];
    if (typeof value !== "object" || value === null) continue;
    // An icon was already spelled inline as JSX. It is a React element, so it
    // is an object, but declaring `const icon = {...}` for it would dump the
    // element's internals into the snippet & contradict the attribute above it.
    if (prop.exampleIcon) continue;

    const body = literal(value, "");
    // Everything between the opening and closing bracket, which is what an
    // editor's gutter arrow would collapse.
    for (const token of body.slice(1, -1)) token.fold = prop.name;

    tokens.push(
      { kind: "text", text: "\n\n" },
      { kind: "keyword", text: "const" },
      { kind: "text", text: " " },
      { kind: "tag", text: prop.name },
      { kind: "text", text: " " },
      { kind: "operator", text: "=" },
      { kind: "text", text: " " },
      ...body,
      { kind: "punctuation", text: ";" },
    );
  }

  return tokens;
}

export function tokensToText(tokens: Token[]): string {
  return tokens.map((token) => token.text).join("");
}

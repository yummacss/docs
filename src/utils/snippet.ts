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
   * Collapsible region name; consecutive tokens with the same name fold together.
   */
  fold?: string;
}

type Draft = Omit<Token, "id">;

/** Hand-matched Shiki colors; avoids loading Shiki client-side for snippets. */
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

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/** The `{ "$icon": "Star" }` marker in a value, if any. */
export function iconMarker(
  value: unknown,
): { name: string; size?: string } | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }
  const keys = Object.keys(value);
  if (!keys.includes("$icon")) return null;
  if (keys.some((key) => key !== "$icon" && key !== "size")) return null;
  const { $icon: name, size } = value as { $icon: unknown; size?: unknown };
  if (typeof name !== "string") return null;
  return { name, size: typeof size === "string" ? size : undefined };
}

/** Every icon name marked anywhere inside an example value. */
function markedIcons(value: unknown): string[] {
  const marker = iconMarker(value);
  if (marker) return [marker.name];
  if (Array.isArray(value)) return value.flatMap(markedIcons);
  if (typeof value === "object" && value !== null) {
    return Object.values(value).flatMap(markedIcons);
  }
  return [];
}

function literal(value: unknown, indent: string): Draft[] {
  if (typeof value === "string") {
    return [{ kind: "string", text: JSON.stringify(value) }];
  }
  if (value === null || typeof value !== "object") {
    return [{ kind: "value", text: String(value) }];
  }

  // `{ "$icon": "Star" }` prints as JSX in the snippet.
  const marker = iconMarker(value);
  if (marker) {
    const tokens: Draft[] = [
      { kind: "punctuation", text: "<" },
      { kind: "tag", text: marker.name },
    ];
    if (marker.size) {
      tokens.push(
        { kind: "text", text: " " },
        { kind: "attribute", text: "className" },
        { kind: "operator", text: "=" },
        { kind: "string", text: JSON.stringify(marker.size) },
      );
    }
    tokens.push({ kind: "punctuation", text: " />" });
    return tokens;
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

  // Icon props spell inline JSX before the object branch below.
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

  // Arrays/objects are declared below the element and referenced by name.
  if (typeof value === "object" && value !== null) {
    return [
      name,
      { kind: "operator", text: "=" },
      { kind: "brace", text: "{" },
      { kind: "value", text: prop.name },
      { kind: "brace", text: "}" },
    ];
  }

  // JSX has no shorthand for `false` attributes.
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

/** Usage snippet for a component instance (non-default props only). */
export function buildUsage(
  id: string,
  meta: RegistryMeta,
  values: Record<string, unknown>,
): Token[] {
  const name = componentName(id);

  // Import matches `yummaui init` default paths.
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

  // Inline icon JSX needs matching iconoir imports.
  const icons = [
    ...new Set(
      props.flatMap((prop) => [
        ...(prop.exampleIcon ? [prop.exampleIcon] : []),
        ...markedIcons(values[prop.name]),
      ]),
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

  // One attribute per line on the opening tag.
  for (const prop of props) {
    tokens.push({ kind: "text", text: " " });
    tokens.push(...attribute(prop, values[prop.name]));
  }

  // Self-close when the schema has no children slot.
  if (meta.children === undefined) {
    tokens.push({ kind: "punctuation", text: " />" });
  } else {
    tokens.push({ kind: "punctuation", text: ">" });
    tokens.push({ kind: "text", text: meta.children });
    tokens.push({ kind: "punctuation", text: "</" });
    tokens.push({ kind: "tag", text: name });
    tokens.push({ kind: "punctuation", text: ">" });
  }

  return identify([...tokens, ...declarations(props, values)]);
}

/** `const` declarations for object/array props, below the element. */
function declarations(
  props: RegistryProp[],
  values: Record<string, unknown>,
): Draft[] {
  const tokens: Draft[] = [];

  for (const prop of props) {
    const value = values[prop.name];
    if (typeof value !== "object" || value === null) continue;
    // Icons were already spelled inline as JSX.
    if (prop.exampleIcon) continue;

    const body = literal(value, "");
    // Mark inner tokens foldable for the snippet UI.
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

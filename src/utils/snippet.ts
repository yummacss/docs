import type { RegistryMeta, RegistryProp } from "@/registry";
import { importPath } from "@/utils/install.mjs";

export type PropValue = string | boolean | number;

export type TokenKind =
  | "command"
  | "argument"
  | "flag"
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
  id: string;
  fold?: string;
}

type Draft = Omit<Token, "id">;

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

export function componentName(id: string): string {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

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

function markedIcons(value: unknown): string[] {
  const marker = iconMarker(value);
  if (marker) return [marker.name];
  if (Array.isArray(value)) return value.flatMap(markedIcons);
  if (typeof value === "object" && value !== null) {
    if ("$$typeof" in value) return [];
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

  if (typeof value === "object" && value !== null) {
    return [
      name,
      { kind: "operator", text: "=" },
      { kind: "brace", text: "{" },
      { kind: "value", text: prop.name },
      { kind: "brace", text: "}" },
    ];
  }

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

export function buildUsage(
  id: string,
  meta: RegistryMeta,
  values: Record<string, unknown>,
): Token[] {
  const name = componentName(id);

  const tokens: Draft[] = [
    { kind: "keyword", text: "import" },
    { kind: "text", text: " " },
    { kind: "tag", text: name },
    { kind: "text", text: " " },
    { kind: "keyword", text: "from" },
    { kind: "text", text: " " },
    { kind: "string", text: `"${importPath(id)}"` },
    { kind: "punctuation", text: ";" },
    { kind: "text", text: "\n" },
  ];

  const props = meta.props.filter((prop) => {
    const value = values[prop.name];
    if (value === undefined || value === "") return false;
    return value !== prop.default;
  });

  const icons = [
    ...new Set([
      ...props.flatMap((prop) => [
        ...(prop.exampleIcon ? [prop.exampleIcon] : []),
        ...markedIcons(values[prop.name]),
      ]),
      ...(meta.childrenExample ?? []).flatMap((child) =>
        markedIcons(child.props ?? {}),
      ),
    ]),
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
      { kind: "string", text: '"@solar-icons/react/linear"' },
      { kind: "punctuation", text: ";" },
      { kind: "text", text: "\n" },
    );
  }

  for (const child of [
    ...new Set(
      (meta.childrenExample ?? [])
        .map((entry) => entry.component)
        .filter((entry): entry is string => Boolean(entry)),
    ),
  ].sort()) {
    tokens.push(
      { kind: "keyword", text: "import" },
      { kind: "text", text: " " },
      { kind: "tag", text: child },
      { kind: "text", text: " " },
      { kind: "keyword", text: "from" },
      { kind: "text", text: " " },
      {
        kind: "string",
        text: `"${importPath(
          child.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
        )}"`,
      },
      { kind: "punctuation", text: ";" },
      { kind: "text", text: "\n" },
    );
  }

  tokens.push({ kind: "text", text: "\n" });

  tokens.push({ kind: "punctuation", text: "<" }, { kind: "tag", text: name });

  for (const prop of props) {
    tokens.push({ kind: "text", text: " " });
    tokens.push(...attribute(prop, values[prop.name]));
  }

  if (meta.childrenExample) {
    tokens.push({ kind: "punctuation", text: ">" });
    for (const child of meta.childrenExample) {
      tokens.push({ kind: "text", text: "\n  " });
      if (child.text !== undefined || !child.component) {
        tokens.push({ kind: "punctuation", text: "<" });
        tokens.push({ kind: "tag", text: "span" });
        tokens.push({ kind: "punctuation", text: ">" });
        tokens.push({ kind: "text", text: child.text ?? "" });
        tokens.push({ kind: "punctuation", text: "</" });
        tokens.push({ kind: "tag", text: "span" });
        tokens.push({ kind: "punctuation", text: ">" });
        continue;
      }
      tokens.push({ kind: "punctuation", text: "<" });
      tokens.push({ kind: "tag", text: child.component });
      for (const [key, value] of Object.entries(child.props ?? {})) {
        tokens.push({ kind: "text", text: " " });
        tokens.push({ kind: "attribute", text: key });
        tokens.push({ kind: "punctuation", text: "=" });
        const marker = iconMarker(value);
        if (marker) {
          tokens.push({ kind: "brace", text: "{" });
          tokens.push({ kind: "punctuation", text: "<" });
          tokens.push({ kind: "tag", text: marker.name });
          tokens.push({ kind: "punctuation", text: " />" });
          tokens.push({ kind: "brace", text: "}" });
          continue;
        }
        tokens.push({ kind: "string", text: JSON.stringify(String(value)) });
      }
      if (child.children === undefined) {
        tokens.push({ kind: "punctuation", text: " />" });
      } else {
        tokens.push({ kind: "punctuation", text: ">" });
        tokens.push({ kind: "text", text: child.children });
        tokens.push({ kind: "punctuation", text: "</" });
        tokens.push({ kind: "tag", text: child.component });
        tokens.push({ kind: "punctuation", text: ">" });
      }
    }
    tokens.push({ kind: "text", text: "\n" });
    tokens.push({ kind: "punctuation", text: "</" });
    tokens.push({ kind: "tag", text: name });
    tokens.push({ kind: "punctuation", text: ">" });
  } else if (meta.children === undefined) {
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

function declarations(
  props: RegistryProp[],
  values: Record<string, unknown>,
): Draft[] {
  const tokens: Draft[] = [];

  for (const prop of props) {
    const value = values[prop.name];
    if (typeof value !== "object" || value === null) continue;
    if (prop.exampleIcon) continue;

    const body = literal(value, "");
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

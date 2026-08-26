import type { RegistryMeta } from "@/registry";
import { type Category, categoryGetters } from "@/utils/yummacss";

/** MDX to plain markdown for `.md` routes and `llms-full.txt`. */
// Fence opener/closer at any indentation (MDX nests fences).
const FENCE = /^\s*(`{3,}|~{3,})/;

// Tags occupy a whole line except occasional single-line wrappers.
const SELF_CLOSING = /^\s*<([A-Za-z][A-Za-z0-9]*)((?:\s[^>]*?)?)\s*\/>\s*$/;
const OPENING = /^\s*<([A-Za-z][A-Za-z0-9]*)((?:\s[^>]*?)?)>\s*$/;
const CLOSING = /^\s*<\/([A-Za-z][A-Za-z0-9]*)>\s*$/;
const INLINE = /^\s*<([A-Za-z][A-Za-z0-9]*)((?:\s[^>]*?)?)>(.*)<\/\1>\s*$/;

const ATTRIBUTE = /([A-Za-z][A-Za-z0-9_-]*)="([^"]*)"/g;
const LIST_ITEM = /^\s*[-*+] /;

// Layout HTML wrappers that markdown can replace; other raw HTML stays.
const HTML_WRAPPERS = new Set(["a", "div"]);

/** Components are unwrapped by name; raw HTML only where markdown can say it. */
function unwrappable(name: string): boolean {
  return /^[A-Z]/.test(name) || HTML_WRAPPERS.has(name);
}

type Node =
  | { kind: "lines"; lines: string[] }
  | { kind: "component"; name: string; attrs: string; children: Node[] };

/** Injected registry source reader; keeps this module client-safe (no `node:fs`). */
export type RegistryResolver = (registryId: string) => string | null;

/** Injected meta reader; same client-safety rule as `RegistryResolver`. */
export type MetaResolver = (registryId: string) => RegistryMeta | null;

interface RenderOptions {
  resolveRegistry?: RegistryResolver;
  resolveMeta?: MetaResolver;
}

function parseAttrs(attrs: string): Record<string, string> {
  const parsed: Record<string, string> = {};
  for (const [, key, value] of attrs.matchAll(ATTRIBUTE)) {
    parsed[key] = value;
  }
  return parsed;
}

/** Strip shared indentation from wrapped component children. */
function dedent(lines: string[]): string[] {
  let common = Number.POSITIVE_INFINITY;

  for (const line of lines) {
    if (!line.trim()) continue;
    common = Math.min(common, line.length - line.trimStart().length);
  }

  if (!Number.isFinite(common) || common === 0) return lines;

  return lines.map((line) => (line.trim() ? line.slice(common) : line));
}

/** Mark fenced lines so component tags inside fences are not parsed as markup. */
function markFenced(lines: string[]): boolean[] {
  const fenced: boolean[] = [];
  let marker: string | null = null;

  for (const line of lines) {
    const fence = line.match(FENCE);

    if (marker === null) {
      fenced.push(fence !== null);
      if (fence) marker = fence[1];
      continue;
    }

    // Inside a fence: only a matching marker closes it.
    fenced.push(true);
    if (
      fence &&
      fence[1][0] === marker[0] &&
      fence[1].length >= marker.length
    ) {
      marker = null;
    }
  }

  return fenced;
}

/** Find closing tag for a component, skipping nested blocks and fences. */
function findClosing(
  lines: string[],
  fenced: boolean[],
  open: number,
  name: string,
): number {
  let depth = 1;

  for (let i = open + 1; i < lines.length; i++) {
    if (fenced[i]) continue;

    const closing = lines[i].match(CLOSING);
    if (closing?.[1] === name) {
      depth--;
      if (depth === 0) return i;
      continue;
    }

    const opening = lines[i].match(OPENING);
    if (opening?.[1] === name && !SELF_CLOSING.test(lines[i])) depth++;
  }

  return -1;
}

function parse(lines: string[]): Node[] {
  const fenced = markFenced(lines);
  const nodes: Node[] = [];
  let text: string[] = [];

  const flush = () => {
    if (text.length) nodes.push({ kind: "lines", lines: text });
    text = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (fenced[i]) {
      text.push(line);
      continue;
    }

    const selfClosing = line.match(SELF_CLOSING);
    if (selfClosing && unwrappable(selfClosing[1])) {
      flush();
      nodes.push({
        kind: "component",
        name: selfClosing[1],
        attrs: selfClosing[2] ?? "",
        children: [],
      });
      continue;
    }

    const inline = line.match(INLINE);
    if (inline && unwrappable(inline[1])) {
      flush();
      nodes.push({
        kind: "component",
        name: inline[1],
        attrs: inline[2] ?? "",
        children: [{ kind: "lines", lines: [inline[3].trim()] }],
      });
      continue;
    }

    const opening = line.match(OPENING);
    if (opening && unwrappable(opening[1])) {
      const close = findClosing(lines, fenced, i, opening[1]);
      // An unclosed tag runs to the end of the document rather than leaking.
      const end = close === -1 ? lines.length : close;

      flush();
      nodes.push({
        kind: "component",
        name: opening[1],
        attrs: opening[2] ?? "",
        children: parse(dedent(lines.slice(i + 1, end))),
      });

      i = end;
      continue;
    }

    // A closing tag with no opener: drop it, so no tag reaches the output.
    const closing = line.match(CLOSING);
    if (closing && unwrappable(closing[1])) continue;

    text.push(line);
  }

  flush();

  return nodes;
}

/** The same schema the controls & the props table use, as markdown. */
function buildPropsTable(meta: RegistryMeta): string[] {
  if (!meta.props?.length) return [];

  const rows = meta.props.map((prop) => {
    // `typeName` when `type` is only `none`.
    const type = prop.typeName
      ? `\`${prop.typeName}\``
      : prop.type === "enum" && prop.values
        ? prop.values.map((value) => `\`"${value}"\``).join(" \\| ")
        : `\`${prop.type}\``;
    const fallback =
      prop.default === undefined ? "-" : `\`${JSON.stringify(prop.default)}\``;
    // A pipe inside a cell would end the column early.
    const description = (prop.description ?? "").replaceAll("|", "\\|");
    return `| \`${prop.name}\` | ${type} | ${fallback} | ${description} |`;
  });

  return [
    ...(meta.summary ? [meta.summary, ""] : []),
    "| Prop | Type | Default | Description |",
    "|------|------|---------|-------------|",
    ...rows,
  ];
}

function buildReferenceTable(category: Category, name: string): string[] {
  try {
    const getter = categoryGetters[category];
    if (!getter) return [];

    const utils = getter();
    const util = utils[name];
    if (!util) return [];

    const rows = Object.entries(util.values as Record<string, string>).map(
      ([suffix, value]) => {
        const cls = suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
        const props = (util.properties as string[]).join(", ");
        return `| \`${cls}\` | ${props} | \`${value}\` |`;
      },
    );

    return [
      "| Class | Properties | Value |",
      "|-------|------------|-------|",
      ...rows,
    ];
  } catch {
    return [];
  }
}

function renderComponent(
  node: Extract<Node, { kind: "component" }>,
  options: RenderOptions,
  stepNumber?: number,
): string[] {
  const attrs = parseAttrs(node.attrs);

  if (node.name === "Reference") {
    const { category, name } = attrs;
    if (!category || !name) return [];
    return buildReferenceTable(category as Category, name);
  }

  // Registry source becomes a fenced block; PropsTable becomes a markdown table.
  if (node.name === "PropsTable" && attrs.registryId && options.resolveMeta) {
    const meta = options.resolveMeta(attrs.registryId);
    return meta ? buildPropsTable(meta) : [];
  }

  if (attrs.registryId && options.resolveRegistry) {
    const source = options.resolveRegistry(attrs.registryId);
    if (!source) return [];
    return fencedBlock(source, "tsx");
  }

  const children = render(node.children, options, node.name === "Stepper");

  // A step title names the step, so it survives even an empty step.
  if (node.name === "Step" && attrs.title) {
    const label = stepNumber ? `${stepNumber}. ${attrs.title}` : attrs.title;
    return children.length
      ? [`**${label}**`, "", ...children]
      : [`**${label}**`];
  }

  // Nothing to unwrap: a component that only renders interactive UI.
  if (!children.length) return [];

  // A Hint is a callout, which markdown spells as a blockquote.
  if (node.name === "Hint") {
    return children.map((line) => (line.trim() ? `> ${line}` : ">"));
  }

  // A link wrapping a block of text is a card on the page. As markdown it is a
  // list item: the first line names the link, the rest describe it.
  if (node.name === "a" && attrs.href) {
    const [label, ...rest] = children
      .filter((line) => line.trim())
      .map((line) => line.trim());
    if (!label) return [];

    const detail = rest.join(" - ");
    return [`- [${label}](${attrs.href})${detail ? ` - ${detail}` : ""}`];
  }

  return children;
}

/** Fence long enough to contain nested backticks in registry source. */
function fencedBlock(source: string, lang: string): string[] {
  const body = source.replace(/\r\n/g, "\n").replace(/\s+$/, "");
  const longest = Math.max(
    0,
    ...[...body.matchAll(/^\s*(`{3,})/gm)].map((m) => m[1].length),
  );
  const fence = "`".repeat(Math.max(3, longest + 1));

  return [`${fence}${lang}`, ...body.split("\n"), fence];
}

function render(
  nodes: Node[],
  options: RenderOptions,
  numberSteps = false,
): string[] {
  const out: string[] = [];
  let step = 0;

  for (const node of nodes) {
    if (node.kind === "lines") {
      out.push(...node.lines);
      continue;
    }

    if (numberSteps && node.name === "Step") step++;

    const block = renderComponent(
      node,
      options,
      numberSteps ? step : undefined,
    );
    if (!block.length) continue;

    // Blank line between unwrap blocks unless both are list items.
    const previous = out[out.length - 1];
    const isListItem = LIST_ITEM.test(block[0]);
    const afterListItem = previous !== undefined && LIST_ITEM.test(previous);

    if (previous?.trim() && !(isListItem && afterListItem)) out.push("");
    out.push(...block);
    if (!isListItem) out.push("");
  }

  return out;
}

/** Collapses runs of blank lines, leaving fenced code blocks untouched. */
function collapseBlankLines(lines: string[]): string[] {
  const fenced = markFenced(lines);
  const out: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    if (!fenced[i] && !lines[i].trim()) {
      const previous = out[out.length - 1];
      if (previous === undefined || !previous.trim()) continue;
    }
    out.push(lines[i]);
  }

  return out;
}

export function mdxToMarkdown(
  content: string,
  options: RenderOptions = {},
): string {
  // Normalize CRLF before splitting lines.
  const source = content.replace(/\r\n/g, "\n").split("\n");
  const lines = collapseBlankLines(render(parse(source), options));

  return lines.join("\n").trim();
}

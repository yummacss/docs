import type { RegistryMeta } from "@/registry";
import { baselineFor } from "@/utils/baseline";
import { COLOR_FAMILIES, SHADE_LABELS } from "@/utils/colors";
import { targetPath } from "@/utils/install.mjs";
import { fillNormalizeFences } from "@/utils/normalize-rules.mjs";
import { type Category, categoryGetters } from "@/utils/yummacss";

const FENCE = /^\s*(`{3,}|~{3,})/;

const SELF_CLOSING = /^\s*<([A-Za-z][A-Za-z0-9]*)((?:\s[^>]*?)?)\s*\/>\s*$/;
const OPENING = /^\s*<([A-Za-z][A-Za-z0-9]*)((?:\s[^>]*?)?)>\s*$/;
const CLOSING = /^\s*<\/([A-Za-z][A-Za-z0-9]*)>\s*$/;
const INLINE = /^\s*<([A-Za-z][A-Za-z0-9]*)((?:\s[^>]*?)?)>(.*)<\/\1>\s*$/;

const ATTRIBUTE = /([A-Za-z][A-Za-z0-9_-]*)="([^"]*)"/g;
const MDX_IMPORT = /^import\s.*\sfrom\s/;
const LIST_ITEM = /^\s*[-*+] /;

const HTML_WRAPPERS = new Set(["a", "div"]);

function unwrappable(name: string): boolean {
  return /^[A-Z]/.test(name) || HTML_WRAPPERS.has(name);
}

type Node =
  | { kind: "lines"; lines: string[] }
  | { kind: "component"; name: string; attrs: string; children: Node[] };

export type RegistryResolver = (registryId: string) => string | null;

export type MetaResolver = (registryId: string) => RegistryMeta | null;

interface RenderOptions {
  resolveRegistry?: RegistryResolver;
  resolveMeta?: MetaResolver;
  registryId?: string;
}

const PLAYGROUND = new Set(["ComponentPlayground"]);

function parseAttrs(attrs: string): Record<string, string> {
  const parsed: Record<string, string> = {};
  for (const [, key, value] of attrs.matchAll(ATTRIBUTE)) {
    parsed[key] = value;
  }
  return parsed;
}

function dedent(lines: string[]): string[] {
  let common = Number.POSITIVE_INFINITY;

  for (const line of lines) {
    if (!line.trim()) continue;
    common = Math.min(common, line.length - line.trimStart().length);
  }

  if (!Number.isFinite(common) || common === 0) return lines;

  return lines.map((line) => (line.trim() ? line.slice(common) : line));
}

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

    if (MDX_IMPORT.test(line)) continue;

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

    const closing = line.match(CLOSING);
    if (closing && unwrappable(closing[1])) continue;

    text.push(line);
  }

  flush();

  return nodes;
}

function buildPropsTable(meta: RegistryMeta): string[] {
  if (!meta.props?.length) return [];

  const rows = meta.props.map((prop) => {
    const type = prop.typeName
      ? `\`${prop.typeName}\``
      : prop.type === "enum" && prop.values
        ? prop.values.map((value) => `\`"${value}"\``).join(" \\| ")
        : `\`${prop.type}\``;
    const fallback =
      prop.default === undefined ? "-" : `\`${JSON.stringify(prop.default)}\``;
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
        const cls = suffix === "" ? util.prefix : `${util.prefix}:${suffix}`;
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

function buildBaseline(path: string): string[] {
  const baseline = baselineFor(path);
  if (!baseline) return [];

  const support = baseline.browsers
    .map((b) =>
      b.supported
        ? `${b.name} ${b.version}${b.desktopOnly ? " (desktop only)" : ""}`
        : `${b.name} unsupported`,
    )
    .join(" · ");

  return [`**${baseline.label}.** ${baseline.description}`, "", support];
}

function buildPalette(): string[] {
  return [
    "| Family | Base |",
    "|--------|------|",
    ...COLOR_FAMILIES.map((f) => `| ${f.name} | \`${f.color}\` |`),
  ];
}

function renderComponent(
  node: Extract<Node, { kind: "component" }>,
  options: RenderOptions,
  stepNumber?: number,
): string[] {
  const attrs = parseAttrs(node.attrs);

  if (node.name === "Baseline") {
    return attrs.path ? buildBaseline(attrs.path) : [];
  }

  if (node.name === "Palette") {
    return buildPalette();
  }

  if (node.name === "Reference") {
    const { category, name } = attrs;
    if (!category || !name) return [];
    return buildReferenceTable(category as Category, name);
  }

  const registryId =
    attrs.registryId ??
    (PLAYGROUND.has(node.name) ? options.registryId : undefined);

  if (registryId) {
    const lines: string[] = [];
    const source = options.resolveRegistry?.(registryId);
    if (source)
      lines.push(
        ...fencedBlock(source, "tsx", `title="${targetPath(registryId)}"`),
      );
    const meta = options.resolveMeta?.(registryId);
    if (meta) {
      if (lines.length > 0) lines.push("");
      lines.push(...buildPropsTable(meta));
    }
    return lines;
  }

  const children = render(node.children, options, node.name === "Stepper");

  if (node.name === "Step" && attrs.title) {
    const label = stepNumber ? `${stepNumber}. ${attrs.title}` : attrs.title;
    return children.length
      ? [`**${label}**`, "", ...children]
      : [`**${label}**`];
  }

  if (!children.length) return [];

  if (node.name === "Hint") {
    return children.map((line) => (line.trim() ? `> ${line}` : ">"));
  }

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

function fencedBlock(source: string, lang: string, meta?: string): string[] {
  const body = source.replace(/\r\n/g, "\n").replace(/\s+$/, "");
  const longest = Math.max(
    0,
    ...[...body.matchAll(/^\s*(`{3,})/gm)].map((m) => m[1].length),
  );
  const fence = "`".repeat(Math.max(3, longest + 1));

  return [
    `${fence}${lang}${meta ? ` ${meta}` : ""}`,
    ...body.split("\n"),
    fence,
  ];
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

    const previous = out[out.length - 1];
    const isListItem = LIST_ITEM.test(block[0]);
    const afterListItem = previous !== undefined && LIST_ITEM.test(previous);

    if (previous?.trim() && !(isListItem && afterListItem)) out.push("");
    out.push(...block);
    if (!isListItem) out.push("");
  }

  return out;
}

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
  const source = fillNormalizeFences(content.replace(/\r\n/g, "\n")).split(
    "\n",
  );
  const lines = collapseBlankLines(render(parse(source), options));

  return lines
    .join("\n")
    .replace(/\{COLOR_FAMILIES\.length\}/g, String(COLOR_FAMILIES.length))
    .replace(/\{SHADE_LABELS\.length\}/g, String(SHADE_LABELS.length))
    .trim();
}

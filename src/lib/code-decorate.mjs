/**
 * Decoration applied to a highlighted code block.
 *
 * This used to live inside src/plugins/rehype-code.mjs & ran during the MDX
 * compile, right after Shiki. Highlighting now happens at render time instead
 * (see src/components/ui/code-block.tsx), because putting a span per token for
 * 32,778 lines of injected component source into the module graph is what OOMs
 * the Vercel build. The logic is unchanged; it just operates on the hast Shiki
 * hands back rather than on the tree mid-compile.
 */

/**
 * Parse range expressions like `{1}`, `{3-5}`, `{1,3-5,8}` from meta strings.
 * Returns a Set of 1-based line numbers.
 */
export function parseRanges(meta, key) {
  const regex = new RegExp(`${key}=\\{([^}]+)\\}`);
  const match = typeof meta === "string" ? meta.match(regex) : null;
  if (!match) return new Set();

  const set = new Set();
  for (const part of match[1].split(",")) {
    const trimmed = part.trim();
    const range = trimmed.match(/^(\d+)-(\d+)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      for (let i = start; i <= end; i++) set.add(i);
    } else if (/^\d+$/.test(trimmed)) {
      set.add(Number(trimmed));
    }
  }
  return set;
}

/**
 * Parse quoted strings from meta, excluding the title value.
 * e.g. `"@sm:d-b" "@md:d-b"` returns ["@sm:d-b", "@md:d-b"]
 */
export function parseWords(meta, titleValue) {
  if (typeof meta !== "string") return [];
  const words = [];
  const regex = /"([^"]+)"/g;
  for (const m of meta.matchAll(regex)) {
    words.push(m[1]);
  }
  return titleValue ? words.filter((w) => w !== titleValue) : words;
}

/**
 * Split a text value by target words, returning an array of
 * { text, highlighted } segments.
 */
function splitByWords(text, words) {
  const escaped = words
    .slice()
    .sort((a, b) => b.length - a.length)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "g");

  const parts = [];
  let lastIndex = 0;
  for (const match of text.matchAll(regex)) {
    if (match.index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, match.index),
        highlighted: false,
      });
    }
    parts.push({ text: match[0], highlighted: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), highlighted: false });
  }
  return parts;
}

/**
 * Recursively walk a hast node and wrap matching text in highlight spans.
 */
function highlightWordsInNode(node, words, classes) {
  if (!node.children) return;

  const newChildren = [];
  for (const child of node.children) {
    if (child.type === "text" && words.some((w) => child.value.includes(w))) {
      for (const part of splitByWords(child.value, words)) {
        if (part.highlighted) {
          newChildren.push({
            type: "element",
            tagName: "span",
            properties: { className: classes.split(" ") },
            children: [{ type: "text", value: part.text }],
          });
        } else {
          newChildren.push({ type: "text", value: part.text });
        }
      }
    } else if (child.type === "element") {
      highlightWordsInNode(child, words, classes);
      newChildren.push(child);
    } else {
      newChildren.push(child);
    }
  }
  node.children = newChildren;
}

const LINE_CLASSES = "d-b mx--4 px-4";
const WORD_CLASSES = "bg-accent-dim/10 bw-1 bc-accent-dim/50";

/**
 * Collapse the given 1-based lines behind a `...` control, in place.
 *
 * `<details>` rather than a client component, because this block is a server-
 * rendered HTML string by the time it gets here: giving it state would mean
 * shipping a parser to the browser to find the regions again. The disclosure
 * triangle is dropped in globals.css, which is a selector problem no utility
 * can reach.
 *
 * Folding hides nothing. Every token stays in the document, so find-in-page
 * still reaches it & the copy button, which reads the raw source rather than
 * this tree, takes the whole file either way.
 */
function foldRegions(codeEl, foldLines) {
  const children = codeEl.children ?? [];

  // Shiki emits one span per line with the newline as a sibling text node, so a
  // line and its terminator have to travel together or the fold eats the breaks.
  const lines = [];
  for (const child of children) {
    if (child.type === "element" && child.tagName === "span") {
      lines.push([child]);
    } else if (lines.length) {
      lines[lines.length - 1].push(child);
    }
  }
  if (!lines.length) return;

  const output = [];
  for (let i = 0; i < lines.length; i++) {
    if (!foldLines.has(i + 1)) {
      output.push(...lines[i]);
      continue;
    }

    // Take the whole contiguous run in one go, so a region gets one control
    // rather than one per line.
    const body = [];
    while (i < lines.length && foldLines.has(i + 1)) body.push(...lines[i++]);
    i--;

    output.push({
      type: "element",
      tagName: "details",
      properties: { className: ["d-i"], "data-fold": "" },
      children: [
        {
          type: "element",
          tagName: "summary",
          properties: {
            className: ["d-i", "c-p", "us-none", "c-foreground/40", "h:c-foreground"],
          },
          children: [{ type: "text", value: "..." }],
        },
        { type: "text", value: "\n" },
        ...body,
      ],
    });
  }

  codeEl.children = output;
}

/**
 * Apply line & word decoration to a highlighted <pre> hast node, in place.
 *
 * @param {object} pre  hast element for the <pre> Shiki produced
 * @param {string} meta raw fence meta, e.g. `title="a.ts" mark={1-3} "word"`
 * @param {string|null} title parsed title, excluded from word targets
 */
export function decorateCodeHast(pre, meta, title) {
  const codeEl = pre.children?.find((c) => c.tagName === "code");
  if (!codeEl) return pre;

  const markLines = parseRanges(meta, "mark");
  const delLines = parseRanges(meta, "del");
  const insLines = parseRanges(meta, "ins");
  const foldLines = parseRanges(meta, "fold");
  const words = parseWords(meta, title);
  const hasLineHighlight = markLines.size || delLines.size || insLines.size;

  if (hasLineHighlight) {
    // Remove \n text nodes between line spans to prevent double line breaks
    // when d-b (display: block) is applied.
    codeEl.children = (codeEl.children ?? []).filter(
      (c) => !(c.type === "text" && c.value === "\n"),
    );

    const lines = codeEl.children.filter(
      (c) => c.type === "element" && c.tagName === "span",
    );

    lines.forEach((lineNode, index) => {
      const lineNum = index + 1;
      let extra = "";

      if (delLines.has(lineNum)) {
        extra = `${LINE_CLASSES} bg-diff-remove/10`;
      } else if (insLines.has(lineNum)) {
        extra = `${LINE_CLASSES} bg-diff-add/10`;
      } else if (markLines.has(lineNum)) {
        extra = `${LINE_CLASSES} bg-accent-dim/10`;
      } else {
        extra = "d-b";
      }

      if (!lineNode.properties) lineNode.properties = {};
      const props = lineNode.properties;

      // Shiki writes `class` as a raw string, not hast's canonical
      // `className`. Setting `className` alongside it serialises TWO class
      // attributes (`<span class="line" class="d-b">`); the browser keeps the
      // first & silently drops the rest, so the decoration never applied. The
      // \n nodes are already gone by then, leaving the block with neither
      // newlines nor display:block, which collapsed every marked fence onto
      // one line. Fold both sources into `className` & drop `class`.
      const asList = (v) =>
        Array.isArray(v)
          ? v
          : typeof v === "string"
            ? v.split(/\s+/).filter(Boolean)
            : [];
      const existing = [...asList(props.class), ...asList(props.className)];
      delete props.class;
      props.className = [...existing, ...extra.split(" ")];

      if (
        !lineNode.children ||
        lineNode.children.every((c) => c.type === "text" && c.value === "")
      ) {
        lineNode.children = [
          { type: "element", tagName: "br", properties: {}, children: [] },
        ];
      }
    });
  }

  if (foldLines.size) foldRegions(codeEl, foldLines);

  if (words.length) {
    highlightWordsInNode(codeEl, words, WORD_CLASSES);
  }

  // Strip Shiki's background inline style; the surrounding chrome supplies it.
  if (pre.properties?.style) {
    pre.properties.style = String(pre.properties.style)
      .replace(/background(-color)?:[^;]+;?/gi, "")
      .trim();
  }

  return pre;
}

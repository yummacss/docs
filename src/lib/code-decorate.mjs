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
      const existing = Array.isArray(lineNode.properties.className)
        ? lineNode.properties.className
        : [];
      lineNode.properties.className = [...existing, ...extra.split(" ")];

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

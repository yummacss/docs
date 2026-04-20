import { visit } from "unist-util-visit";

/**
 * Parse range expressions like `{1}`, `{3-5}`, `{1,3-5,8}` from meta strings.
 * Returns a Set of 1-based line numbers.
 */
function parseRanges(meta, key) {
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

const LINE_CLASSES = "d-b mx--4 px-4";

export default function rehypeCode() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "pre") return;

      const codeEl = node.children?.find((c) => c.tagName === "code");
      if (!codeEl) return;

      const meta = node.properties?.["data-meta"] ?? "";
      const titleMatch =
        typeof meta === "string" ? meta.match(/title=["']([^"']+)["']/) : null;
      const title = titleMatch?.[1] ?? null;

      const langClass = codeEl.properties?.className?.find?.(
        (c) => typeof c === "string" && c.startsWith("language-"),
      );
      const lang = langClass ? langClass.replace("language-", "") : null;

      // Parse line ranges from meta
      const markLines = parseRanges(meta, "mark");
      const delLines = parseRanges(meta, "del");
      const insLines = parseRanges(meta, "ins");

      // Inject Yumma CSS classes on matching line spans
      if (markLines.size || delLines.size || insLines.size) {
        const lines = (codeEl.children ?? []).filter(
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
            extra = `${LINE_CLASSES} bg-highlight/10`;
          }

          if (extra) {
            if (!lineNode.properties) lineNode.properties = {};
            const existing = Array.isArray(lineNode.properties.className)
              ? lineNode.properties.className
              : [];
            lineNode.properties.className = [...existing, ...extra.split(" ")];
          }
        });
      }

      // Strip Shiki's background inline style
      if (node.properties?.style) {
        node.properties.style = String(node.properties.style)
          .replace(/background(-color)?:[^;]+;?/gi, "")
          .trim();
      }

      node.tagName = "Code";
      node.properties = {
        ...(title ? { title } : {}),
        ...(lang ? { lang } : {}),
      };
    });
  };
}

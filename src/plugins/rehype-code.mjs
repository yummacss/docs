import { visit } from "unist-util-visit";

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

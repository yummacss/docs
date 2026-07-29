import { visit } from "unist-util-visit";

/**
 * Turn every `<pre><code>` into a `<Code>` element carrying the raw source as
 * a prop, and nothing else.
 *
 * Highlighting deliberately does NOT happen here. Shiki used to run just
 * before this plugin, and its output (a span per token, across the 32,778
 * lines of component source that rehype-registry injects) was inlined into
 * every compiled MDX module. That is what OOMs the 2-core Vercel builder:
 * removing Shiki from this pipeline was the only configuration that ever
 * completed. See NOTES.md for the full elimination table.
 *
 * src/components/ui/code-block.tsx now highlights at render time, so the
 * markup lands in the generated HTML instead of the module graph.
 */
export default function rehypeCode() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "pre") return;

      const codeEl = node.children?.find((c) => c.tagName === "code");
      if (!codeEl) return;

      // Without Shiki's transformerMetaPreserve the meta no longer arrives on
      // the <pre>, so read it off the <code> node where mdast-util-to-hast
      // leaves it. rehype-registry sets it there too for injected sources.
      const meta = codeEl.data?.meta ?? node.properties?.["data-meta"] ?? "";

      const titleMatch =
        typeof meta === "string" ? meta.match(/title=["']([^"']+)["']/) : null;
      const title = titleMatch?.[1] ?? null;
      const isPreview =
        typeof meta === "string" && meta.split(" ").includes("preview");

      const langClass = codeEl.properties?.className?.find?.(
        (c) => typeof c === "string" && c.startsWith("language-"),
      );
      const lang = langClass ? langClass.replace("language-", "") : null;

      const code = (codeEl.children ?? [])
        .filter((c) => c.type === "text")
        .map((c) => c.value)
        .join("");

      node.tagName = "Code";
      node.children = [];
      node.properties = {
        code,
        ...(meta ? { meta } : {}),
        ...(title ? { title } : {}),
        ...(lang ? { lang } : {}),
        ...(isPreview ? { preview: true } : {}),
      };
    });
  };
}

import { parseSelectors, rulesFor } from "../utils/normalize-rules.mjs";

// Fills ```css normalize="html; body" from the shipped reset. A rehype plugin
// rather than a component so the fence holds its text before Shiki reads it.

function visit(node, fn) {
  fn(node);
  for (const child of node.children ?? []) visit(child, fn);
}

export default function rehypeNormalize() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "element" || node.tagName !== "code") return;

      const match = (node.data?.meta || "").match(/normalize=["']([^"']+)["']/);
      if (!match) return;

      node.children = [
        { type: "text", value: rulesFor(parseSelectors(match[1])) },
      ];
    });
  };
}

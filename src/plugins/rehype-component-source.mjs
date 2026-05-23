import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createHighlighter } from "shiki";

const eclipsa = JSON.parse(
  readFileSync(join(process.cwd(), "src/themes/eclipsa.json"), "utf-8"),
);

let highlighterPromise;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [eclipsa],
      langs: ["tsx"],
    });
  }
  return highlighterPromise;
}

const LINE_CLASSES = ["d-b", "mx--4", "px-4"];

export default function rehypeComponentSource() {
  return async (tree) => {
    const highlighter = await getHighlighter();

    visit(tree, "element", (node) => {
      if (node.tagName !== "ComponentPreview") return;
      const registryId = node.properties?.registryId;
      if (!registryId) return;

      const filePath = join(
        process.cwd(),
        "src",
        "registry",
        "ui",
        `${registryId}.tsx`,
      );
      if (!existsSync(filePath)) {
        node.properties.children = [{
          type: "text",
          value: `// Error: ${registryId} not found`,
        }];
        return;
      }

      const source = readFileSync(filePath, "utf-8");
      const hast = highlighter.codeToHast(source, {
        lang: "tsx",
        theme: "eclipsa",
      });

      const code = hast.children?.[0]?.children?.[0];
      if (!code) return;

      const lines = (code.children ?? []).filter(
        (c) => c.type === "element" && c.tagName === "span",
      );

      for (const line of lines) {
        if (!line.properties) line.properties = {};
        delete line.properties.style;
        const existing = String(line.properties.class || "")
          .split(" ")
          .filter(Boolean);
        line.properties.class = [...existing, ...LINE_CLASSES].join(" ");
      }

      node.properties.children = lines;
    });
  };
}

function visit(node, type, handler) {
  if (node.type === type) handler(node);
  if (node.children)
    for (const child of node.children) visit(child, type, handler);
}

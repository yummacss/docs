import fs from "node:fs";
import path from "node:path";

export default function rehypeRegistry() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "code" && node.data?.meta) {
        const meta = node.data.meta;
        const registryMatch = meta.match(/registry=["']([^"']+)["']/);

        if (registryMatch) {
          const registryId = registryMatch[1];
          const filePath = path.join(
            process.cwd(),
            "src",
            "registry",
            "ui",
            `${registryId}.tsx`,
          );

          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, "utf-8");
            node.children = [{ type: "text", value: content }];
          } else {
            node.children = [
              {
                type: "text",
                value: `// Error: Registry file not found: ${registryId}`,
              },
            ];
          }
        }
      }
    });
  };
}

function visit(node, type, handler) {
  if (node.type === type) {
    handler(node);
  }
  if (node.children) {
    for (const child of node.children) {
      visit(child, type, handler);
    }
  }
}

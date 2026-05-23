import fs from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";

const isDev = process.env.NODE_ENV !== "production";
const fileCache = new Map();

export default function remarkComponentSource() {
  return (tree) => {
    visit(tree, "mdxJsxFlowElement", (node) => {
      if (node.name !== "ComponentPreview") return;

      const registryAttr = node.attributes?.find(
        (attr) =>
          attr.type === "mdxJsxAttribute" &&
          (attr.name === "registryId" || attr.name === "id"),
      );
      if (!registryAttr) return;

      const registryId = String(registryAttr.value);

      let filePath = path.join(
        process.cwd(),
        "src",
        "registry",
        "ui",
        `${registryId}.tsx`,
      );

      if (!fs.existsSync(filePath)) {
        filePath = path.join(
          process.cwd(),
          "src",
          "registry",
          "docs",
          `${registryId}.tsx`,
        );
      }

      if (!fs.existsSync(filePath)) return;

      if (isDev || !fileCache.has(filePath)) {
        fileCache.set(filePath, fs.readFileSync(filePath, "utf-8"));
      }
      const content = fileCache.get(filePath);

      const ext = path.extname(filePath).slice(1);

      node.children.push({
        type: "code",
        lang: ext || "tsx",
        meta: "preview",
        value: content,
      });
    });
  };
}

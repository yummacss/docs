import fs from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";

const isDev = process.env.NODE_ENV !== "production";
const fileCache = new Map();

/** Line ranges of top-level `const x = [` fixture blocks, as `3-40,55-70`. */
function fixtureRanges(source) {
  const lines = source.split("\n");
  const ranges = [];

  for (let i = 0; i < lines.length; i++) {
    if (!/^const \w+(: [^=]+)? = \[$/.test(lines[i])) continue;
    let end = i + 1;
    while (end < lines.length && !/^\];?$/.test(lines[end])) end++;
    if (end >= lines.length) continue;
    // Fold array body only; keep `const x = [` and `];` visible.
    if (end - i > 2) ranges.push(`${i + 2}-${end}`);
    i = end;
  }

  return ranges.join(",");
}

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

      const folds = fixtureRanges(content);

      const target = `components/ui/${registryId}.tsx`;

      node.children.push({
        type: "code",
        lang: ext || "tsx",
        meta: `preview title="${target}"${folds ? ` fold={${folds}}` : ""}`,
        value: content,
      });
    });
  };
}

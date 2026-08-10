import fs from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";

const isDev = process.env.NODE_ENV !== "production";
const fileCache = new Map();

/**
 * The line ranges of a registry file's fixture data, as `3-40,55-70`.
 *
 * A recipe puts its seed array last, so several of these files are 80% data:
 * `autocomplete-grouped` is 71 lines of team members around 13 lines of the
 * thing you came to read. The component leads, and the data folds away.
 *
 * Matched on the top-level `const x = [` ... `];` shape every registry file
 * already uses, rather than parsed: a fold that misses is a block that stays
 * open, which is exactly what happens today.
 */
function fixtureRanges(source) {
  const lines = source.split("\n");
  const ranges = [];

  for (let i = 0; i < lines.length; i++) {
    if (!/^const \w+(: [^=]+)? = \[$/.test(lines[i])) continue;
    let end = i + 1;
    while (end < lines.length && !/^\];?$/.test(lines[end])) end++;
    if (end >= lines.length) continue;
    // The body alone, so the `const x = [` and the `];` stay visible & the
    // reader can still see what folded away.
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

      node.children.push({
        type: "code",
        lang: ext || "tsx",
        meta: folds ? `preview fold={${folds}}` : "preview",
        value: content,
      });
    });
  };
}

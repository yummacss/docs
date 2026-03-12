import fs from "node:fs";
import path from "node:path";

interface MetaEntry {
  title: string;
  description: string;
}

type MetaMap = Record<string, MetaEntry>;

function extractMeta(filePath: string): MetaEntry {
  const content = fs.readFileSync(filePath, "utf-8");

  // Match `export const meta = { ... }` — handles multi-line objects
  const metaMatch = content.match(
    /export\s+const\s+meta\s*=\s*(\{[\s\S]*?\n\})/,
  );
  if (!metaMatch) return { title: "", description: "" };

  const raw = metaMatch[1];
  const titleMatch = raw.match(/title\s*:\s*["'\`]([^"'\`\n]+)["'\`]/);
  const descMatch = raw.match(/description\s*:\s*["'\`]([^"'\`\n]+)["'\`]/);

  return {
    title: titleMatch?.[1]?.trim() ?? "",
    description: descMatch?.[1]?.trim() ?? "",
  };
}

function collectMDX(dir: string, prefix: string, map: MetaMap) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectMDX(fullPath, `${prefix}/${entry.name}`, map);
    } else if (entry.name.endsWith(".mdx")) {
      const key = `${prefix}/${entry.name.replace(/\.mdx$/, "")}`;
      map[key] = extractMeta(fullPath);
    }
  }
}

const root = process.cwd();
const map: MetaMap = {};

collectMDX(path.join(root, "src/content/docs"), "docs", map);
collectMDX(path.join(root, "src/content/ui"), "ui", map);
collectMDX(path.join(root, "src/content/blog"), "blog", map);

const outPath = path.join(root, "src/generated/og-meta.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(map, null, 2));

console.log(
  `[Yumma CSS: OG Meta] Output successful with ${Object.keys(map).length} entries.`,
);
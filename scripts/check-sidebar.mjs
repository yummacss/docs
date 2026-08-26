import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Fail when sidebar slugs and content pages disagree. */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Slugs listed under one top-level key of the sidebar config. */
function slugsFor(source, key, nextKey) {
  const start = source.indexOf(`${key}: [`);
  if (start === -1) throw new Error(`No "${key}" key in the sidebar config.`);

  const end = nextKey ? source.indexOf(`${nextKey}: [`) : source.length;
  const section = source.slice(start, end === -1 ? source.length : end);

  // Every quoted string in the section is either a slug or a group title.
  // Group titles are always `title: "..."`, so drop those.
  const withoutTitles = section.replace(/title:\s*"[^"]*"/g, "");
  return [...withoutTitles.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

function pagesIn(directory) {
  return readdirSync(join(root, directory))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

const source = readFileSync(join(root, "src/config/sidebar.ts"), "utf-8");

// Only `sidebarConfig` maps slugs; ignore interfaces and link lists.
const configStart = source.indexOf("export const sidebarConfig");
if (configStart === -1) {
  console.error("Could not find `export const sidebarConfig` to check.");
  process.exit(1);
}
const config = source.slice(configStart);

const collections = [
  {
    name: "docs",
    dir: "src/content/docs",
    slugs: slugsFor(config, "docs", "ui"),
  },
  { name: "ui", dir: "src/content/ui", slugs: slugsFor(config, "ui", null) },
];

const problems = [];

for (const { name, dir, slugs } of collections) {
  const pages = pagesIn(dir);
  const listed = new Set(slugs);

  for (const page of pages) {
    if (!listed.has(page)) {
      problems.push(
        `${name}: "${page}" exists in ${dir} but is not in the sidebar.`,
      );
    }
  }

  for (const slug of slugs) {
    if (!pages.includes(slug)) {
      problems.push(
        `${name}: sidebar lists "${slug}" but ${dir}/${slug}.mdx does not exist.`,
      );
    }
  }

  const seen = new Set();
  for (const slug of slugs) {
    if (seen.has(slug)) {
      problems.push(
        `${name}: "${slug}" appears in the sidebar more than once.`,
      );
    }
    seen.add(slug);
  }
}

if (problems.length > 0) {
  console.error("Sidebar check failed:\n");
  for (const problem of problems) console.error(`  ${problem}`);
  console.error(
    "\nEvery page must appear in src/config/sidebar.ts exactly once.",
  );
  process.exit(1);
}

const total = collections.reduce((sum, c) => sum + c.slugs.length, 0);
console.log(`Sidebar check passed: ${total} pages listed exactly once.`);

import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Repo root, resolved from this file rather than `process.cwd()`. */
export const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Absolute paths of every `.tsx` file below `dir`, recursively. */
export function tsxFilesIn(dir: string): string[] {
  const out: string[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...tsxFilesIn(full));
    } else if (entry.name.endsWith(".tsx")) {
      out.push(full);
    }
  }

  return out;
}

/** Normalize CRLF so line-anchored regexes match content files. */
export function contentPages(collection: string) {
  const dir = join(rootDir, "src/content", collection);

  return readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
      source: readFileSync(join(dir, file), "utf-8").replace(/\r\n/g, "\n"),
    }));
}

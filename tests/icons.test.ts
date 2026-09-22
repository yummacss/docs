import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { rootDir } from "./helpers";

const DIRECT = /from\s+["']iconoir-react["']/;
const SHARED = /from\s+["']@\/icons["']/;

function sources(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) out.push(...sources(path));
    else if (/\.tsx?$/.test(entry)) out.push(path);
  }
  return out;
}

describe("icons", () => {
  const src = join(rootDir, "src");
  const registryDir = join(src, "registry/ui");
  const module = join(src, "icons.tsx");

  const all = sources(src);
  const registry = all.filter((file) => file.startsWith(registryDir));
  const site = all.filter(
    (file) => !file.startsWith(registryDir) && file !== module,
  );

  it("routes every site import through the module", () => {
    const direct = site
      .filter((file) => DIRECT.test(readFileSync(file, "utf8")))
      .map((file) => relative(rootDir, file));

    expect(direct).toEqual([]);
  });

  it("keeps the registry importing the package itself", () => {
    const shared = registry
      .filter((file) => SHARED.test(readFileSync(file, "utf8")))
      .map((file) => relative(rootDir, file));

    expect(shared).toEqual([]);
  });

  it("re-exports every icon the site asks for", () => {
    const exported = new Set(
      readFileSync(module, "utf8").matchAll(
        /^export const ([A-Z][A-Za-z0-9]*) = (?:duotone|regular)\(/gm,
      ),
    );
    const names = new Set([...exported].map((match) => match[1]));

    const wanted = new Set<string>();
    for (const file of site) {
      const source = readFileSync(file, "utf8");
      for (const [, block] of source.matchAll(
        /import\s*\{([^}]*)\}\s*from\s*["']@\/icons["']/g,
      )) {
        for (const name of block.split(",")) {
          const trimmed = name.trim();
          if (trimmed) wanted.add(trimmed);
        }
      }
    }

    expect([...wanted].filter((name) => !names.has(name))).toEqual([]);
    expect(wanted.size).toBeGreaterThan(40);
  });
});

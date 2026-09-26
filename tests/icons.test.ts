import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { EXAMPLE_ICON_STYLE } from "../src/utils/icon-style";
import { rootDir } from "./helpers";

const DIRECT = /from\s+["']@solar-icons\/react/;
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
  // renders the registry's demos, so it imports what the registry imports
  const demos = join(src, "utils/demo.tsx");

  const all = sources(src);
  const registry = all.filter((file) => file.startsWith(registryDir));
  const site = all.filter(
    (file) =>
      !file.startsWith(registryDir) && file !== module && file !== demos,
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
    expect(wanted.size).toBeGreaterThan(30);
  });

  it("gives each Solar icon one style everywhere", () => {
    const styleOf = new Map<string, string>();
    const clashes: string[] = [];
    for (const file of [...registry, demos]) {
      const source = readFileSync(file, "utf8");
      for (const [, block, style] of source.matchAll(
        /import\s*\{([^}]*)\}\s*from\s*["']@solar-icons\/react\/([a-z-]+)["']/g,
      )) {
        expect(["outline", "bold-duotone"]).toContain(style);
        for (const name of block.split(",").map((n) => n.trim())) {
          if (!name) continue;
          const seen = styleOf.get(name);
          if (seen && seen !== style)
            clashes.push(`${name}: ${seen} and ${style}`);
          styleOf.set(name, style);
        }
      }
    }
    expect(clashes).toEqual([]);

    for (const [name, style] of Object.entries(EXAMPLE_ICON_STYLE)) {
      expect(styleOf.get(name), name).toBe(style);
    }
    const demoSource = readFileSync(demos, "utf8");
    const listed = demoSource.slice(demoSource.indexOf("EXAMPLE_ICONS"));
    for (const [, name] of listed.matchAll(/^\s+([A-Z][A-Za-z0-9]*Icon),$/gm)) {
      expect(EXAMPLE_ICON_STYLE[name], name).toBeDefined();
    }
  });
});

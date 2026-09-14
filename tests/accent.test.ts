import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  ACCENT_CLASSES,
  ACCENT_EXCLUDES,
  ACCENTS,
  accentCss,
  DEFAULT_ACCENT,
} from "../src/utils/accent";
import { rootDir } from "./helpers";

/**
 * The accent recolours the preview by redefining the classes the components
 * name, so it goes stale the moment a component names a new one. The guard
 * below is the only thing that would notice.
 */

describe("preview accent", () => {
  it("emits nothing for the colour the components already ship", () => {
    expect(accentCss(DEFAULT_ACCENT)).toBe("");
  });

  it("covers every family Yumma ships", () => {
    expect(ACCENTS).toContain("indigo");
    expect(ACCENTS.length).toBeGreaterThan(15);

    for (const family of ACCENTS) {
      if (family === DEFAULT_ACCENT) continue;
      const css = accentCss(family);
      expect(css.split("\n")).toHaveLength(ACCENT_CLASSES.length);
      expect(css).toMatch(/#[0-9a-f]{6}/i);
      // The dark text is a label, not a control, and must stay where it is.
      // Compared as whole selectors: `c-slate-12` is a substring of
      // `.bc-slate-12`, so a `toContain` here passes nothing useful.
      const selectors = css
        .split("\n")
        .map((rule) => rule.slice(0, rule.indexOf(" {")));
      for (const excluded of ACCENT_EXCLUDES) {
        expect(selectors).not.toContain(`.${excluded}`);
      }
    }
  });

  it("names every accent-shaped class the registry uses", () => {
    const dir = join(rootDir, "src/registry/ui");
    const known = new Set([...ACCENT_CLASSES, ...ACCENT_EXCLUDES]);
    const missed = new Set<string>();

    for (const file of readdirSync(dir).filter((f) => f.endsWith(".tsx"))) {
      const source = readFileSync(join(dir, file), "utf-8");
      for (const [cls] of source.matchAll(
        /\b(?:[a-z]{1,3}:)?[a-z]{1,4}-slate-1[12]\b/g,
      )) {
        if (!known.has(cls)) missed.add(`${file}: ${cls}`);
      }
    }

    expect([...missed].sort()).toEqual([]);
  });
});

import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { type Config, validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";
import { extractClasses } from "../scripts/extract-classes.mjs";
import { rootDir, tsxFilesIn } from "./helpers";

const config = (await import("../yumma.config.mjs")).default as Config;

const registryDir = join(rootDir, "src/registry");

const docsOnlyColors = Object.keys(config.theme?.colors ?? {}).filter(
  (color) => color !== "percentage",
);

function bare(className: string): string {
  return className
    .replace(/^@[a-z]+:/, "")
    .replace(/^[a-z]+::/, "")
    .replace(/^[a-z]+:/, "")
    .replace(/\/\d+$/, "");
}

function usesDocsOnlyColor(className: string): boolean {
  const stripped = bare(className);

  return docsOnlyColors.some(
    (color) =>
      stripped === color ||
      stripped.endsWith(`-${color}`) ||
      stripped.includes(`-${color}/`),
  );
}

describe("Yumma UI classes", () => {
  it("uses only classes Yumma CSS generates", () => {
    const owners = new Map<string, string>();
    for (const file of tsxFilesIn(registryDir)) {
      for (const className of extractClasses(readFileSync(file, "utf-8"))) {
        owners.set(className, relative(rootDir, file));
      }
    }

    const { invalid } = validateClasses(owners.keys(), config);

    expect(invalid.map((c) => `${c} (${owners.get(c)})`)).toEqual([]);
  });

  it("does not depend on docs-only theme colors", () => {
    const offenders: string[] = [];

    for (const file of tsxFilesIn(registryDir)) {
      for (const className of extractClasses(readFileSync(file, "utf-8"))) {
        if (usesDocsOnlyColor(className)) {
          offenders.push(`${className} (${relative(rootDir, file)})`);
        }
      }
    }

    expect(
      offenders,
      "registry components must use built-in Yumma CSS colors so they survive a paste",
    ).toEqual([]);
  });

  it("knows which colors are docs-only", () => {
    expect(docsOnlyColors.length).toBeGreaterThan(0);
  });
});

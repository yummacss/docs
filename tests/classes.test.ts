import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import type { ValidateOptions } from "@yummacss/canon";
import { extractClasses, validate } from "@yummacss/canon";
import { describe, expect, it } from "vitest";
import { rootDir, tsxFilesIn } from "./helpers";

/**
 * Yumma UI ships by copy-paste, not by package. That makes portability the
 * library's actual contract: a component pasted into somebody else's project
 * has their `yumma.config.mjs`, not this one, so any class it uses has to
 * resolve without the docs theme.
 *
 * `scripts/validate-yummacss.mjs` checks this across the whole site as a
 * standalone script. These tests narrow it to `src/registry` - the Yumma UI
 * surface - and put it inside `pnpm test`.
 */

// Typed through canon's own option type rather than a hand-rolled shape, so
// this stays correct if the config surface changes upstream.
const config = (await import("../yumma.config.mjs")).default as NonNullable<
  ValidateOptions["config"]
>;

const registryDir = join(rootDir, "src/registry");

/** Theme colors that exist here and would not exist in a consumer's project. */
const docsOnlyColors = Object.keys(config.theme?.colors ?? {}).filter(
  (color) => color !== "percentage",
);

/** Strip variants and the opacity modifier down to the bare utility. */
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
  it("uses only classes in the canon", async () => {
    const result = await validate({
      cwd: rootDir,
      config: { ...config, source: ["./src/registry/**/*.tsx"] },
    });

    const invalid = result.invalid.map(
      ({ className, files }) =>
        `${className} (${files.map((f) => relative(rootDir, f)).join(", ")})`,
    );

    expect(invalid).toEqual([]);
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

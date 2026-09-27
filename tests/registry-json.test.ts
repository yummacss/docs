import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { applyStyle, DEFAULT_STYLE, STYLES } from "../src/utils/styles.mjs";
import { rootDir } from "./helpers";

const out = join(rootDir, "public/ui/r");
const read = (path: string) =>
  JSON.parse(readFileSync(join(out, path), "utf8"));

describe("registry json", () => {
  execFileSync("node", ["scripts/generate-registry-json.mjs"], {
    cwd: rootDir,
    stdio: "ignore",
  });
  const ids = readdirSync(out)
    .filter(
      (file) =>
        file.endsWith(".json") && !["index.json", "styles.json"].includes(file),
    )
    .map((file) => file.replace(".json", ""));

  it("describes the styles the CLI can ask for", () => {
    expect(read("styles.json")).toEqual({
      default: DEFAULT_STYLE,
      styles: STYLES,
    });
  });

  it("builds every item in every style and radius", () => {
    expect(ids.length).toBeGreaterThan(30);
    for (const [style, spec] of Object.entries(STYLES)) {
      for (const radius of spec.allow) {
        const dir = `${style}-${radius}`;
        expect(readdirSync(join(out, dir)).length, dir).toBe(ids.length);
        for (const id of ids) {
          const base = read(`${id}.json`);
          const styled = read(`${dir}/${id}.json`);
          expect(styled.files[0].content, `${dir}/${id}`).toBe(
            applyStyle(base.files[0].content, style, radius),
          );
          expect({ ...styled, files: [] }).toEqual({ ...base, files: [] });
        }
      }
    }
  });
});

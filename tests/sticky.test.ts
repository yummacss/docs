import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { RegistryMeta } from "../src/registry";
import { carriedFor } from "../src/utils/sticky";
import { rootDir } from "./helpers";

/**
 * A carried value follows you between components, so the guard that matters is
 * the one that stops a value the next component has never heard of. `shape`
 * alone carries six vocabularies across the registry.
 */

function meta(id: string): RegistryMeta {
  return JSON.parse(
    readFileSync(join(rootDir, "src/registry/meta", `${id}.json`), "utf-8"),
  );
}

const unclaimed = () => false;

describe("carried styles", () => {
  it("carries a value the next component shares", () => {
    expect(
      carriedFor(meta("button"), { shape: "squircle" }, unclaimed),
    ).toEqual({ shape: "squircle" });
  });

  it("drops a value the next component has no name for", () => {
    // `pill` is Badge's and Button's; Checkbox has square, rounded, squircle.
    expect(carriedFor(meta("checkbox"), { shape: "pill" }, unclaimed)).toEqual(
      {},
    );
    expect(carriedFor(meta("badge"), { shape: "pill" }, unclaimed)).toEqual({
      shape: "pill",
    });
  });

  it("drops a prop the next component does not have", () => {
    expect(carriedFor(meta("badge"), { animated: true }, unclaimed)).toEqual(
      {},
    );
  });

  it("never carries what the URL already says", () => {
    const claimed = (name: string) => name === "shape";
    expect(
      carriedFor(meta("button"), { shape: "pill", size: "lg" }, claimed),
    ).toEqual({ size: "lg" });
  });

  it("carries nothing that is not a style axis", () => {
    expect(
      carriedFor(
        meta("badge"),
        { tone: "solid", intent: "danger", icon: true },
        unclaimed,
      ),
    ).toEqual({});
  });

  it("type-checks a boolean before carrying it", () => {
    expect(carriedFor(meta("dialog"), { animated: "yes" }, unclaimed)).toEqual(
      {},
    );
    expect(carriedFor(meta("dialog"), { animated: false }, unclaimed)).toEqual({
      animated: false,
    });
  });
});

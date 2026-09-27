import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { RegistryMeta } from "../src/registry";
import { carriedFor } from "../src/utils/sticky";
import { rootDir } from "./helpers";

function meta(id: string): RegistryMeta {
  return JSON.parse(
    readFileSync(join(rootDir, "src/registry/meta", `${id}.json`), "utf-8"),
  );
}

const unclaimed = () => false;

describe("carried styles", () => {
  it("carries a value the next component shares", () => {
    expect(carriedFor(meta("dialog"), { focus: false }, unclaimed)).toEqual({
      focus: false,
    });
  });

  it("leaves shape, size and shadow to the style", () => {
    expect(
      carriedFor(
        meta("button"),
        { shape: "squircle", size: "lg", shadow: "outset" },
        unclaimed,
      ),
    ).toEqual({});
  });

  it("drops a prop the next component does not have", () => {
    expect(carriedFor(meta("badge"), { animated: true }, unclaimed)).toEqual(
      {},
    );
  });

  it("never carries what the URL already says", () => {
    const claimed = (name: string) => name === "focus";
    expect(
      carriedFor(meta("dialog"), { focus: false, animated: false }, claimed),
    ).toEqual({ animated: false });
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

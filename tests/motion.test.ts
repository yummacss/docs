import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import config from "../yumma.config.mjs";
import { rootDir } from "./helpers";

const registryDir = join(rootDir, "src/registry/ui");
const registry = readdirSync(registryDir)
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => ({
    file,
    source: readFileSync(join(registryDir, file), "utf8"),
  }));

// the names the Yumma UI installation page tells people to add
function installed(key: "states" | "keyframes"): Map<string, string> {
  const page = readFileSync(
    join(rootDir, "src/content/ui/installation.mdx"),
    "utf8",
  );
  const block =
    page.match(new RegExp(`${key}: \\{\\n([\\s\\S]*?)\\n\\s*\\}`))?.[1] ?? "";
  return new Map(
    [...block.matchAll(/^\s*([a-z]+): "(.*)",$/gm)].map(([, name, value]) => [
      name,
      value,
    ]),
  );
}

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? sources(path) : [path];
  });
}

describe("motion", () => {
  const states = installed("states");
  const keyframes = installed("keyframes");

  it("documents the same state and keyframes the site config defines", () => {
    expect(states.size).toBeGreaterThan(0);
    expect(keyframes.size).toBeGreaterThan(0);
    for (const [name, value] of states)
      expect(config.theme?.states?.[name]).toBe(value);
    for (const [name, value] of keyframes)
      expect(config.theme?.keyframes?.[name]).toBe(value);
  });

  it("uses only the states and keyframes the installation page lists", () => {
    const siteStates = Object.keys(config.theme?.states ?? {});
    const missed: string[] = [];
    for (const { file, source } of registry) {
      for (const [, name] of source.matchAll(/(?<![\w:@-])([a-z]+):[a-z@]/g)) {
        if (siteStates.includes(name) && !states.has(name))
          missed.push(`${file}: ${name}:`);
      }
      for (const [, name] of source.matchAll(/\ban:([a-z]+)/g)) {
        if (name !== "none" && !keyframes.has(name))
          missed.push(`${file}: an:${name}`);
      }
    }
    expect(missed).toEqual([]);
  });

  it("ships no stylesheet of its own", () => {
    const styled = registry
      .filter(({ source }) => /<style\b/.test(source))
      .map(({ file }) => file);
    expect(styled).toEqual([]);
  });

  it("leaves no yui- class anywhere", () => {
    const found = sources(join(rootDir, "src"))
      .filter((path) => /\.(tsx?|css|mdx)$/.test(path))
      .filter((path) => /\byui-[a-z]/.test(readFileSync(path, "utf8")));
    expect(found).toEqual([]);
  });
});

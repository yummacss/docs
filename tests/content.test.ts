import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contentPages, rootDir } from "./helpers";

/** `registryId` typos render empty previews; this suite catches them. */
const indexPath = join(rootDir, "src/registry/index.ts");

const registryIds = new Set(
  [
    ...readFileSync(indexPath, "utf-8").matchAll(
      /^\s*"([^"]+)":\s*\(\)\s*=>\s*import\(/gm,
    ),
  ].map((match) => match[1]),
);

/** Both prop spellings the component accepts - see component-preview.tsx. */
const PREVIEW_ID = /<ComponentPreview[^>]*?\b(?:registryId|id)="([^"]+)"/g;

/** Playground pages use the route slug, not `registryId`. */
const PLAYGROUND = /<ComponentPlayground\b/;

const uiPages = contentPages("ui");

/** Registry files intentionally not previewed on any page yet. */
const KNOWN_UNLISTED: string[] = [
  // Button group blocks: install entry points, not playground demos.
  "button-group",
  "button-group-icon",
  "button-group-pill",
  "button-group-pill-label",
];

function referencedIds(): Set<string> {
  const ids = new Set<string>();

  for (const { slug, source } of uiPages) {
    for (const [, id] of source.matchAll(PREVIEW_ID)) {
      ids.add(id);
    }
    if (PLAYGROUND.test(source)) ids.add(slug);
  }

  return ids;
}

describe("Yumma UI content", () => {
  it("previews only components that exist", () => {
    const broken: string[] = [];

    for (const { slug, source } of uiPages) {
      for (const [, id] of source.matchAll(PREVIEW_ID)) {
        if (!registryIds.has(id)) broken.push(`${slug}.mdx -> ${id}`);
      }
    }

    expect(broken).toEqual([]);
  });

  it("has a title and description on every page", () => {
    const incomplete = uiPages
      .filter(({ source }) => {
        const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatter) return true;
        return (
          !/^title:\s*\S/m.test(frontmatter[1]) ||
          !/^description:\s*\S/m.test(frontmatter[1])
        );
      })
      .map(({ slug }) => slug);

    expect(incomplete).toEqual([]);
  });

  it("tracks which components are not previewed anywhere", () => {
    const referenced = referencedIds();
    const unlisted = [...registryIds]
      .filter((id) => !referenced.has(id))
      .sort();

    expect(
      unlisted,
      "a component became orphaned or was wired up - update KNOWN_UNLISTED",
    ).toEqual(KNOWN_UNLISTED);
  });

  it("finds at least one preview", () => {
    expect(referencedIds().size).toBeGreaterThan(0);
  });

  it("flags a playground page in its own frontmatter", () => {
    // `playground: true` must match presence of ComponentPlayground in MDX.
    const mismatched = uiPages
      .filter(({ source }) => {
        const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
        const flagged = /^playground:\s*true\s*$/m.test(frontmatter?.[1] ?? "");
        return flagged !== PLAYGROUND.test(source);
      })
      .map(({ slug }) => slug);

    expect(mismatched).toEqual([]);
  });

  it("puts a playground only where a schema backs it", () => {
    // Playground requires a registry schema under the page slug.
    const unbacked = uiPages
      .filter(({ source }) => PLAYGROUND.test(source))
      .filter(({ slug }) => !registryIds.has(slug))
      .map(({ slug }) => slug);

    expect(unbacked).toEqual([]);
  });
});

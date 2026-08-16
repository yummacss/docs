import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contentPages, rootDir } from "./helpers";

/**
 * The link between a Yumma UI doc page and the component it previews is a
 * string id, checked by nobody. A typo in `registryId` makes
 * `<ComponentPreview>` render an empty box - `getRegistryImport` returns null
 * and the Suspense boundary falls through to nothing - so the page still
 * builds and still deploys, just without the component on it.
 */

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

const uiPages = contentPages("ui");

/**
 * In the registry but previewed on no page. Not necessarily wrong - a variant
 * can exist before it is documented - but the set should move deliberately.
 * Wire one up or delete it, then update this list.
 *
 * Empty since the `feat/yumma-ui` merge. All eleven entries it used to hold
 * were deleted outright by the curation pass, not wired up: each was a single
 * enumerable prop the API reference table already states (`select-icon-leading`
 * is `iconSide`, `collapsible-square` is `shape`), and `select-bordered` was
 * byte-identical to its base. An orphan appearing here again is a real signal
 * now that the baseline is zero.
 */
const KNOWN_UNLISTED: string[] = [];

function referencedIds(): Set<string> {
  const ids = new Set<string>();

  for (const { source } of uiPages) {
    for (const [, id] of source.matchAll(PREVIEW_ID)) {
      ids.add(id);
    }
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
});

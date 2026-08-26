/**
 * The CSS properties a docs page documents, read from the page itself.
 *
 * A merged utility page carries a `## Heading` followed by a
 * `<Reference name="…" />` for each property it absorbed. That pairing is the
 * only source of truth: the redirects for the retired URLs and the search
 * entries for each property both derive from it, so adding a property to a
 * page is enough & there is no second list to keep in step.
 *
 * `anchor` matches `generateId` in mdx-components.tsx, which is what turns the
 * Title Case heading into the id a redirect can land on.
 */
export interface DocProperty {
  /** The CSS property, & the slug its page used to live at. */
  name: string;
  /** The heading id on the merged page. */
  anchor: string;
  /** The heading as rendered, Title Case. */
  title: string;
}

export function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const SECTION = /^##\s+(.+?)\s*\n+\s*<Reference[^>]*name="([^"]+)"/gm;

export function extractProperties(content: string): DocProperty[] {
  const out: DocProperty[] = [];
  for (const [, title, name] of content.matchAll(SECTION)) {
    out.push({ name, title, anchor: generateId(title) });
  }
  return out;
}

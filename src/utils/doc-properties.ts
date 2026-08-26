/** CSS properties on a merged docs page, from `##` + `<Reference>` pairs. */
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

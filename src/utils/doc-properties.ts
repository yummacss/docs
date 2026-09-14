export interface DocProperty {
  name: string;
  anchor: string;
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

import { allDocs, allUis } from "content-collections";
import { type Category, categoryGetters } from "@/utils/yummacss";
import { sidebarConfig, type SidebarSection } from "@/config/sidebar";

export const dynamic = "force-static";

function flattenSlugs(sections: SidebarSection[]): string[] {
  const slugs: string[] = [];
  for (const section of sections) {
    for (const item of section.items) {
      if (typeof item === "string") slugs.push(item);
      else slugs.push(...item.items);
    }
  }
  return slugs;
}

function buildReferenceTable(category: Category, name: string): string {
  try {
    const getter = categoryGetters[category];
    if (!getter) return "";
    const utils = getter();
    const util = utils[name];
    if (!util) return "";
    const rows = Object.entries(util.values as Record<string, string>).map(
      ([suffix, value]) => {
        const cls = suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
        const props = (util.properties as string[]).join(", ");
        return `| \`${cls}\` | ${props} | \`${value}\` |`;
      },
    );
    return [
      "| Class | Properties | Value |",
      "|-------|------------|-------|",
      ...rows,
    ].join("\n");
  } catch {
    return "";
  }
}

function renderDocBody(content: string): string {
  return content
    .replace(
      /<Reference\s+category="([^"]+)"\s+name="([^"]+)"\s*\/>/g,
      (_, cat, nm) => buildReferenceTable(cat as Category, nm),
    )
    .replace(
      /<Reference\s+name="([^"]+)"\s+category="([^"]+)"\s*\/>/g,
      (_, nm, cat) => buildReferenceTable(cat as Category, nm),
    )
    .replace(/<[A-Z][A-Za-z]*(\s[^>]*)?\s*\/>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function renderUiBody(content: string): string {
  return content
    .replace(/<[A-Z][A-Za-z]*(\s[^>]*)?\s*\/>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function GET() {
  const docMap = new Map(allDocs.map((d) => [d._meta.path, d]));
  const uiMap = new Map(allUis.map((u) => [u._meta.path, u]));

  const parts: string[] = [
    "# Yumma CSS — Full Documentation",
    "",
    "Yumma CSS is a utility CSS framework derived directly from CSS property and value initials.",
    "Every class name maps to exactly one CSS property. If you know CSS, you already know Yumma CSS.",
    "",
    "---",
    "",
  ];

  for (const slug of flattenSlugs(sidebarConfig.docs)) {
    const doc = docMap.get(slug);
    if (!doc) continue;
    parts.push(`# ${doc.title}`);
    if (doc.description) parts.push("", doc.description);
    const body = renderDocBody(doc.content ?? "");
    if (body) parts.push("", body);
    parts.push("", "---", "");
  }

  parts.push("# Yumma UI Components", "", "---", "");

  for (const slug of flattenSlugs(sidebarConfig.ui)) {
    const ui = uiMap.get(slug);
    if (!ui) continue;
    parts.push(`# ${ui.title}`);
    if (ui.description) parts.push("", ui.description);
    const body = renderUiBody(ui.content ?? "");
    if (body) parts.push("", body);
    parts.push("", "---", "");
  }

  return new Response(parts.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

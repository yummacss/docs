import { allDocs, allUis } from "content-collections";
import { sidebarConfig, type SidebarSection } from "@/config/sidebar";

export const dynamic = "force-static";

const BASE = "https://yummacss.com";

function flattenSlugs(sections: SidebarSection[]): string[] {
  const slugs: string[] = [];
  for (const section of sections) {
    for (const item of section.items) {
      if (typeof item === "string") {
        slugs.push(item);
      } else {
        slugs.push(...item.items);
      }
    }
  }
  return slugs;
}

export function GET() {
  const docMap = new Map(allDocs.map((d) => [d._meta.path, d]));
  const uiMap = new Map(allUis.map((u) => [u._meta.path, u]));

  const docSlugs = flattenSlugs(sidebarConfig.docs);
  const uiSlugs = flattenSlugs(sidebarConfig.ui);

  const lines: string[] = [
    "# Yumma CSS",
    "",
    "> Yumma CSS is a utility CSS framework derived directly from CSS property and value initials.",
    "> Every class name maps to exactly one CSS property. If you know CSS, you already know Yumma CSS.",
    "> Prefix = initials of the CSS property (e.g. `jc` for `justify-content`).",
    "> Suffix = initials of the value (e.g. `sb` for `space-between`).",
    "> So `jc-sb` means `justify-content: space-between`.",
    "",
    `Docs: ${BASE}/docs`,
    `UI Components: ${BASE}/ui`,
    `Full context: ${BASE}/llms-full.txt`,
    "",
    "## Documentation",
    "",
  ];

  for (const slug of docSlugs) {
    const doc = docMap.get(slug);
    const title = doc?.title ?? slug;
    const desc = doc?.description ? `: ${doc.description}` : "";
    lines.push(`- [${title}](${BASE}/docs/${slug}.md)${desc}`);
  }

  lines.push("", "## UI Components", "");

  for (const slug of uiSlugs) {
    const ui = uiMap.get(slug);
    const title = ui?.title ?? slug;
    const desc = ui?.description ? `: ${ui.description}` : "";
    lines.push(`- [${title}](${BASE}/ui/components/${slug}.md)${desc}`);
  }

  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

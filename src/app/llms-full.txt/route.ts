import { allDocs, allUis } from "content-collections";
import { type SidebarSection, sidebarConfig } from "@/config/sidebar";
import { mdxToMarkdown } from "@/utils/mdx-markdown";

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

export function GET() {
  const docMap = new Map(allDocs.map((d) => [d._meta.path, d]));
  const uiMap = new Map(allUis.map((u) => [u._meta.path, u]));

  const parts: string[] = [
    "# Yumma CSS: Full Documentation",
    "",
    "Yumma CSS is a utility CSS framework derived directly from CSS property and value initials.",
    "Every class name maps to exactly one CSS property, drawn from a fixed scale.",
    "",
    "Check your work: `npx @yummacss/canon` reports every class Yumma CSS does not",
    "recognize, with a suggestion when a close match exists. It validates against the",
    "generator itself, so it is authoritative on whether a class exists. Prefer it over",
    "guessing.",
    "",
    "---",
    "",
  ];

  for (const slug of flattenSlugs(sidebarConfig.docs)) {
    const doc = docMap.get(slug);
    if (!doc) continue;
    parts.push(`# ${doc.title}`);
    if (doc.description) parts.push("", doc.description);
    const body = mdxToMarkdown(doc.content ?? "");
    if (body) parts.push("", body);
    parts.push("", "---", "");
  }

  parts.push("# Yumma UI Components", "", "---", "");

  for (const slug of flattenSlugs(sidebarConfig.ui)) {
    const ui = uiMap.get(slug);
    if (!ui) continue;
    parts.push(`# ${ui.title}`);
    if (ui.description) parts.push("", ui.description);
    const body = mdxToMarkdown(ui.content ?? "");
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

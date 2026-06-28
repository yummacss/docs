import { allDocs, allUis } from "content-collections";
import { sidebarConfig } from "@/config/sidebar";

export const dynamic = "force-static";

const BASE = "https://yummacss.com";

export function GET() {
  const docMap = new Map(allDocs.map((d) => [d._meta.path, d]));
  const uiMap = new Map(allUis.map((u) => [u._meta.path, u]));

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
  ];

  for (const section of sidebarConfig.docs) {
    lines.push(`## ${section.title}`, "");
    for (const item of section.items) {
      if (typeof item === "string") {
        const doc = docMap.get(item);
        const title = doc?.title ?? item;
        const desc = doc?.description ? `: ${doc.description}` : "";
        lines.push(`- [${title}](${BASE}/docs/${item}.md)${desc}`);
      } else {
        lines.push(`### ${item.title}`, "");
        for (const slug of item.items) {
          const doc = docMap.get(slug);
          const title = doc?.title ?? slug;
          const desc = doc?.description ? `: ${doc.description}` : "";
          lines.push(`- [${title}](${BASE}/docs/${slug}.md)${desc}`);
        }
        lines.push("");
      }
    }
    lines.push("");
  }

  lines.push("## UI Components", "");

  for (const section of sidebarConfig.ui) {
    lines.push(`### ${section.title}`, "");
    for (const item of section.items) {
      if (typeof item === "string") {
        const ui = uiMap.get(item);
        const title = ui?.title ?? item;
        const desc = ui?.description ? `: ${ui.description}` : "";
        lines.push(`- [${title}](${BASE}/ui/components/${item}.md)${desc}`);
      }
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

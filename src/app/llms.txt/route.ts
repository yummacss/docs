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
    "> Yumma CSS is a utility CSS framework whose class names are built from the",
    "> initials of a CSS property and its value, joined by a colon.",
    "",
    "## Syntax",
    "",
    "- A class is property initials, a colon, value initials: `d:f` is `display: flex`, `jc:sb` is `justify-content: space-between`.",
    "- Numbers and scales keep their position: `p:4` is `padding: 1rem` (one step is 0.25rem), `fs:lg`, `fw:600`. `none` and `auto` stay whole: `d:none`.",
    "- Variants go first, each followed by a colon: `h:bg:indigo-7` on hover, `@md:d:f` from the md breakpoint, `b::c:indigo` on `::before`. They stack: `@sm:h:bg:red`.",
    "- Opacity follows a slash: `bg:red-5/50`. A negative value takes a minus after the colon: `ml:-4`.",
    "- There are no arbitrary values: `w:37px` is not a class. A value off the scale is a CSS function with no spaces: `max-h:calc(100dvh-5rem)`, `w:var(--width)`.",
    "- Yumma is a name, not a theme. There is no `yum-` prefix and no dash between property and value.",
    "",
    "Check your work: `pnpm dlx yummacss lint` reports every class Yumma CSS does not",
    "generate, with the closest one that exists. In a project that uses Oxlint, the",
    "`@yummacss/lint` plugin reports the same in the editor. Both read the generator",
    "itself, so they are authoritative on whether a class exists. Prefer them over",
    "guessing.",
    "",
    `Docs: ${BASE}/docs`,
    `UI Components: ${BASE}/ui`,
    "",
    "Every page below has a `.md` twin carrying its full text, and for a UI",
    "component its source and its API. Fetch the ones you need rather than a",
    "whole-site dump: the index is ~5k tokens and a page is ~4k, where the dump",
    "this used to advertise was ~594k.",
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

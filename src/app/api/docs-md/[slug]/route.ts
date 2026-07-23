import { allDocs } from "content-collections";
import { type Category, categoryGetters } from "@/utils/yummacss";

export const dynamic = "force-dynamic";

function buildReferenceTable(category: Category, name: string): string {
  try {
    const getter = categoryGetters[category];
    if (!getter) return "";
    const utils = getter();
    const util = utils[name];
    if (!util) return "";

    const rows = Object.entries(
      util.values as Record<string, string>,
    ).map(([suffix, value]) => {
      const cls = suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
      const props = (util.properties as string[]).join(", ");
      return `| \`${cls}\` | ${props} | \`${value}\` |`;
    });

    return ["| Class | Properties | Value |", "|-------|------------|-------|", ...rows].join(
      "\n",
    );
  } catch {
    return "";
  }
}

function renderDocMarkdown(doc: {
  title: string;
  description?: string;
  content?: string;
}): string {
  const raw = doc.content ?? "";

  const body = raw
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

  const lines = [`# ${doc.title}`, ""];
  if (doc.description) lines.push(doc.description, "");
  if (body) lines.push(body);

  return lines.join("\n");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const doc = allDocs.find((d) => d._meta.path === slug);

  if (!doc) {
    return new Response("Not found", { status: 404 });
  }

  const markdown = renderDocMarkdown(doc);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

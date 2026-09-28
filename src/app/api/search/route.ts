import { allDocs, allUis } from "content-collections";
import { extractProperties } from "@/utils/doc-properties";
import type { SearchIndex } from "@/utils/search-data";

export const dynamic = "force-static";

export function GET() {
  const index: SearchIndex = {
    docs: allDocs.map((doc) => ({
      title: doc.title,
      description: doc.description,
      path: `/docs/${doc._meta.path}`,
      category: "docs",
    })),
    properties: allDocs.flatMap((doc) =>
      extractProperties(doc.content ?? "")
        .filter((p) => p.name !== doc.slug)
        .map((p) => ({
          title: p.title,
          description: p.name,
          path: `/docs/${doc.slug}#${p.anchor}`,
          category: "docs",
        })),
    ),
    components: allUis.map((ui) => ({
      title: ui.title,
      description: ui.description,
      path: `/ui/components/${ui._meta.path}`,
      category: "ui-components",
    })),
  };

  return Response.json(index);
}

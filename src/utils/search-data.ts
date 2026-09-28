import { allDocs, allUis } from "content-collections";
import { COLOR_FAMILIES, generateShades, SHADE_LABELS } from "./colors";
import { extractProperties } from "./doc-properties";

export interface SearchItem {
  title: string;
  description?: string;
  path: string;
  category: "docs" | "colors" | "ui-components" | "props" | "reference";
  color?: string;
  /** What a query is matched against, when that is not the title and description. */
  terms?: string;
}

const DOCS_ITEMS: SearchItem[] = allDocs.map((doc) => ({
  title: doc.title,
  description: doc.description,
  path: `/docs/${doc._meta.path}`,
  category: "docs" as const,
}));

const COMPONENT_ITEMS: SearchItem[] = allUis.map((ui) => ({
  title: ui.title,
  description: ui.description,
  path: `/ui/components/${ui._meta.path}`,
  category: "ui-components" as const,
}));

const MERGED_ITEMS: SearchItem[] = allDocs.flatMap((doc) =>
  extractProperties(doc.content ?? "")
    .filter((p) => p.name !== doc.slug)
    .map((p) => ({
      title: p.title,
      description: p.name,
      path: `/docs/${doc.slug}#${p.anchor}`,
      category: "docs" as const,
    })),
);

// one row per component that has the prop, matched on the name alone so that
// typing a component's name does not list every prop it has
const PROP_ITEMS: SearchItem[] = allUis.flatMap((ui) =>
  ui.props.map((name) => ({
    title: name,
    description: ui.title,
    path: `/ui/components/${ui._meta.path}`,
    category: "props" as const,
    terms: name,
  })),
);

const REFERENCE_ITEMS: SearchItem[] = [
  ...allDocs.map((doc) => ({ doc, base: `/docs/${doc._meta.path}` })),
  ...allUis.map((doc) => ({ doc, base: `/ui/components/${doc._meta.path}` })),
].flatMap(({ doc, base }) =>
  doc.reference.map((entry) => ({
    title: entry.title,
    description: entry.description.includes(" · ")
      ? entry.description
      : `${entry.description} · ${doc.title}`,
    path: entry.anchor ? `${base}#${entry.anchor}` : base,
    category: "reference" as const,
  })),
);

function generateColorItems(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const family of COLOR_FAMILIES) {
    const shades = generateShades(family.color);
    shades.forEach((shade, index) => {
      const label = SHADE_LABELS[index];
      const displayName =
        label === "Base" ? family.name : `${family.name} ${label}`;
      items.push({
        title: displayName,
        description: shade.toUpperCase(),
        path: "/docs/colors",
        category: "colors",
        color: shade,
      });
    });
  }
  return items;
}

const COLOR_ITEMS = generateColorItems();

export const SEARCH_DATA: SearchItem[] = [
  ...DOCS_ITEMS,
  ...MERGED_ITEMS,
  ...COMPONENT_ITEMS,
  ...PROP_ITEMS,
  ...REFERENCE_ITEMS,
  ...COLOR_ITEMS,
];

export const DEFAULT_ITEMS: SearchItem[] = [
  ...COMPONENT_ITEMS.slice(0, 12),
  ...DOCS_ITEMS.slice(0, 8),
];

export function filterSearchResults(query: string): SearchItem[] {
  if (!query.trim()) return DEFAULT_ITEMS;

  const lowerQuery = query.toLowerCase();
  const matches = SEARCH_DATA.filter((item) =>
    item.terms === undefined
      ? item.title.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery)
      : item.terms.toLowerCase().includes(lowerQuery),
  );

  const colors = matches.filter((item) => item.category === "colors");
  const others = matches.filter((item) => item.category !== "colors");

  const leadsWith = (item: SearchItem) =>
    item.title.toLowerCase().startsWith(lowerQuery) ||
    (item.terms === undefined &&
      (item.description?.toLowerCase().startsWith(lowerQuery) ?? false));

  // "-a, --all" names two things; typing either one exactly puts it first
  const names = (item: SearchItem) => item.title.toLowerCase().split(/,\s*/);
  const exact = (item: SearchItem) => names(item).includes(lowerQuery);

  others.sort((a, b) => {
    const aExact = exact(a);
    const bExact = exact(b);
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    const aLeads = leadsWith(a);
    const bLeads = leadsWith(b);
    if (aLeads && !bLeads) return -1;
    if (!aLeads && bLeads) return 1;
    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  });

  return [...others, ...colors];
}

export function groupByCategory(
  items: SearchItem[],
): Record<string, SearchItem[]> {
  return items.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, SearchItem[]>,
  );
}

export const CATEGORY_LABELS: Record<string, string> = {
  docs: "Documentation",
  colors: "Colors",
  "ui-components": "Components",
  props: "Props",
  reference: "Flags and Options",
};

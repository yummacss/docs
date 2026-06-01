import { allDocs, allUis } from "content-collections";
import { COLOR_FAMILIES, generateShades, SHADE_LABELS } from "./colors";

export interface SearchItem {
  title: string;
  description?: string;
  path: string;
  category: "docs" | "colors" | "ui-components";
  color?: string;
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
  ...COMPONENT_ITEMS,
  ...COLOR_ITEMS,
];

export const DEFAULT_ITEMS: SearchItem[] = [
  ...COMPONENT_ITEMS.slice(0, 12),
  ...DOCS_ITEMS.slice(0, 8),
];

export function filterSearchResults(query: string): SearchItem[] {
  if (!query.trim()) return DEFAULT_ITEMS;

  const lowerQuery = query.toLowerCase();
  const matches = SEARCH_DATA.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description?.toLowerCase().includes(lowerQuery),
  );

  const colors = matches.filter((item) => item.category === "colors");
  const others = matches.filter((item) => item.category !== "colors");

  others.sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    const aStartsWith = aTitle.startsWith(lowerQuery);
    const bStartsWith = bTitle.startsWith(lowerQuery);
    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;
    return aTitle.localeCompare(bTitle);
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
};

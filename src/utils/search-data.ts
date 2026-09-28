import { COLOR_FAMILIES, generateShades, SHADE_LABELS } from "./colors";

export interface SearchItem {
  title: string;
  description?: string;
  path: string;
  category: "docs" | "colors" | "ui-components";
  color?: string;
}

/** What `/api/search` serves: the pages, fetched so their collections stay off the client. */
export interface SearchIndex {
  docs: SearchItem[];
  properties: SearchItem[];
  components: SearchItem[];
}

let pending: Promise<SearchIndex> | null = null;

export function loadSearchIndex(): Promise<SearchIndex> {
  pending ??= fetch("/api/search")
    .then((res) => {
      if (!res.ok) throw new Error(`/api/search: ${res.status}`);
      return res.json() as Promise<SearchIndex>;
    })
    .catch((error) => {
      pending = null;
      throw error;
    });
  return pending;
}

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

function defaultItems(index: SearchIndex | null): SearchItem[] {
  if (!index) return [];
  return [...index.components.slice(0, 12), ...index.docs.slice(0, 8)];
}

export function filterSearchResults(
  query: string,
  index: SearchIndex | null,
): SearchItem[] {
  if (!query.trim()) return defaultItems(index);

  const lowerQuery = query.toLowerCase();
  const pages = index
    ? [...index.docs, ...index.properties, ...index.components]
    : [];
  const matches = [...pages, ...COLOR_ITEMS].filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description?.toLowerCase().includes(lowerQuery),
  );

  const colors = matches.filter((item) => item.category === "colors");
  const others = matches.filter((item) => item.category !== "colors");

  const leadsWith = (item: SearchItem) =>
    item.title.toLowerCase().startsWith(lowerQuery) ||
    (item.description?.toLowerCase().startsWith(lowerQuery) ?? false);

  others.sort((a, b) => {
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
};

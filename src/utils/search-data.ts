import { COLOR_FAMILIES, generateShades, SHADE_LABELS } from "./colors";

export interface SearchItem {
  title: string;
  description?: string;
  path: string;
  category: "docs" | "colors" | "ui-components" | "props" | "reference";
  color?: string;
  /** What a query is matched against, when that is not the title and description. */
  terms?: string;
  /** A component's screenshot, shown beside the results. */
  preview?: string;
}

/** What `/api/search` serves: the pages, fetched so their collections stay off the client. */
export interface SearchIndex {
  docs: SearchItem[];
  properties: SearchItem[];
  components: SearchItem[];
  props: SearchItem[];
  reference: SearchItem[];
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
        path: "/docs/color-system",
        category: "colors",
        color: shade,
      });
    });
  }
  return items;
}

const COLOR_ITEMS = generateColorItems();

/** Where someone new starts, shown before anything is typed. */
const STARTERS = [
  "/docs/installation",
  "/docs/configuration",
  "/docs/color-system",
  "/ui/components/installation",
];

/** Searches that show what the dialog finds: a utility, a color, a component, a variant, a flag. */
export const SUGGESTIONS = [
  "flex",
  "indigo",
  "dialog",
  "@container",
  "--watch",
];

function defaultItems(index: SearchIndex | null): SearchItem[] {
  if (!index) return [];
  const pages = [...index.docs, ...index.components];
  return STARTERS.flatMap((path) => pages.filter((p) => p.path === path));
}

export function filterSearchResults(
  query: string,
  index: SearchIndex | null,
): SearchItem[] {
  if (!query.trim()) return defaultItems(index);

  const lowerQuery = query.toLowerCase();
  const pages = index
    ? [
        ...index.docs,
        ...index.properties,
        ...index.components,
        ...index.props,
        ...index.reference,
      ]
    : [];
  const matches = [...pages, ...COLOR_ITEMS].filter((item) =>
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
  docs: "Yumma CSS",
  "ui-components": "Yumma UI",
  props: "Props",
  reference: "Options",
  colors: "Colors",
};

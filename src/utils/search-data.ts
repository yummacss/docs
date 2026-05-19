import { COLOR_FAMILIES, generateShades, SHADE_LABELS } from "./colors";
import { type SidebarConfigItem, sidebarConfig } from "./sidebar";
import { type UISidebarConfigItem, uiSidebarConfig } from "./ui-sidebar";

export interface SearchItem {
  title: string;
  description?: string;
  path: string;
  category: "docs" | "handbook" | "colors" | "ui" | "components" | "blocks";
  color?: string;
}

// Extract items from docs sidebar config
function extractDocsItems(): SearchItem[] {
  const items: SearchItem[] = [];

  function extract(configItems: SidebarConfigItem[]) {
    for (const item of configItems) {
      if (item.slug) {
        items.push({
          title: item.title,
          path: `/docs/${item.slug}`,
          category: "docs",
        });
      }
      if ("children" in item && Array.isArray(item.children)) {
        extract(item.children);
      }
      if ("items" in item && Array.isArray(item.items)) {
        extract(item.items);
      }
    }
  }

  for (const section of sidebarConfig) {
    extract(section.items);
  }

  return items;
}

// Extract items from UI sidebar config
function extractUIItems(): SearchItem[] {
  const components: SearchItem[] = [];

  function extract(configItems: UISidebarConfigItem[]) {
    for (const item of configItems) {
      if (item.slug) {
        components.push({
          title: item.title,
          path: `/ui/components/${item.slug}`,
          category: "components",
        });
      }
      if ("children" in item && Array.isArray(item.children)) {
        extract(item.children);
      }
      if ("items" in item && Array.isArray(item.items)) {
        extract(item.items);
      }
    }
  }

  for (const section of uiSidebarConfig) {
    extract(section.items);
  }

  return components;
}

// Generate color items with all shades using shared utility
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

// Build combined search data
const DOCS_ITEMS = extractDocsItems();
const COMPONENT_ITEMS = extractUIItems();
const COLOR_ITEMS = generateColorItems();

export const SEARCH_DATA: SearchItem[] = [
  ...DOCS_ITEMS,
  ...COMPONENT_ITEMS,
  ...COLOR_ITEMS,
];

// Default items to show when search is empty
export const DEFAULT_ITEMS: SearchItem[] = [
  { title: "Installation", path: "/docs/installation", category: "docs" },
  { title: "Configuration", path: "/docs/configuration", category: "docs" },
  { title: "Colors", path: "/docs/colors", category: "docs" },
  { title: "Components", path: "/ui/components", category: "ui" },
  {
    title: "Media Queries",
    path: "/docs/media-queries",
    category: "handbook",
  },
  {
    title: "Pseudo Classes",
    path: "/docs/pseudo-classes",
    category: "handbook",
  },
  {
    title: "Pseudo Elements",
    path: "/docs/pseudo-elements",
    category: "handbook",
  },
  {
    title: "Container Queries",
    path: "/docs/container-queries",
    category: "handbook",
  },
  {
    title: "Negative Values",
    path: "/docs/negative-values",
    category: "handbook",
  },
];

// Helper to filter search results (prioritizes items starting with query)
export function filterSearchResults(query: string): SearchItem[] {
  if (!query.trim()) {
    return DEFAULT_ITEMS;
  }

  const lowerQuery = query.toLowerCase();

  // Filter matching items
  const matches = SEARCH_DATA.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description?.toLowerCase().includes(lowerQuery),
  );

  // Separate colors from other items to preserve shade order
  const colors = matches.filter((item) => item.category === "colors");
  const others = matches.filter((item) => item.category !== "colors");

  // Sort non-colors: items starting with query first, then alphabetically
  others.sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    const aStartsWith = aTitle.startsWith(lowerQuery);
    const bStartsWith = bTitle.startsWith(lowerQuery);

    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;
    return aTitle.localeCompare(bTitle);
  });

  // Colors keep their original order (lightest → base → darkest)
  return [...others, ...colors];
}

// Group results by category
export function groupByCategory(
  items: SearchItem[],
): Record<string, SearchItem[]> {
  return items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, SearchItem[]>,
  );
}

// Category labels for display
export const CATEGORY_LABELS: Record<string, string> = {
  docs: "Docs",
  handbook: "Handbook",
  colors: "Colors",
  ui: "Yumma UI",
  components: "Components",
};

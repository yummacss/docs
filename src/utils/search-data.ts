import { COLOR_FAMILIES, generateShades, SHADE_LABELS } from "./colors";
import { type SidebarConfigItem, sidebarConfig } from "./sidebar";
import { type UISidebarConfigItem, uiSidebarConfig } from "./ui-sidebar";

export interface SearchItem {
  title: string;
  description?: string;
  path: string;
  category: "docs" | "components" | "blocks" | "templates" | "colors";
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
function extractUIItems(): {
  components: SearchItem[];
  blocks: SearchItem[];
  templates: SearchItem[];
} {
  const components: SearchItem[] = [];
  const blocks: SearchItem[] = [];
  const templates: SearchItem[] = [];

  function extract(configItems: UISidebarConfigItem[], sectionTitle: string) {
    for (const item of configItems) {
      if (item.slug) {
        if (item.slug.startsWith("templates/")) continue;
        if (["license", "privacy", "terms"].includes(item.slug)) continue;

        const searchItem: SearchItem = {
          title: item.title,
          path: `/ui/${item.slug}`,
          category: "components",
        };

        if (
          sectionTitle === "Components" ||
          sectionTitle === "Base components" ||
          sectionTitle === "Getting Started"
        ) {
          searchItem.category = "components";
          components.push(searchItem);
        } else if (sectionTitle === "Blocks") {
          searchItem.category = "blocks";
          blocks.push(searchItem);
        } else if (sectionTitle === "Templates") {
          searchItem.category = "templates";
          templates.push(searchItem);
        }
      }
      if ("children" in item && Array.isArray(item.children)) {
        extract(item.children, sectionTitle);
      }
      if ("items" in item && Array.isArray(item.items)) {
        extract(item.items, sectionTitle);
      }
    }
  }

  for (const section of uiSidebarConfig) {
    extract(section.items, section.title);
  }

  return { components, blocks, templates };
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
const {
  components: COMPONENT_ITEMS,
  blocks: BLOCK_ITEMS,
  templates: TEMPLATE_ITEMS,
} = extractUIItems();
const COLOR_ITEMS = generateColorItems();

export const SEARCH_DATA: SearchItem[] = [
  ...DOCS_ITEMS,
  ...COMPONENT_ITEMS,
  ...BLOCK_ITEMS,
  ...TEMPLATE_ITEMS,
  ...COLOR_ITEMS,
];

// Default items to show when search is empty
export const DEFAULT_ITEMS: SearchItem[] = [
  { title: "Documentation", path: "/docs", category: "docs" },
  { title: "Components", path: "/ui/components", category: "components" },
  { title: "Templates", path: "/ui/templates", category: "templates" },
  { title: "Installation", path: "/docs/installation", category: "docs" },
  { title: "Configuration", path: "/docs/configuration", category: "docs" },
  { title: "Upgrading", path: "/docs/upgrading", category: "docs" },
  {
    title: "Styling Elements",
    path: "/docs/styling-elements",
    category: "docs",
  },
  { title: "Colors", path: "/docs/colors", category: "docs" },
  { title: "Media Queries", path: "/docs/media-queries", category: "docs" },
  { title: "Pseudo Classes", path: "/docs/pseudo-classes", category: "docs" },
  { title: "Base Styles", path: "/docs/base-styles", category: "docs" },
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
  components: "Components",
  blocks: "Blocks",
  templates: "Templates",
  colors: "Colors",
};

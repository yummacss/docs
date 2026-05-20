import { sidebarConfig } from "@/config/sidebar";
import { COLOR_FAMILIES, generateShades, SHADE_LABELS } from "./colors";
import type { SidebarConfigItem, UISidebarConfigItem } from "./sidebar";

export interface SearchItem {
  title: string;
  description?: string;
  path: string;
  category: "docs" | "colors" | "ui-components";
  color?: string;
}

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

  for (const section of sidebarConfig.docs) {
    extract(section.items);
  }

  return items;
}

function extractUIItems(): SearchItem[] {
  const components: SearchItem[] = [];

  function extract(configItems: UISidebarConfigItem[]) {
    for (const item of configItems) {
      if (item.slug) {
        components.push({
          title: item.title,
          path: `/ui/components/${item.slug}`,
          category: "ui-components",
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

  for (const section of sidebarConfig.ui) {
    extract(section.items);
  }

  return components;
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

const DOCS_ITEMS = extractDocsItems();
const COMPONENT_ITEMS = extractUIItems();
const COLOR_ITEMS = generateColorItems();

export const SEARCH_DATA: SearchItem[] = [
  ...DOCS_ITEMS,
  ...COMPONENT_ITEMS,
  ...COLOR_ITEMS,
];

export const DEFAULT_ITEMS: SearchItem[] = [
  {
    title: "Autocomplete",
    path: "/ui/components/autocomplete",
    category: "ui-components",
  },
  {
    title: "Checkbox",
    path: "/ui/components/checkbox",
    category: "ui-components",
  },
  {
    title: "Combobox",
    path: "/ui/components/combobox",
    category: "ui-components",
  },
  {
    title: "File Upload",
    path: "/ui/components/file-upload",
    category: "ui-components",
  },
  { title: "Field", path: "/ui/components/field", category: "ui-components" },
  { title: "Radio", path: "/ui/components/radio", category: "ui-components" },
  { title: "Select", path: "/ui/components/select", category: "ui-components" },
  { title: "Slider", path: "/ui/components/slider", category: "ui-components" },
  { title: "Switch", path: "/ui/components/switch", category: "ui-components" },
  {
    title: "Textarea",
    path: "/ui/components/textarea",
    category: "ui-components",
  },
  { title: "Toggle", path: "/ui/components/toggle", category: "ui-components" },
  {
    title: "Accordion",
    path: "/ui/components/accordion",
    category: "ui-components",
  },
  { title: "Avatar", path: "/ui/components/avatar", category: "ui-components" },
  { title: "Badge", path: "/ui/components/badge", category: "ui-components" },
  {
    title: "Breadcrumb",
    path: "/ui/components/breadcrumb",
    category: "ui-components",
  },
  {
    title: "Collapsible",
    path: "/ui/components/collapsible",
    category: "ui-components",
  },
  {
    title: "Preview Card",
    path: "/ui/components/preview-card",
    category: "ui-components",
  },
  {
    title: "Progress",
    path: "/ui/components/progress",
    category: "ui-components",
  },
  {
    title: "Separator",
    path: "/ui/components/separator",
    category: "ui-components",
  },
  { title: "Button", path: "/ui/components/button", category: "ui-components" },
  {
    title: "Context Menu",
    path: "/ui/components/context-menu",
    category: "ui-components",
  },
  { title: "Menu", path: "/ui/components/menu", category: "ui-components" },
  {
    title: "Menubar",
    path: "/ui/components/menubar",
    category: "ui-components",
  },
  { title: "Tabs", path: "/ui/components/tabs", category: "ui-components" },
  {
    title: "Toolbar",
    path: "/ui/components/toolbar",
    category: "ui-components",
  },
  {
    title: "Command Palette",
    path: "/ui/components/command-palette",
    category: "ui-components",
  },
  { title: "Dialog", path: "/ui/components/dialog", category: "ui-components" },
  { title: "Drawer", path: "/ui/components/drawer", category: "ui-components" },
  {
    title: "Popover",
    path: "/ui/components/popover",
    category: "ui-components",
  },
  {
    title: "Tooltip",
    path: "/ui/components/tooltip",
    category: "ui-components",
  },
  {
    title: "Empty State",
    path: "/ui/components/empty-state",
    category: "ui-components",
  },
  {
    title: "Onboarding",
    path: "/ui/components/onboarding",
    category: "ui-components",
  },
  { title: "Rating", path: "/ui/components/rating", category: "ui-components" },
  {
    title: "Skeleton",
    path: "/ui/components/skeleton",
    category: "ui-components",
  },
  {
    title: "Text Editor",
    path: "/ui/components/text-editor",
    category: "ui-components",
  },

  { title: "Installation", path: "/docs/installation", category: "docs" },
  { title: "Configuration", path: "/docs/configuration", category: "docs" },
  { title: "IDE Support", path: "/docs/ide-support", category: "docs" },
  { title: "Colors", path: "/docs/colors", category: "docs" },
  { title: "Media Queries", path: "/docs/media-queries", category: "docs" },
  { title: "Negative Values", path: "/docs/negative-values", category: "docs" },
  { title: "Pseudo Classes", path: "/docs/pseudo-classes", category: "docs" },
  { title: "Pseudo Elements", path: "/docs/pseudo-elements", category: "docs" },
];

export function filterSearchResults(query: string): SearchItem[] {
  if (!query.trim()) {
    return DEFAULT_ITEMS;
  }

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
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
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

export interface UISidebarConfigItemBase {
  title: string;
  slug?: string;
  updated?: boolean;
  primitive?: boolean;
  wip?: boolean;
}

export interface UISidebarConfigItemWithChildren
  extends UISidebarConfigItemBase {
  children: UISidebarConfigSimpleItem[];
}

export interface UISidebarConfigSimpleItem extends UISidebarConfigItemBase {}

export type UISidebarConfigItem =
  | UISidebarConfigSimpleItem
  | UISidebarConfigItemWithChildren
  | UISidebarConfigItemWithItems;

export interface UISidebarConfigItemWithItems extends UISidebarConfigItemBase {
  items: UISidebarConfigItem[];
}

export interface UISidebarConfigSection {
  title: string;
  items: UISidebarConfigItem[];
}

export type UISidebarConfig = UISidebarConfigSection[];

export const uiSidebarConfig: UISidebarConfig = [
  {
    title: "Get Started",
    items: [
      { title: "Installation", slug: "installation" },
      { title: "Customization", slug: "customization" },
    ],
  },
  {
    title: "Forms",
    items: [
      { title: "Autocomplete", slug: "autocomplete", primitive: true },
      { title: "Checkbox", slug: "checkbox", primitive: true },
      { title: "Combobox", slug: "combobox", primitive: true },
      { title: "File Upload", slug: "file-upload" },
      { title: "Input", slug: "input", primitive: true },

      { title: "Radio", slug: "radio", primitive: true },
      { title: "Select", slug: "select", primitive: true },
      { title: "Slider", slug: "slider", primitive: true },
      { title: "Switch", slug: "switch", primitive: true },
      { title: "Toggle", slug: "toggle", primitive: true },
    ],
  },
  {
    title: "Display",
    items: [
      { title: "Accordion", slug: "accordion", primitive: true },
      { title: "Avatar", slug: "avatar", primitive: true },
      { title: "Badge", slug: "badge", updated: true },
      { title: "Breadcrumb", slug: "breadcrumb", updated: true },
      { title: "Card", slug: "card", wip: true },
      { title: "Collapsible", slug: "collapsible", primitive: true },
      { title: "Kbd", slug: "kbd", wip: true },
      { title: "Preview Card", slug: "preview-card", primitive: true },
      { title: "Progress", slug: "progress", primitive: true },
      { title: "Separator", slug: "separator", primitive: true },
    ],
  },
  {
    title: "Interactive",
    items: [
      { title: "Button", slug: "button", primitive: true },
      { title: "Context Menu", slug: "context-menu", primitive: true },
      { title: "Menu", slug: "menu", primitive: true },
      { title: "Menubar", slug: "menubar", primitive: true },
    ],
  },
  {
    title: "Navigation",
    items: [
      { title: "Navigation Menu", slug: "navigation-menu", primitive: true },
      { title: "Pagination", slug: "pagination", wip: true },
      { title: "Tabs", slug: "tabs", primitive: true },
      { title: "Toolbar", slug: "toolbar", primitive: true },
    ],
  },
  {
    title: "Overlays",
    items: [
      { title: "Dialog", slug: "dialog", primitive: true },
      { title: "Drawer", slug: "drawer", primitive: true },
      { title: "Popover", slug: "popover", primitive: true },
      { title: "Toast", slug: "toast", wip: true },
      { title: "Tooltip", slug: "tooltip", primitive: true },
    ],
  },
  {
    title: "Application UI",
    items: [
      { title: "Empty State", slug: "empty-state", wip: true },
      { title: "Onboarding", slug: "onboarding", wip: true },
      { title: "Rating", slug: "rating", wip: true },
      { title: "Skeleton", slug: "skeleton", wip: true },
      { title: "Text Editor", slug: "text-editor", wip: true },
    ],
  },
];

// extract all slugs from the UI sidebar config
export function getAllUISlugs(): string[] {
  const slugs: string[] = [];

  function extractSlugs(items: UISidebarConfigItem[]) {
    for (const item of items) {
      if (item.slug) {
        slugs.push(item.slug);
      }
      if ("children" in item && Array.isArray(item.children)) {
        extractSlugs(item.children);
      }
      if ("items" in item && Array.isArray(item.items)) {
        extractSlugs(item.items);
      }
    }
  }

  for (const section of uiSidebarConfig) {
    extractSlugs(section.items);
  }

  return slugs;
}

// find the current item from pathname
export function findCurrentUIItemBySlug(
  pathname: string,
): UISidebarConfigItemBase | null {
  let slug = pathname.replace(/^\/ui\/components\//, "");
  slug = slug.replace(/^\/ui\//, "").replace(/\/$/, "");

  function searchInItems(
    items: UISidebarConfigItem[],
  ): UISidebarConfigItemBase | null {
    for (const item of items) {
      if (item.slug === slug) return item;
      if ("children" in item && Array.isArray(item.children)) {
        for (const child of item.children) {
          if (child.slug === slug) return child;
        }
      }
      if ("items" in item && Array.isArray(item.items)) {
        const result = searchInItems(item.items);
        if (result) return result;
      }
    }
    return null;
  }

  for (const section of uiSidebarConfig) {
    const result = searchInItems(section.items);
    if (result) return result;
  }

  return null;
}

// find the current page info from pathname
export function findCurrentUIPageInfo(pathname: string): {
  sectionTitle: string;
  pageTitle: string;
} | null {
  // remove /ui/components/ prefix or /ui/ prefix and get the slug
  let slug = pathname.replace(/^\/ui\/components\//, "");
  slug = slug.replace(/^\/ui\//, "").replace(/\/$/, "");

  function searchInItems(
    items: UISidebarConfigItem[],
    sectionTitle: string,
  ): { sectionTitle: string; pageTitle: string } | null {
    for (const item of items) {
      // check if this item has the slug
      if (item.slug === slug) {
        return { sectionTitle, pageTitle: item.title };
      }

      // check in children
      if ("children" in item && Array.isArray(item.children)) {
        for (const child of item.children) {
          if (child.slug === slug) {
            return { sectionTitle, pageTitle: child.title };
          }
        }
      }

      // check in items recursively
      if ("items" in item && Array.isArray(item.items)) {
        const result = searchInItems(item.items, sectionTitle);
        if (result) return result;
      }
    }

    return null;
  }

  // search through all sections
  for (const section of uiSidebarConfig) {
    const result = searchInItems(section.items, section.title);
    if (result) return result;
  }

  return null;
}

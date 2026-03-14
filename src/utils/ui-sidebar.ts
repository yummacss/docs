export interface UISidebarConfigItemBase {
  title: string;
  slug?: string;
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
    title: "Getting Started",
    items: [
      { title: "Installation", slug: "installation" },
      { title: "Theming", slug: "theming" },
      { title: "Components", slug: "components" },
    ],
  },
  {
    title: "Base components",
    items: [
      { title: "Accordion", slug: "accordion" },
      { title: "Autocomplete", slug: "autocomplete" },
      { title: "Avatar", slug: "avatar" },
      { title: "Button", slug: "button" },
      { title: "Checkbox", slug: "checkbox" },
      { title: "Collapsible", slug: "collapsible" },
      { title: "Combobox", slug: "combobox" },
      { title: "Context Menu", slug: "context-menu" },
      { title: "Dialog", slug: "dialog" },
      { title: "Input", slug: "input" },
      { title: "Menu", slug: "menu" },
      { title: "Menubar", slug: "menubar" },
      { title: "Meter", slug: "meter" },
      { title: "Navigation Menu", slug: "navigation-menu" },
      { title: "Number Field", slug: "number-field" },
      { title: "Popover", slug: "popover" },
      { title: "Preview Card", slug: "preview-card" },
      { title: "Progress", slug: "progress" },
      { title: "Radio", slug: "radio" },
      { title: "Select", slug: "select" },
      { title: "Separator", slug: "separator" },
      { title: "Slider", slug: "slider" },
      { title: "Switch", slug: "switch" },
      { title: "Tabs", slug: "tabs" },
      { title: "Toggle", slug: "toggle" },
      { title: "Toolbar", slug: "toolbar" },
      { title: "Tooltip", slug: "tooltip" },
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

// find the current page info from pathname
export function findCurrentUIPageInfo(pathname: string): {
  sectionTitle: string;
  pageTitle: string;
} | null {
  // remove /ui/ prefix and get the slug
  const slug = pathname.replace(/^\/ui\//, "");

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

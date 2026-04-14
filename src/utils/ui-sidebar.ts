export interface UISidebarConfigItemBase {
  title: string;
  slug?: string;
  updated?: boolean;
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
      { title: "Drawer", slug: "drawer", updated: true },
      { title: "File Upload", slug: "file-upload", updated: true },
      { title: "Input", slug: "input" },
      { title: "Kbd", slug: "kbd", updated: true },
      { title: "Menu", slug: "menu" },
      { title: "Menubar", slug: "menubar" },
      { title: "Meter", slug: "meter" },
      { title: "Navigation Menu", slug: "navigation-menu" },
      { title: "Number Field", slug: "number-field" },
      { title: "Onboarding", slug: "onboarding", updated: true },
      { title: "Popover", slug: "popover" },
      { title: "Preview Card", slug: "preview-card" },
      { title: "Progress", slug: "progress" },
      { title: "Radio", slug: "radio" },
      { title: "Rating", slug: "rating", updated: true },
      { title: "Select", slug: "select" },
      { title: "Separator", slug: "separator" },
      { title: "Slider", slug: "slider" },
      { title: "Switch", slug: "switch" },
      { title: "Tabs", slug: "tabs" },
      { title: "Text Editor", slug: "text-editor", updated: true },
      { title: "Toggle", slug: "toggle" },
      { title: "Toolbar", slug: "toolbar" },
      { title: "Tooltip", slug: "tooltip" },
      { title: "Badge", slug: "badge", updated: true },
      { title: "Breadcrumb", slug: "breadcrumb", updated: true },
      { title: "Color Picker", slug: "color-picker", updated: true },
      { title: "Knob", slug: "knob", updated: true },
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

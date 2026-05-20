export interface UISidebarConfigItemBase {
  title: string;
  slug?: string;
  href?: string;
  external?: boolean;
  updated?: boolean;
  /**
   * When present, identifies the Base UI primitive this component is built on
   * (e.g. `"button"`, `"dialog"`). A string value lets downstream code (hotkeys,
   * API-reference links, etc.) use it without Boolean coercion.
   */
  primitive?: string;
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
      { title: "Autocomplete", slug: "autocomplete", primitive: "combobox" },
      { title: "Checkbox", slug: "checkbox", primitive: "checkbox" },
      { title: "Combobox", slug: "combobox", primitive: "combobox" },
      { title: "File Upload", slug: "file-upload" },
      { title: "Field", slug: "field", primitive: "field" },
      { title: "Radio", slug: "radio", primitive: "radio" },
      { title: "Select", slug: "select", primitive: "select" },
      { title: "Slider", slug: "slider", primitive: "slider" },
      { title: "Switch", slug: "switch", primitive: "switch" },
      { title: "Textarea", slug: "textarea" },
      { title: "Toggle", slug: "toggle", primitive: "toggle" },
    ],
  },
  {
    title: "Display",
    items: [
      { title: "Accordion", slug: "accordion", primitive: "accordion" },
      { title: "Avatar", slug: "avatar", primitive: "avatar" },
      { title: "Badge", slug: "badge" },
      { title: "Breadcrumb", slug: "breadcrumb" },
      { title: "Collapsible", slug: "collapsible", primitive: "collapsible" },
      {
        title: "Preview Card",
        slug: "preview-card",
        primitive: "preview-card",
      },
      { title: "Progress", slug: "progress", primitive: "progress" },
      { title: "Separator", slug: "separator", primitive: "separator" },
    ],
  },
  {
    title: "Interactive",
    items: [
      { title: "Button", slug: "button", primitive: "button" },
      {
        title: "Context Menu",
        slug: "context-menu",
        primitive: "context-menu",
      },
      { title: "Menu", slug: "menu", primitive: "menu" },
      { title: "Menubar", slug: "menubar", primitive: "menubar" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { title: "Tabs", slug: "tabs", primitive: "tabs" },
      { title: "Toolbar", slug: "toolbar", primitive: "toolbar" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { title: "Command Palette", slug: "command-palette" },
      { title: "Dialog", slug: "dialog", primitive: "dialog" },
      { title: "Drawer", slug: "drawer", primitive: "drawer" },
      { title: "Popover", slug: "popover", primitive: "popover" },
      { title: "Tooltip", slug: "tooltip", primitive: "tooltip" },
    ],
  },
  {
    title: "Application UI",
    items: [
      { title: "Empty State", slug: "empty-state" },
      { title: "Onboarding", slug: "onboarding" },
      { title: "Rating", slug: "rating" },
      { title: "Skeleton", slug: "skeleton" },
      { title: "Text Editor", slug: "text-editor" },
    ],
  },
];

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

export function findCurrentUIPageInfo(pathname: string): {
  sectionTitle: string;
  pageTitle: string;
} | null {
  let slug = pathname.replace(/^\/ui\/components\//, "");
  slug = slug.replace(/^\/ui\//, "").replace(/\/$/, "");

  function searchInItems(
    items: UISidebarConfigItem[],
    sectionTitle: string,
  ): { sectionTitle: string; pageTitle: string } | null {
    for (const item of items) {
      if (item.slug === slug) {
        return { sectionTitle, pageTitle: item.title };
      }
      if ("children" in item && Array.isArray(item.children)) {
        for (const child of item.children) {
          if (child.slug === slug) {
            return { sectionTitle, pageTitle: child.title };
          }
        }
      }
      if ("items" in item && Array.isArray(item.items)) {
        const result = searchInItems(item.items, sectionTitle);
        if (result) return result;
      }
    }
    return null;
  }

  for (const section of uiSidebarConfig) {
    const result = searchInItems(section.items, section.title);
    if (result) return result;
  }

  return null;
}

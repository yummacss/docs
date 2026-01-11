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
      {
        title: "Introduction",
        slug: "components",
      },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Accordion", slug: "accordion" },
      { title: "Avatar", slug: "avatar" },
      { title: "Badge", slug: "badge" },
      { title: "Banner", slug: "banner" },
      { title: "Breadcrumb", slug: "breadcrumb" },
      { title: "Button", slug: "button" },
      { title: "Button Group", slug: "button-group" },
      { title: "Card", slug: "card" },
      { title: "Checkbox", slug: "checkbox" },
      { title: "Dropdown", slug: "dropdown" },
      { title: "Input", slug: "input" },
      { title: "Pagination", slug: "pagination" },
      { title: "Table", slug: "table" },
      { title: "Tabs", slug: "tabs" },
      { title: "Textarea", slug: "textarea" },
    ],
  },
  {
    title: "Blocks",
    items: [
      { title: "Auth Form", slug: "auth-form" },
      { title: "Card Group", slug: "card-group" },
      { title: "Card List", slug: "card-list" },
      { title: "Comparison List", slug: "comparison-list" },
      { title: "Contact Section", slug: "contact-section" },
      { title: "CTA Section", slug: "cta-section" },
      { title: "Feature Section", slug: "feature-section" },
      { title: "Footer", slug: "footer" },
      { title: "Header Section", slug: "header-section" },
      { title: "Hero Section", slug: "hero-section" },
      { title: "Logo Section", slug: "logo-section" },
      { title: "Navbar", slug: "navbar" },
      { title: "Newsletter Section", slug: "newsletter-section" },
      { title: "Pricing Section", slug: "pricing-section" },
      { title: "Statistics Section", slug: "statistics-section" },
      { title: "Team Section", slug: "team-section" },
      { title: "Testimonial Section", slug: "testimonial-section" },
      { title: "Timeline", slug: "timeline" },
    ],
  },
  {
    title: "Templates",
    items: [
      { title: "Neutra", slug: "templates/neutra" },
      { title: "License", slug: "license" },
      { title: "Privacy", slug: "privacy" },
      { title: "Terms", slug: "terms" },
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

  // we need to add templates manually since it's not in the ui-sidebar config
  slugs.push("templates");

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

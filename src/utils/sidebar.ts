import { sidebarConfig } from "@/config/sidebar";

export interface SidebarConfigItemBase {
  title: string;
  slug?: string;
  href?: string;
  external?: boolean;
  updated?: boolean;
  primitive?: string;
}

export interface SidebarConfigItemWithChildren extends SidebarConfigItemBase {
  children: SidebarConfigSimpleItem[];
}

export interface SidebarConfigSimpleItem extends SidebarConfigItemBase {}

export interface SidebarConfigItemWithItems extends SidebarConfigItemBase {
  items: SidebarConfigItem[];
}

export type SidebarConfigItem =
  | SidebarConfigSimpleItem
  | SidebarConfigItemWithChildren
  | SidebarConfigItemWithItems;

export interface SidebarConfigSection {
  title: string;
  items: SidebarConfigItem[];
}

export type SidebarConfig = SidebarConfigSection[];

// Backward compatibility type aliases
export type UISidebarConfigItemBase = SidebarConfigItemBase;
export type UISidebarConfigItemWithChildren = SidebarConfigItemWithChildren;
export type UISidebarConfigSimpleItem = SidebarConfigSimpleItem;
export type UISidebarConfigItem = SidebarConfigItem;
export type UISidebarConfigItemWithItems = SidebarConfigItemWithItems;
export type UISidebarConfigSection = SidebarConfigSection;
export type UISidebarConfig = SidebarConfig;

// Consolidated recursion function for slug retrieval
function extractSlugsFromSections(sections: SidebarConfigSection[]): string[] {
  const slugs: string[] = [];
  function extract(items: SidebarConfigItem[]) {
    for (const item of items) {
      if (item.slug) {
        slugs.push(item.slug);
      }
      if ("children" in item && Array.isArray(item.children)) {
        extract(item.children);
      }
      if ("items" in item && Array.isArray(item.items)) {
        extract(item.items);
      }
    }
  }
  for (const section of sections) {
    extract(section.items);
  }
  return slugs;
}

export const getAllSlugs = () => extractSlugsFromSections(sidebarConfig.docs);
export const getAllUISlugs = () => extractSlugsFromSections(sidebarConfig.ui);

// Consolidated search helper
function findPageInfoInSections(
  sections: SidebarConfigSection[],
  slug: string,
): { sectionTitle: string; pageTitle: string } | null {
  function search(
    items: SidebarConfigItem[],
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
        const result = search(item.items, sectionTitle);
        if (result) return result;
      }
    }
    return null;
  }

  for (const section of sections) {
    const result = search(section.items, section.title);
    if (result) return result;
  }
  return null;
}

export function findCurrentPageInfo(pathname: string) {
  const slug = pathname.replace(/^\/docs\//, "");
  return findPageInfoInSections(sidebarConfig.docs, slug);
}

export function findCurrentUIPageInfo(pathname: string) {
  let slug = pathname.replace(/^\/ui\/components\//, "");
  slug = slug.replace(/^\/ui\//, "").replace(/\/$/, "");
  return findPageInfoInSections(sidebarConfig.ui, slug);
}

export function findCurrentUIItemBySlug(
  pathname: string,
): SidebarConfigItemBase | null {
  let slug = pathname.replace(/^\/ui\/components\//, "");
  slug = slug.replace(/^\/ui\//, "").replace(/\/$/, "");

  function search(items: SidebarConfigItem[]): SidebarConfigItemBase | null {
    for (const item of items) {
      if (item.slug === slug) return item;
      if ("children" in item && Array.isArray(item.children)) {
        for (const child of item.children) {
          if (child.slug === slug) return child;
        }
      }
      if ("items" in item && Array.isArray(item.items)) {
        const result = search(item.items);
        if (result) return result;
      }
    }
    return null;
  }

  for (const section of sidebarConfig.ui) {
    const result = search(section.items);
    if (result) return result;
  }

  return null;
}

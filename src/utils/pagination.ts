import { sidebarConfig } from "@/config/sidebar";
import type { SidebarConfigItem, UISidebarConfigItem } from "./sidebar";

function flattenSidebarItems(
  items: SidebarConfigItem[],
): Array<{ slug: string; title: string }> {
  const result: Array<{ slug: string; title: string }> = [];

  for (const item of items) {
    if (item.slug) {
      result.push({ slug: item.slug, title: item.title });
    }
    if ("children" in item && Array.isArray(item.children)) {
      for (const child of item.children) {
        if (child.slug) {
          result.push({ slug: child.slug, title: child.title });
        }
      }
    }
    if ("items" in item && Array.isArray(item.items)) {
      result.push(...flattenSidebarItems(item.items));
    }
  }

  return result;
}

function flattenUISidebarItems(
  items: UISidebarConfigItem[],
): Array<{ slug: string; title: string }> {
  const result: Array<{ slug: string; title: string }> = [];

  for (const item of items) {
    if (item.slug) {
      result.push({ slug: item.slug, title: item.title });
    }
    if ("children" in item && Array.isArray(item.children)) {
      for (const child of item.children) {
        if (child.slug) {
          result.push({ slug: child.slug, title: child.title });
        }
      }
    }
    if ("items" in item && Array.isArray(item.items)) {
      result.push(...flattenUISidebarItems(item.items));
    }
  }

  return result;
}

export function getDocsNavigation(slug: string): {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
} {
  const allPages: Array<{ slug: string; title: string }> = [];

  for (const section of sidebarConfig.docs) {
    allPages.push(...flattenSidebarItems(section.items));
  }

  const currentIndex = allPages.findIndex((page) => page.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? allPages[currentIndex - 1] : null,
    next:
      currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null,
  };
}

export function getUINavigation(slug: string): {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
} {
  const allPages: Array<{ slug: string; title: string }> = [];

  for (const section of sidebarConfig.ui) {
    allPages.push(...flattenUISidebarItems(section.items));
  }

  const currentIndex = allPages.findIndex((page) => page.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? allPages[currentIndex - 1] : null,
    next:
      currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null,
  };
}

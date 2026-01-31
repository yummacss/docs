import { type SidebarConfigItem, sidebarConfig } from "./sidebar";
import { type UISidebarConfigItem, uiSidebarConfig } from "./ui-sidebar";

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

  for (const section of sidebarConfig) {
    allPages.push(...flattenSidebarItems(section.items));
  }

  // Add core-module manually
  allPages.push({ slug: "core-module", title: "Core Module" });

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

/**
 * Get navigation for UI pages - section-aware to not cross section boundaries
 * Templates section should not show prev/next from Components/Blocks sections
 */
export function getUINavigation(slug: string): {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
} {
  // Find which section the current slug belongs to
  let currentSectionPages: Array<{ slug: string; title: string }> = [];

  for (const section of uiSidebarConfig) {
    const sectionPages = flattenUISidebarItems(section.items);
    const isInSection = sectionPages.some((page) => page.slug === slug);

    if (isInSection) {
      currentSectionPages = sectionPages;
      break;
    }
  }

  // If slug not found in any section
  if (currentSectionPages.length === 0) {
    return { previous: null, next: null };
  }

  const currentIndex = currentSectionPages.findIndex(
    (page) => page.slug === slug,
  );

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? currentSectionPages[currentIndex - 1] : null,
    next:
      currentIndex < currentSectionPages.length - 1
        ? currentSectionPages[currentIndex + 1]
        : null,
  };
}

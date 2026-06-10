import { allDocs, allUis } from "content-collections";
import { sidebarConfig } from "@/config/sidebar";

function getDocTitle(slug: string): string {
  return allDocs.find((d) => d._meta.path === slug)?.title ?? slug;
}

function getUITitle(slug: string): string {
  return allUis.find((u) => u._meta.path === slug)?.title ?? slug;
}

export function getAllSlugs(): string[] {
  const slugs: string[] = [];
  for (const section of sidebarConfig.docs) {
    for (const item of section.items) {
      if (typeof item === "string") {
        slugs.push(item);
      } else {
        for (const slug of item.items) {
          slugs.push(slug);
        }
      }
    }
  }
  return slugs;
}

export function getAllUISlugs(): string[] {
  const slugs: string[] = [];
  for (const section of sidebarConfig.ui) {
    for (const item of section.items) {
      if (typeof item === "string") {
        slugs.push(item);
      }
    }
  }
  return slugs;
}

export function findCurrentPageInfo(
  pathname: string,
): { sectionTitle: string; pageTitle: string } | null {
  const slug = pathname.replace(/^\/docs\//, "");
  for (const section of sidebarConfig.docs) {
    for (const item of section.items) {
      const slugs = typeof item === "string" ? [item] : item.items;
      if (slugs.includes(slug)) {
        return { sectionTitle: section.title, pageTitle: getDocTitle(slug) };
      }
    }
  }
  return null;
}

export function findCurrentUIPageInfo(
  pathname: string,
): { sectionTitle: string; pageTitle: string } | null {
  let slug = pathname.replace(/^\/ui\/components\//, "");
  slug = slug.replace(/^\/ui\//, "").replace(/\/$/, "");
  for (const section of sidebarConfig.ui) {
    for (const item of section.items) {
      if (typeof item === "string" && item === slug) {
        return { sectionTitle: section.title, pageTitle: getUITitle(slug) };
      }
    }
  }
  return null;
}

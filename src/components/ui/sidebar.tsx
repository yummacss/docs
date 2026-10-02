import { allDocs, allUis } from "content-collections";
import { docsLinks, sidebarConfig } from "@/config/sidebar";
import type { NavSection } from "./mobile-dialog-nav";
import SidebarNav from "./sidebar-nav";

type Variant = "docs" | "ui";

interface Props {
  variant: Variant;
}

function pageFor(variant: Variant) {
  const collection = variant === "ui" ? allUis : allDocs;
  return (slug: string) => {
    const doc = collection.find((c) => c._meta.path === slug);
    return { slug, title: doc?.title ?? slug, since: doc?.badge };
  };
}

export default function Sidebar({ variant }: Props) {
  const page = pageFor(variant);

  const sections = sidebarConfig[variant].map((section) => ({
    title: section.title,
    entries: section.items.map((item) =>
      typeof item === "string"
        ? page(item)
        : { title: item.title, items: item.items.map(page) },
    ),
  }));

  return (
    <SidebarNav
      sections={sections}
      basePath={variant === "ui" ? "/ui/components" : "/docs"}
      links={variant === "docs" ? docsLinks : undefined}
    />
  );
}

/** The mobile menu's sections: built on the server so the client gets titles and badges, not the collections. */
export function menuSections(variant: Variant): NavSection[] {
  const page = pageFor(variant);
  const basePath = variant === "ui" ? "/ui/components" : "/docs";

  const sections = sidebarConfig[variant].map((section) => ({
    title: section.title,
    _key: `${variant}::${section.title}`,
    items: section.items
      .flatMap((item) => (typeof item === "string" ? item : item.items))
      .map((slug) => {
        const { title, since } = page(slug);
        return { title, href: `${basePath}/${slug}`, since };
      }),
  }));

  if (variant !== "docs") return sections;

  return [
    ...sections,
    {
      title: "Resources",
      _key: "docs::resources",
      items: docsLinks.map((link) => ({ ...link, external: true })),
    },
  ];
}

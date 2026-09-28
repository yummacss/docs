import { allDocs, allUis } from "content-collections";
import { docsLinks, sidebarConfig } from "@/config/sidebar";
import { badgeFor } from "@/utils/since";
import SidebarNav from "./sidebar-nav";

interface Props {
  variant: "docs" | "ui";
}

export default function Sidebar({ variant }: Props) {
  const config = sidebarConfig[variant];
  const collection = variant === "ui" ? allUis : allDocs;
  const basePath = variant === "ui" ? "/ui/components" : "/docs";

  const sections = config.map((section) => ({
    title: section.title,
    entries: section.items.map((item) => {
      if (typeof item === "string") {
        const doc = collection.find((c) => c._meta.path === item);
        return {
          slug: item,
          title: doc?.title ?? item,
          since: badgeFor(doc),
        };
      }
      return {
        title: item.title,
        items: item.items.map((slug) => {
          const doc = collection.find((c) => c._meta.path === slug);
          return {
            slug,
            title: doc?.title ?? slug,
            since: badgeFor(doc),
          };
        }),
      };
    }),
  }));

  return (
    <SidebarNav
      sections={sections}
      basePath={basePath}
      links={variant === "docs" ? docsLinks : undefined}
    />
  );
}

import { allDocs, allUis } from "content-collections";
import { sidebarConfig } from "@/config/sidebar";
import MobileDialogNav from "./mobile-dialog-nav";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  routeType: "docs" | "ui";
}

export default function MobileDialog({ isOpen, onClose, routeType }: Props) {
  const config = sidebarConfig[routeType];
  const baseRoute = routeType === "ui" ? "/ui/components" : "/docs";
  const collection = routeType === "ui" ? allUis : allDocs;

  function getTitle(slug: string) {
    return collection.find((c) => c._meta.path === slug)?.title ?? slug;
  }

  const topNav = {
    title: "__top-nav__",
    _key: "__top-nav__",
    items: [
      { title: "Home", href: "/" },
      { title: "Docs", href: "/docs" },
      { title: "Components", href: "/ui/installation" },
      { title: "Blog", href: "/blog" },
      {
        title: "Playground",
        href: "https://play.yummacss.com",
        external: true,
      },
    ],
  };

  const sidebarSections = config.map((section) => ({
    title: section.title,
    _key: `${routeType}::${section.title}`,
    items: section.items
      .flatMap((item) => {
        if (typeof item === "string") {
          return { title: getTitle(item), href: `${baseRoute}/${item}` };
        }
        return item.items.map((slug) => ({
          title: getTitle(slug),
          href: `${baseRoute}/${slug}`,
        }));
      })
      .filter((i) => i.href),
  }));

  return (
    <MobileDialogNav
      sections={[topNav, ...sidebarSections]}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

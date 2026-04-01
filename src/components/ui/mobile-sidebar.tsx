"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type {
  SidebarConfigItem,
  SidebarConfigSimpleItem,
} from "@/utils/sidebar";
import { sidebarConfig } from "@/utils/sidebar";
import type {
  UISidebarConfigItem,
  UISidebarConfigSimpleItem,
} from "@/utils/ui-sidebar";
import { uiSidebarConfig } from "@/utils/ui-sidebar";

function hasChildren(item: SidebarConfigItem | UISidebarConfigItem): item is (
  | SidebarConfigItem
  | UISidebarConfigItem
) & {
  children: (SidebarConfigSimpleItem | UISidebarConfigSimpleItem)[];
} {
  return "children" in item && Array.isArray(item.children);
}

function hasItems(item: SidebarConfigItem | UISidebarConfigItem): item is (
  | SidebarConfigItem
  | UISidebarConfigItem
) & {
  items: (SidebarConfigItem | UISidebarConfigItem)[];
} {
  return "items" in item && Array.isArray(item.items);
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  routeType: "docs" | "ui";
}

export default function MobileSidebar({ isOpen, onClose, routeType }: Props) {
  const pathname = usePathname();
  const baseConfig = routeType === "ui" ? uiSidebarConfig : sidebarConfig;
  const baseRoute = routeType === "ui" ? "/ui/components" : "/docs";

  const navigationItems = [
    { title: "Home", href: "/", updated: false },
    { title: "Docs", href: "/docs", updated: false },
    { title: "Components", href: "/ui/components", updated: false },
    { title: "Blog", href: "/blog", updated: false },
    {
      title: "Playground",
      href: "https://play.yummacss.com",
      external: true,
      updated: false,
    },
  ];

  const config = [
    {
      title: "Navigation",
      items: navigationItems.map((item) => ({
        title: item.title,
        slug: item.href.startsWith("http")
          ? item.href
          : item.href.replace(/^\/(docs|ui)\//, "").replace(/^\/$/, "home"),
        href: item.href,
        external: item.external,
      })),
    },
    ...baseConfig,
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          className="p-f t-12 l-0 zi-20 w-full bc-white/10 btw-1 bs-o-md lg:d-none"
          style={{
            backgroundColor: "#151724",
            height: "calc(100vh - 3rem)",
          }}
        >
          <div className="d-f p-r fd-c h-full">
            <div className="o-y-auto f-1 pb-8 pt-6">
              <div
                className="mx-auto px-6"
                style={{ maxWidth: "clamp(40rem, 80vw, 96rem)" }}
              >
                <div className="d-f fd-c g-8">
                  {config.map((section) => (
                    <div key={section.title} className="d-f fd-c g-3">
                      <h3 className="c-silver-8 fs-xs fw-600 ls-2 tt-u">
                        {section.title}
                      </h3>
                      <ul className="d-f fd-c g-2">
                        {section.items.map((item) => {
                          // item with children (nested structure)
                          if (hasChildren(item)) {
                            return (
                              <li key={item.title} className="d-f fd-c g-2">
                                <span className="c-silver-9 fs-lg">
                                  {item.title}
                                </span>
                                <ul className="d-f fd-c g-1">
                                  {(item.children as any[]).map((child) => {
                                    const isNavigation =
                                      section.title === "Navigation" ||
                                      section.title === "Menu";
                                    const href = isNavigation
                                      ? (child as any).href
                                      : `${baseRoute}/${child.slug}`;
                                    const isActive = pathname === href;

                                    return (
                                      <li key={child.slug}>
                                        <Link
                                          href={href}
                                          onClick={onClose}
                                          className={`d-if ai-c g-3 fs-lg us-none fv:oc-white fv:oo-2 fv:ow-2 fv:os-s ${isActive ? "c-white" : "c-white/70 h:c-white"}`}
                                          target={
                                            (child as any).external
                                              ? "_blank"
                                              : undefined
                                          }
                                        >
                                          {child.title}
                                          {child.updated && (
                                            <span className="w-2 h-2 bg-white br-pill" />
                                          )}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </li>
                            );
                          }

                          // item with items (recursive structure)
                          if (hasItems(item)) {
                            return (
                              <li key={item.title} className="d-f fd-c g-2">
                                <span className="c-silver-9 fs-lg">
                                  {item.title}
                                </span>
                                <ul className="d-f fd-c g-1">
                                  {(
                                    item.items as (
                                      | SidebarConfigItem
                                      | UISidebarConfigItem
                                    )[]
                                  ).map((subItem) => {
                                    if (hasChildren(subItem)) {
                                      return (
                                        <li
                                          key={subItem.title}
                                          className="d-f fd-c g-2"
                                        >
                                          <span className="c-silver-10 fs-lg">
                                            {subItem.title}
                                          </span>
                                          <ul className="d-f fd-c g-1 ml-4">
                                            {(
                                              subItem.children as (
                                                | SidebarConfigSimpleItem
                                                | UISidebarConfigSimpleItem
                                              )[]
                                            ).map((child) => {
                                              const href = `${baseRoute}/${child.slug}`;
                                              const isActive =
                                                pathname === href;

                                              return (
                                                <li key={child.slug}>
                                                  <Link
                                                    href={`${baseRoute}/${child.slug}`}
                                                    onClick={onClose}
                                                    className={`d-if ai-c g-3 fs-lg us-none fv:oc-white fv:oo-2 fv:ow-2 fv:os-s ${isActive ? "c-white" : "c-white/70 h:c-white"}`}
                                                  >
                                                    {child.title}
                                                    {(child as any).updated && (
                                                      <span className="w-2 h-2 bg-white br-pill" />
                                                    )}
                                                  </Link>
                                                </li>
                                              );
                                            })}
                                          </ul>
                                        </li>
                                      );
                                    }

                                    if (subItem.slug) {
                                      const href = `${baseRoute}/${subItem.slug}`;
                                      const isActive = pathname === href;

                                      return (
                                        <li key={subItem.slug}>
                                          <Link
                                            href={`${baseRoute}/${subItem.slug}`}
                                            onClick={onClose}
                                            className={`d-if ai-c g-3 fs-lg us-none fv:oc-white fv:oo-2 fv:ow-2 fv:os-s ${isActive ? "c-white" : "c-white/70 h:c-white"}`}
                                          >
                                            {subItem.title}
                                            {(subItem as any).updated && (
                                              <span className="w-2 h-2 bg-white br-pill" />
                                            )}
                                          </Link>
                                        </li>
                                      );
                                    }

                                    return null;
                                  })}
                                </ul>
                              </li>
                            );
                          }

                          // simple item with slug
                          if (item.slug) {
                            const isNavigation =
                              section.title === "Navigation" ||
                              section.title === "Menu";
                            const href = isNavigation
                              ? (item as any).href
                              : `${baseRoute}/${item.slug}`;
                            const isActive = pathname === href;

                            return (
                              <li key={item.slug}>
                                <Link
                                  href={href}
                                  onClick={onClose}
                                  className={`d-if ai-c g-3 fs-lg us-none fv:oc-white fv:oo-2 fv:ow-2 fv:os-s ${isActive ? "c-white" : "c-white/70 h:c-white"}`}
                                  target={
                                    (item as any).external
                                      ? "_blank"
                                      : undefined
                                  }
                                >
                                  {item.title}
                                  {(item as any).updated && (
                                    <span className="w-2 h-2 bg-white br-pill" />
                                  )}
                                </Link>
                              </li>
                            );
                          }

                          return null;
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

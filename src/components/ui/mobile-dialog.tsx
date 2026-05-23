"use client";

import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarConfig } from "@/config/sidebar";
import type { SidebarConfigItem, UISidebarConfigItem } from "@/utils/sidebar";

type AnyItem = SidebarConfigItem | UISidebarConfigItem;

interface NavItem {
  title: string;
  href: string;
  external?: boolean;
  updated?: boolean;
}

interface NavSection {
  title: string;
  _key?: string;
  items: NavItem[];
}

function flattenItems(items: AnyItem[], baseRoute: string): NavItem[] {
  const result: NavItem[] = [];

  for (const item of items) {
    if ("children" in item && Array.isArray(item.children)) {
      result.push(...flattenItems(item.children, baseRoute));
    } else if ("items" in item && Array.isArray(item.items)) {
      result.push(...flattenItems(item.items, baseRoute));
    } else if (item.slug) {
      result.push({
        title: item.title,
        href: `${baseRoute}/${item.slug}`,
        updated: (item as { updated?: boolean }).updated,
      });
    }
  }

  return result;
}

function buildNavSections(routeType: "docs" | "ui"): NavSection[] {
  const config = sidebarConfig[routeType];
  const baseRoute = routeType === "ui" ? "/ui/components" : "/docs";

  const topNav: NavSection = {
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

  const sidebarSections: NavSection[] = config
    .map((section) => ({
      title: section.title,
      _key: `${routeType}::${section.title}`,
      items: flattenItems(section.items, baseRoute).filter((i) => i.href),
    }))
    .filter((s) => s.items.length > 0);

  return [topNav, ...sidebarSections];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  routeType: "docs" | "ui";
}

export default function MobileDialog({ isOpen, onClose, routeType }: Props) {
  const pathname = usePathname();
  const sections = buildNavSections(routeType);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal keepMounted>
            <Dialog.Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                />
              }
              className="p-f zi-10 t-0 l-0 r-0 b-0 bg-black/60 bf-b-sm fgr-90"
            />

            <div className="d-f p-f zi-10 t-0 l-0 r-0 b-0 ai-s jc-fe pe-none lg:d-none">
              <Dialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="o-h w-100% max-w-xs h-dvh bc-border bg-page blw-1 pe-auto"
              >
                <div className="d-f ai-c jc-sb px-4 py-3 bc-border bbw-1">
                  <Dialog.Title className="c-white fs-md fw-600">
                    Menu
                  </Dialog.Title>
                  <Dialog.Close
                    aria-label="Close menu"
                    className="d-f ai-c jc-c w-9 h-9 bc-border bg-surface h:bg-surface-8 c-white bw-1 fv:oc-white fv:oo-2"
                  >
                    <XIcon />
                  </Dialog.Close>
                </div>

                <div
                  className="d-f oy-auto fd-c g-8 px-4 py-4"
                  style={{ height: "calc(100dvh - 60px)" }}
                >
                  {sections.map((section) => {
                    const isTopNav = section.title === "__top-nav__";
                    const displayTitle = isTopNav ? "Navigation" : section.title;
                    const reactKey = section._key ?? section.title;

                    return (
                      <div key={reactKey} className="d-f fd-c g-3">
                        <h3 className="c-silver-8 fs-xs fw-600 ls-2 tt-u">
                          {displayTitle}
                        </h3>

                        <ul className="d-f fd-c g-1">
                          {section.items.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                              <li key={item.href}>
                                <Dialog.Close
                                  nativeButton={false}
                                  render={
                                    <Link
                                      href={item.href}
                                      target={
                                        item.external ? "_blank" : undefined
                                      }
                                      rel={
                                        item.external
                                          ? "noopener noreferrer"
                                          : undefined
                                      }
                                    />
                                  }
                                  className={[
                                    "d-if ai-c g-3 w-100% py-2 px-3 fs-md us-none",
                                    "fv:oc-white fv:oo-2 fv:ow-2",
                                    isActive
                                      ? "c-white bg-border"
                                      : "c-white/70 h:c-white h:bg-white/5",
                                  ].join(" ")}
                                >
                                  {item.title}
                                  {item.updated && (
                                    <span className="w-2 h-2 ml-auto bg-accent" />
                                  )}
                                </Dialog.Close>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

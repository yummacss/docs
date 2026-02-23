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
import SidebarLinks from "./sidebar-links";

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
  const fullConfig = routeType === "ui" ? uiSidebarConfig : sidebarConfig;
  const baseRoute = routeType === "ui" ? "/ui" : "/docs";

  // Filter sections based on route
  const isTemplatesRoute = pathname?.startsWith("/ui/templates");
  const isComponentsRoute =
    routeType === "ui" &&
    !isTemplatesRoute &&
    !pathname?.startsWith("/ui/license") &&
    !pathname?.startsWith("/ui/privacy") &&
    !pathname?.startsWith("/ui/terms");

  let config = fullConfig;
  if (isTemplatesRoute) {
    // Templates routes: only show Templates section
    config = fullConfig.filter((section) => section.title === "Templates");
  } else if (isComponentsRoute) {
    // Components routes: exclude Templates and Legal sections
    config = fullConfig.filter(
      (section) => section.title !== "Templates" && section.title !== "Legal",
    );
  }

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
              <div className="mx-auto px-6 sm-xxl">
                <div className="d-f fd-c g-8">
                  <SidebarLinks onLinkClick={onClose} />

                  {config.map((section) => (
                    <div key={section.title} className="d-f fd-c g-4">
                      <h3 className="c-white fs-md fw-400 tt-c ls-5">
                        {section.title}
                      </h3>
                      <ul className="d-f fd-c g-2">
                        {section.items.map((item) => {
                          // item with children (nested structure)
                          if (hasChildren(item)) {
                            return (
                              <li key={item.title} className="d-f fd-c g-2">
                                <span className="c-white/50 fs-md">
                                  {item.title}
                                </span>
                                <ul className="d-f fd-c g-1 ml-4">
                                  {(
                                    item.children as (
                                      | SidebarConfigSimpleItem
                                      | UISidebarConfigSimpleItem
                                    )[]
                                  ).map((child) => {
                                    const href = `${baseRoute}/${child.slug}`;
                                    const isActive = pathname === href;

                                    return (
                                      <li key={child.slug}>
                                        <Link
                                          href={href}
                                          onClick={onClose}
                                          className={`d-if ai-c g-3 fs-md us-none fv:oc-white fv:oo-2 fv:ow-2 fv:os-s ${isActive ? "c-white" : "c-white/70 h:c-white"}`}
                                        >
                                          {child.title}
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
                                <span className="c-white/50 fs-md">
                                  {item.title}
                                </span>
                                <ul className="d-f fd-c g-1 ml-4">
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
                                          <span className="c-white/40 fs-md">
                                            {subItem.title}
                                          </span>
                                          <ul className="d-f fd-c g-1">
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
                                                    href={href}
                                                    onClick={onClose}
                                                    className={`d-if ai-c g-3 fs-md us-none fv:oc-white fv:oo-2 fv:ow-2 fv:os-s ${isActive ? "c-white" : "c-white/70 h:c-white"}`}
                                                  >
                                                    {child.title}
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
                                            href={href}
                                            onClick={onClose}
                                            className={`d-if ai-c g-3 fs-md us-none fv:oc-white fv:oo-2 fv:ow-2 fv:os-s ${isActive ? "c-white" : "c-white/70 h:c-white"}`}
                                          >
                                            {subItem.title}
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
                            const href = `${baseRoute}/${item.slug}`;
                            const isActive = pathname === href;

                            return (
                              <li key={item.slug}>
                                <Link
                                  href={href}
                                  onClick={onClose}
                                  className={`d-if ai-c g-3 us-none fv:oc-white fv:oo-2 fv:ow-2 fv:os-s ${isActive ? "c-white" : "c-white/70 h:c-white"}`}
                                >
                                  {item.title}
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type {
  UISidebarConfigItem,
  UISidebarConfigSimpleItem,
} from "@/utils/ui-sidebar";
import { uiSidebarConfig } from "@/utils/ui-sidebar";
import SidebarLinks from "./sidebar-links";

function hasChildren(
  item: UISidebarConfigItem,
): item is UISidebarConfigItem & { children: UISidebarConfigSimpleItem[] } {
  return "children" in item && Array.isArray(item.children);
}

function hasItems(
  item: UISidebarConfigItem,
): item is UISidebarConfigItem & { items: UISidebarConfigItem[] } {
  return "items" in item && Array.isArray(item.items);
}

export default function UISidebar() {
  const pathname = usePathname();

  // Determine if we're on a templates-related page
  const isTemplatesPage =
    pathname?.startsWith("/ui/templates") ||
    pathname === "/ui/license" ||
    pathname === "/ui/privacy" ||
    pathname === "/ui/terms";

  // Filter out Templates and Legal sections when on component pages
  const filteredConfig = isTemplatesPage
    ? uiSidebarConfig
    : uiSidebarConfig.filter(
        (section) => section.title !== "Templates" && section.title !== "Legal",
      );

  return (
    <aside className="d-none lg:d-b lg:gc-s-3">
      <div
        className="d-f p-st t-20 o-y-auto fd-c g-8 pb-12"
        style={{
          maxHeight: "calc(100vh - 3rem)",
        }}
      >
        <SidebarLinks />

        {filteredConfig.map((section) => (
          <div key={section.title} className="d-f fd-c g-4">
            <h3 className="c-white fs-md fw-400 tt-c ls-5">{section.title}</h3>
            <ul className="d-f fd-c g-2">
              {section.items.map((item) => {
                // item with children (nested structure)
                if (hasChildren(item)) {
                  return (
                    <li key={item.title} className="d-f fd-c g-2">
                      <span className="c-white/50 fs-md">{item.title}</span>
                      <ul className="d-f fd-c g-1 ml-4">
                        {item.children.map((child) => {
                          const href = `/ui/${child.slug}`;
                          const isActive = pathname === href;

                          return (
                            <li key={child.slug}>
                              <Link
                                href={href}
                                className={`d-if ai-c g-3 fs-md us-none fv:oc-white fv:oo-2 fv:ow-2 ${
                                  isActive ? "c-white" : "c-white/70 h:c-white"
                                }`}
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
                      <span className="c-white/50 fs-md">{item.title}</span>
                      <ul className="d-f fd-c g-1 ml-4">
                        {item.items.map((subItem) => {
                          if (hasChildren(subItem)) {
                            return (
                              <li key={subItem.title} className="d-f fd-c g-2">
                                <span className="c-white/40 fs-md">
                                  {subItem.title}
                                </span>
                                <ul className="d-f fd-c g-1 ml-4">
                                  {subItem.children.map((child) => {
                                    const href = `/ui/${child.slug}`;
                                    const isActive = pathname === href;

                                    return (
                                      <li key={child.slug}>
                                        <Link
                                          href={href}
                                          className={`d-if ai-c g-3 fs-md us-none fv:oc-white fv:oo-2 fv:ow-2 ${
                                            isActive
                                              ? "c-white"
                                              : "c-white/70 h:c-white"
                                          }`}
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
                            const href = `/ui/${subItem.slug}`;
                            const isActive = pathname === href;

                            return (
                              <li key={subItem.slug}>
                                <Link
                                  href={href}
                                  className={`d-if ai-c g-3 fs-md us-none fv:oc-white fv:oo-2 fv:ow-2 ${
                                    isActive
                                      ? "c-white"
                                      : "c-white/70 h:c-white"
                                  }`}
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
                  const href = `/ui/${item.slug}`;
                  const isActive = pathname === href;

                  return (
                    <li key={item.slug}>
                      <Link
                        href={href}
                        className={`d-if ai-c g-3 us-none fv:oc-white fv:oo-2 fv:ow-2 ${
                          isActive ? "c-white" : "c-white/70 h:c-white"
                        }`}
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
    </aside>
  );
}

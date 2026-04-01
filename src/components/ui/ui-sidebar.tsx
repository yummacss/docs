"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type {
  UISidebarConfigItem,
  UISidebarConfigSimpleItem,
} from "@/utils/ui-sidebar";
import { uiSidebarConfig } from "@/utils/ui-sidebar";

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

  return (
    <aside className="d-none lg:d-b lg:gc-s-3">
      <div
        className="d-f p-st t-20 o-y-auto fd-c g-8 pb-12"
        style={{
          maxHeight: "calc(100vh - 5rem)",
        }}
      >
        {uiSidebarConfig.map((section) => (
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
                      <span className="c-silver-9 fs-sm">{item.title}</span>
                      <ul className="d-f fd-c g-1">
                        {item.children.map((child) => {
                          const href = `/ui/components/${child.slug}`;
                          const isActive = pathname === href;

                          return (
                            <li key={child.slug}>
                              <Link
                                href={href}
                                className={`d-if ai-c g-3 fs-sm us-none fv:oc-white fv:oo-2 fv:ow-2 fv:os-s ${isActive ? "c-white" : "c-white/70 h:c-white"}`}
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
                      <span className="c-silver-9 fs-sm">{item.title}</span>
                      <ul className="d-f fd-c g-1">
                        {item.items.map((subItem) => {
                          if (hasChildren(subItem)) {
                            return (
                              <li key={subItem.title} className="d-f fd-c g-2">
                                <span className="c-silver-10 fs-sm">
                                  {subItem.title}
                                </span>
                                <ul className="d-f fd-c g-1 ml-4">
                                  {subItem.children.map((child) => {
                                    const href = `/ui/components/${child.slug}`;
                                    const isActive = pathname === href;

                                    return (
                                      <li key={child.slug}>
                                        <Link
                                          href={href}
                                          className={`d-if ai-c g-3 fs-sm us-none fv:oc-white fv:oo-2 fv:ow-2 fv:os-s ${isActive ? "c-white" : "c-white/70 h:c-white"}`}
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

                          if (subItem.slug) {
                            const href = `/ui/components/${subItem.slug}`;
                            const isActive = pathname === href;

                            return (
                              <li key={subItem.slug}>
                                <Link
                                  href={href}
                                  className={`d-if ai-c g-3 fs-sm us-none fv:oc-white fv:oo-2 fv:ow-2 fv:os-s ${isActive ? "c-white" : "c-white/70 h:c-white"}`}
                                >
                                  {subItem.title}
                                  {subItem.updated && (
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
                  const href = `/ui/components/${item.slug}`;
                  const isActive = pathname === href;

                  return (
                    <li key={item.slug}>
                      <Link
                        href={href}
                        className={`d-if ai-c g-3 fs-sm us-none fv:oc-white fv:oo-2 fv:ow-2 fv:os-s ${isActive ? "c-white" : "c-white/70 h:c-white"}`}
                      >
                        {item.title}
                        {item.updated && (
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
    </aside>
  );
}

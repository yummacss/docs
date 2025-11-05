"use client";

import type {
  SidebarConfigItem,
  SidebarConfigSimpleItem,
} from "@/utils/sidebar";
import { sidebarConfig } from "@/utils/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarLinks from "./sidebar-links";

function hasChildren(
  item: SidebarConfigItem,
): item is SidebarConfigItem & { children: SidebarConfigSimpleItem[] } {
  return "children" in item && Array.isArray(item.children);
}

function hasItems(
  item: SidebarConfigItem,
): item is SidebarConfigItem & { items: SidebarConfigItem[] } {
  return "items" in item && Array.isArray(item.items);
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="d-none lg:d-b lg:gc-s-3">
      <div
        className="p-st d-f fd-c g-8 o-y-auto pt-8"
        style={{
          top: "6rem",
          maxHeight: "calc(100vh - 6rem)",
        }}
      >
        <SidebarLinks />

        {sidebarConfig.map((section) => (
          <div key={section.title} className="d-f fd-c g-4">
            <h3 className="fs-md fw-400 tt-c ls-5">{section.title}</h3>
            <ul className="d-f ml-4 fd-c g-2">
              {section.items.map((item) => {
                // item with children (nested structure)
                if (hasChildren(item)) {
                  return (
                    <li key={item.title} className="d-f fd-c g-2">
                      <span className="fs-md tc-white/50">{item.title}</span>
                      <ul className="d-f ml-4 fd-c g-1">
                        {item.children.map((child) => {
                          const href = `/docs/${child.slug}`;
                          const isActive = pathname === href;

                          return (
                            <li key={child.slug}>
                              <Link
                                href={href}
                                className={`d-f ai-c g-3 fs-md ${isActive
                                    ? "tc-white"
                                    : "tc-white/70 h:tc-white"
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
                      <span className="fs-md tc-white/50">{item.title}</span>
                      <ul className="d-f ml-4 fd-c g-1">
                        {item.items.map((subItem) => {
                          if (hasChildren(subItem)) {
                            return (
                              <li key={subItem.title} className="d-f fd-c g-2">
                                <span className="fs-md tc-white/40">
                                  {subItem.title}
                                </span>
                                <ul className="d-f ml-4 fd-c g-1">
                                  {subItem.children.map((child) => {
                                    const href = `/docs/${child.slug}`;
                                    const isActive = pathname === href;

                                    return (
                                      <li key={child.slug}>
                                        <Link
                                          href={href}
                                          className={`d-f ai-c g-3 fs-md ${isActive
                                              ? "tc-white"
                                              : "tc-white/70 h:tc-white"
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
                            const href = `/docs/${subItem.slug}`;
                            const isActive = pathname === href;

                            return (
                              <li key={subItem.slug}>
                                <Link
                                  href={href}
                                  className={`d-f ai-c g-3 fs-md ${isActive
                                      ? "tc-white"
                                      : "tc-white/70 h:tc-white"
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
                  const href = `/docs/${item.slug}`;
                  const isActive = pathname === href;

                  return (
                    <li key={item.slug}>
                      <Link
                        href={href}
                        className={`d-f ai-c g-3 ${isActive ? "tc-white" : "tc-white/70 h:tc-white"
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

"use client";

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

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  routeType: "docs" | "ui";
}

export default function MobileSidebar({
  isOpen,
  onClose,
  routeType,
}: MobileSidebarProps) {
  const pathname = usePathname();
  const config = routeType === "ui" ? uiSidebarConfig : sidebarConfig;
  const baseRoute = routeType === "ui" ? "/ui" : "/docs";

  if (!isOpen) return null;

  return (
    <div
      className="p-f t-0 l-0 w-full zi-20 lg:d-none bt-1 bc-white/5"
      style={{
        backgroundColor: "#151724",
        top: "104px", // below navbar (56px) + breadcrumb (~48px)
        height: "calc(100vh - 104px)",
      }}
    >
      <div className="p-r h-full d-f fd-c">
        <div className="f-1 o-y-auto px-6 pb-8 pt-6">
          <div className="d-f fd-c g-8">
            <SidebarLinks onLinkClick={onClose} />

            {config.map((section) => (
              <div key={section.title} className="d-f fd-c g-4">
                <h3 className="fs-md fw-400 tt-c ls-5 tc-white">
                  {section.title}
                </h3>
                <ul className="d-f ml-4 fd-c g-2">
                  {section.items.map((item) => {
                    // item with children (nested structure)
                    if (hasChildren(item)) {
                      return (
                        <li key={item.title} className="d-f fd-c g-2">
                          <span className="fs-md tc-white/50">
                            {item.title}
                          </span>
                          <ul className="d-f ml-4 fd-c g-1">
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
                                    className={`d-f ai-c g-3 fs-md ${isActive ? "tc-white" : "tc-white/70 h:tc-white"}`}
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
                          <span className="fs-md tc-white/50">
                            {item.title}
                          </span>
                          <ul className="d-f ml-4 fd-c g-1">
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
                                    <span className="fs-md tc-white/40">
                                      {subItem.title}
                                    </span>
                                    <ul className="d-f ml-4 fd-c g-1">
                                      {(
                                        subItem.children as (
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
                                              className={`d-f ai-c g-3 fs-md ${isActive ? "tc-white" : "tc-white/70 h:tc-white"}`}
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
                                      className={`d-f ai-c g-3 fs-md ${isActive ? "tc-white" : "tc-white/70 h:tc-white"}`}
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
                            className={`d-f ai-c g-3 ${isActive ? "tc-white" : "tc-white/70 h:tc-white"}`}
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
  );
}

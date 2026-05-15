"use client";

import { Drawer } from "@base-ui/react/drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SidebarConfigItem } from "@/utils/sidebar";
import { sidebarConfig } from "@/utils/sidebar";
import type { UISidebarConfigItem } from "@/utils/ui-sidebar";
import { uiSidebarConfig } from "@/utils/ui-sidebar";

// ─── Types ────────────────────────────────────────────────────────────────────

type AnyItem = SidebarConfigItem | UISidebarConfigItem;

interface NavItem {
  title: string;
  href: string;
  external?: boolean;
  updated?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

// ─── Flatten sidebar config into flat NavSection[] ────────────────────────────

function flattenItems(items: AnyItem[], baseRoute: string): NavItem[] {
  const result: NavItem[] = [];

  for (const item of items) {
    if ("children" in item && Array.isArray(item.children)) {
      // Group header with children — flatten children directly
      result.push(...flattenItems(item.children, baseRoute));
    } else if ("items" in item && Array.isArray(item.items)) {
      // Recursive section — flatten items
      result.push(...flattenItems(item.items, baseRoute));
    } else if (item.slug) {
      result.push({
        title: item.title,
        href: `${baseRoute}/${item.slug}`,
        updated: (item as any).updated,
      });
    }
  }

  return result;
}

function buildNavSections(routeType: "docs" | "ui"): NavSection[] {
  const config = routeType === "ui" ? uiSidebarConfig : sidebarConfig;
  const baseRoute = routeType === "ui" ? "/ui/components" : "/docs";

  const topNav: NavSection = {
    title: "Navigation",
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

  const sidebarSections: NavSection[] = config.map((section) => ({
    title: section.title,
    items: flattenItems(section.items, baseRoute),
  }));

  return [topNav, ...sidebarSections];
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
  routeType: "docs" | "ui";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MobileDrawer({ isOpen, onClose, routeType }: Props) {
  const pathname = usePathname();
  const sections = buildNavSections(routeType);

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Drawer.Portal>
        {/* Backdrop */}
        <Drawer.Backdrop className="p-f i-0 zi-10 bg-black/30 lg:d-none" />

        {/* Viewport — bottom sheet sliding up */}
        <Drawer.Viewport className="d-f p-f i-0 zi-20 fd-c jc-fe lg:d-none">
          <Drawer.Popup
            className="d-f o-h fd-c bc-white/10 bg-mirage btw-1 bs-o-md"
            style={{
              maxHeight: "85dvh",
              // Swipe-to-dismiss transform
              transform: "translateY(var(--drawer-swipe-movement-y))",
              transition: "transform 350ms cubic-bezier(0.32, 0.72, 0, 1)",
              overscrollBehavior: "contain",
            }}
          >
            {/* Drag handle */}
            <div className="d-f jc-c fs-0 pt-3 pb-1">
              <div
                className="w-10 h-1 bg-white/20"
                style={{ borderRadius: 9999 }}
              />
            </div>

            {/* Scrollable content — this is where Bug 2 was: no overflow-y */}
            <Drawer.Content
              className="oy-auto f-1 pb-8"
              style={{ overscrollBehavior: "contain" }}
            >
              <div className="d-f fd-c g-8 px-6 pt-4">
                {sections.map((section) => {
                  // Skip sections with no items (e.g. wip-only sections)
                  const visibleItems = section.items.filter((i) => i.href);
                  if (visibleItems.length === 0) return null;

                  return (
                    <div key={section.title} className="d-f fd-c g-3">
                      <h3 className="c-silver-8 fs-xs fw-600 ls-2 tt-u">
                        {section.title}
                      </h3>
                      <ul className="d-f fd-c g-1">
                        {visibleItems.map((item) => {
                          const isActive = pathname === item.href;

                          return (
                            <li key={item.href}>
                              {/*
                               * Drawer.Close wraps the link so the drawer
                               * dismisses immediately on navigation — fixes Bug 2
                               * (page scroll locked after clicking a link).
                               */}
                              <Drawer.Close
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
                                  "d-if ai-c g-3 w-100% py-1 fs-lg us-none",
                                  "fv:oc-white fv:oo-2 fv:ow-2",
                                  isActive ? "c-white" : "c-white/70 h:c-white",
                                ].join(" ")}
                              >
                                {item.title}
                                {item.updated && (
                                  <span className="w-2 h-2 bg-periwinkle" />
                                )}
                              </Drawer.Close>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

"use client";

import { Drawer } from "@base-ui/react/drawer";
import { ScrollArea } from "@base-ui/react/scroll-area";
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
  _key?: string;
  items: NavItem[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
  const config = routeType === "ui" ? uiSidebarConfig : sidebarConfig;
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

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
  routeType: "docs" | "ui";
}

// ─── Close icon ───────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M0.75 0.75L6 6M11.25 11.25L6 6M6 6L0.75 11.25M6 6L11.25 0.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
        <Drawer.Backdrop
          className="p-f i-0 min-h-dvh lg:d-none"
          style={{
            opacity: `calc(1 * (1 - var(--drawer-swipe-progress, 0)))`,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.25) 50%)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            transition:
              "opacity 600ms cubic-bezier(0.45,1.005,0,1.005), backdrop-filter 600ms cubic-bezier(0.45,1.005,0,1.005)",
            zIndex: 20,
          }}
        />

        <Drawer.Viewport className="p-f i-0 lg:d-none" style={{ zIndex: 20 }}>
          {/*
           * `position: undefined` lets Drawer.Viewport control its own
           * positioning instead of being overridden by ScrollArea.Root.
           * All other styles are in the same object — no style2 needed.
           */}
          <ScrollArea.Root
            style={{
              position: undefined,
              boxSizing: "border-box",
              height: "100%",
              overscrollBehavior: "contain",
              transition: "transform 600ms cubic-bezier(0.45,1.005,0,1.005)",
            }}
          >
            <ScrollArea.Viewport
              style={{
                boxSizing: "border-box",
                height: "100%",
                overscrollBehavior: "contain",
                touchAction: "auto",
              }}
            >
              <ScrollArea.Content className="d-f fd-c ai-fe jc-fe min-h-dvh pt-8">
                <Drawer.Popup
                  className="o-h w-100%"
                  style={{
                    outline: "none",
                    transform:
                      "translateY(var(--drawer-swipe-movement-y, 0px))",
                    transition:
                      "transform 600ms cubic-bezier(0.45,1.005,0,1.005)",
                    willChange: "transform",
                  }}
                >
                  <nav
                    aria-label="Mobile navigation"
                    className="d-f p-r fd-c bc-white/10 bg-mirage btr-xxl btw-1 blw-1 brw-1"
                    style={{
                      boxShadow:
                        "0 10px 64px -10px rgba(36,40,52,0.4), 0 0.25px 0 1px rgba(255,255,255,0.06)",
                      transition:
                        "box-shadow 350ms cubic-bezier(0.375,0.015,0.545,0.455)",
                    }}
                  >
                    {/* ── Header: drag handle + close button ── */}
                    <div
                      className="d-g px-6 pt-4 pb-2"
                      style={{
                        gridTemplateColumns: "1fr auto 1fr",
                        alignItems: "center",
                      }}
                    >
                      {/* spacer mirrors close button width to keep handle centred */}
                      <div
                        aria-hidden
                        style={{ width: "2.25rem", height: "2.25rem" }}
                      />

                      {/* drag handle */}
                      <div
                        className="bg-white/20"
                        style={{
                          width: "3rem",
                          height: "0.25rem",
                          justifySelf: "center",
                        }}
                      />

                      {/*
                       * Renders a real <button> (default) — satisfies Base UI's
                       * nativeButton requirement. No console warning.
                       */}
                      <Drawer.Close
                        aria-label="Close menu"
                        className="d-f ai-c jc-c bc-white/10 bg-white/5 c-white bw-1 h:bg-white/15 fv:oc-white fv:ow-2"
                        style={{
                          width: "2.25rem",
                          height: "2.25rem",
                          justifySelf: "end",
                        }}
                      >
                        <CloseIcon />
                      </Drawer.Close>
                    </div>

                    {/* ── Nav content ── */}
                    <Drawer.Content className="d-f fd-c g-8 px-6 pt-4 pb-8">
                      {sections.map((section) => {
                        const isTopNav = section.title === "__top-nav__";
                        const displayTitle = isTopNav ? "Menu" : section.title;
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
                                    {/*
                                     * nativeButton={false} tells Base UI this
                                     * renders an <a>, not a <button> — fixes
                                     * the console warning on nav link items.
                                     */}
                                    <Drawer.Close
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
                                          ? "c-white bg-white/10"
                                          : "c-white/70 h:c-white h:bg-white/5",
                                      ].join(" ")}
                                    >
                                      {item.title}
                                      {item.updated && (
                                        <span
                                          className="w-2 h-2 bg-periwinkle"
                                          style={{ marginLeft: "auto" }}
                                        />
                                      )}
                                    </Drawer.Close>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </Drawer.Content>
                  </nav>
                </Drawer.Popup>
              </ScrollArea.Content>
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              className="p-a"
              style={{
                right: 0,
                top: 0,
                bottom: 0,
                width: "0.25rem",
                margin: "0.4rem",
                display: "flex",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 250ms",
                pointerEvents: "none",
              }}
            >
              <ScrollArea.Thumb
                className="bg-white/30"
                style={{ width: "100%" }}
              />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

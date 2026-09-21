"use client";

import { Button } from "@base-ui/react";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { lazy, type ReactNode, Suspense, useEffect, useState } from "react";
import { Menu, Search, Xmark } from "@/icons";
import { YummaCSSDark } from "../icons/yummacss-dark";
import { SearchDialog } from "./search-dialog";
import ThemeToggle from "./theme-toggle";

const MobileDialog = lazy(() => import("./mobile-dialog"));

type Variant = "default" | "transparent";

const BASE = "p:f ix:0 t:0 bbw:1";

const VARIANTS: Record<Variant, string> = {
  default: "@lg:bf-b:md bc:border",
  transparent: "bc:transparent",
};

interface NavbarProps {
  variant?: Variant;
  className?: string;
  links?: ReactNode;
  showMobileDrawer?: boolean;
}

export default function Navbar({
  variant = "default",
  className,
  links,
  showMobileDrawer = false,
}: NavbarProps) {
  const pathname = usePathname();
  const isUI = pathname?.startsWith("/ui");
  const isLandingPage = pathname === "/";
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={clsx(
          BASE,
          VARIANTS[variant],
          className,
          "zi:10",
          isLandingPage ? "bg:transparent" : "bg:page",
        )}
      >
        <div className="mx:auto px:3 py:2 docs-container">
          <nav className="d:f ai:c jc:sb">
            <div className="d:f ai:c g:8">
              <Link href="/" className="fv:oc:ink fv:ow:2">
                <YummaCSSDark className="d:b h:8 w:auto c:ink" />
              </Link>

              {links ? (
                links
              ) : (
                <div className="d:none ai:c g:8 @lg:d:f">
                  {[
                    { href: "/docs", label: "Docs", prefix: "/docs" },
                    { href: "/blog", label: "Blog", prefix: "/blog" },
                    {
                      href: "/ui/installation",
                      label: "Components",
                      prefix: "/ui",
                    },
                    {
                      href: "https://play.yummacss.com",
                      label: "Playground",
                      external: true,
                    },
                  ].map((link) => {
                    const isActive = link.prefix
                      ? pathname.startsWith(link.prefix)
                      : pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className={`fs:sm fv:oc:ink fv:ow:2 ${
                          isActive
                            ? "c:accent td:u tds:d"
                            : "c:ink/70 h:c:accent"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="d:f ai:c g:2 @sm:g:4">
              <ThemeToggle />

              <Button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="d:f ai:c jc:c g:2 h:8 px:3 bc:border bg:surface a:bg:surface-7 c:ink bw:1 fs:sm bf-b:sm @lg:px:4 fv:oc:ink fv:ow:2"
              >
                <Search className="w:4 h:4" />
                <kbd className="d:none c:ink/70 fs:xs us:none @lg:d:b">
                  Ctrl + K
                </kbd>
              </Button>

              {showMobileDrawer && (
                <Button
                  type="button"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="d:f p:r ai:c jc:c h:8 px:3 bc:border bg:surface h:bg:surface-8 c:ink bw:1 bf-b:sm @lg:d:none fv:oc:ink fv:ow:2"
                  aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                >
                  <div className="d:f p:r ai:c jc:c w:4 h:4">
                    <Menu
                      className={`p:a w:4 h:4 ${isSidebarOpen ? "o:0" : "o:100"}`}
                    />
                    <Xmark
                      className={`p:a w:4 h:4 ${isSidebarOpen ? "o:100" : "o:0"}`}
                    />
                  </div>
                </Button>
              )}
            </div>
          </nav>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {showMobileDrawer && (
        <Suspense fallback={null}>
          <MobileDialog
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            routeType={isUI ? "ui" : "docs"}
          />
        </Suspense>
      )}
    </>
  );
}

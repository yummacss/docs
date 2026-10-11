"use client";

import { Button } from "@base-ui/react";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { lazy, Suspense, useEffect, useState } from "react";
import { Search } from "@/icons";
import { loadSearchIndex } from "@/utils/search-data";
import HomeMark from "./home-mark";
import type { Menus } from "./mobile-sheet";
import { SearchDialog } from "./search-dialog";

const preloadSearch = () => {
  loadSearchIndex().catch(() => {});
};

const MobileSheet = lazy(() => import("./mobile-sheet"));

type Variant = "default" | "transparent";

// below @lg the page runs up to the navbar with no line between
const BASE = "p:f ix:0 t:0 @lg:bbw:1";

const VARIANTS: Record<Variant, string> = {
  default: "@lg:bf-b:md bc:border",
  transparent: "bc:transparent",
};

interface NavbarProps {
  variant?: Variant;
  className?: string;
  /** The phone menu's sections, built on the server; without them there is no menu button. */
  menu?: Menus;
}

export default function Navbar({
  variant = "default",
  className,
  menu,
}: NavbarProps) {
  const pathname = usePathname();
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
        <div className="mx:auto px:6 py:2 max-w:clamp(40rem,80vw,96rem)">
          <nav className="d:f ai:c jc:sb">
            <HomeMark className="d:b h:8 w:auto" />

            <div className="d:f ai:c g:2 @sm:g:4">
              <Button
                type="button"
                onClick={() => setSearchOpen(true)}
                onPointerEnter={preloadSearch}
                onFocus={preloadSearch}
                aria-label="Search"
                className="d:none ai:c jc:c g:2 h:8 px:4 bc:border bg:surface a:bg:press c:ink bw:1 fs:sm bf-b:sm @lg:d:f fv:oc:ink fv:ow:2"
              >
                <Search className="w:4 h:4" />
                <kbd className="c:ink/70 fs:xs us:none">Ctrl + K</kbd>
              </Button>

              {menu && (
                <Button
                  type="button"
                  onClick={() => setIsSidebarOpen(true)}
                  aria-expanded={isSidebarOpen}
                  className="d:if ai:c g:2 h:8 px:2 bg:transparent bw:0 c:ink/80 fs:sm us:none h:bg:surface a:bg:hover @lg:d:none fv:oc:ink fv:ow:2"
                >
                  <Search className="fs:0 w:4 h:4" />
                  Navigation
                </Button>
              )}
            </div>
          </nav>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {menu && (
        <Suspense fallback={null}>
          <MobileSheet
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            menus={menu}
          />
        </Suspense>
      )}
    </>
  );
}

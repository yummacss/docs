"use client";

import { Button } from "@base-ui/react";
import { Bars, Magnifier, Xmark } from "@gravity-ui/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { lazy, type ReactNode, Suspense, useEffect, useState } from "react";
import { SiGithub, SiNpm } from "react-icons/si";
import pkg from "../../../package.json";
import { YummaCSSDark } from "../icons/yummacss-dark";
import { SearchDialog } from "./search-dialog";

const MobileSidebar = lazy(() => import("./mobile-sidebar"));

const navbarVariants = cva("p-f l-0 r-0 t-0 zi-10 bbw-1", {
  variants: {
    variant: {
      default: "lg:bf-b-md bc-white/10",
      transparent: "bc-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface NavbarProps extends VariantProps<typeof navbarVariants> {
  className?: string;
  links?: ReactNode;
  showMobileSidebar?: boolean;
}

export default function Navbar({
  variant,
  className,
  links,
  showMobileSidebar = false,
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

  // prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <>
      <header
        className={clsx(navbarVariants({ variant }), className)}
        style={{ backgroundColor: isLandingPage ? "transparent" : "#151724" }}
      >
        <div
          className="mx-auto px-3 py-2"
          style={{ maxWidth: "clamp(40rem, 80vw, 96rem)" }}
        >
          <nav className="d-f ai-c jc-sb">
            <div className="d-f ai-c g-2">
              <Link
                href={isUI ? "/ui/components" : "/"}
                className="fv:oc-white fv:ow-2"
              >
                <YummaCSSDark className="d-b h-8 w-auto" />
              </Link>
            </div>
            <div className="d-f ai-c g-4">
              {links ? (
                links
              ) : (
                <div className="d-none ai-c g-8 lg:d-f">
                  <Link
                    href="/docs"
                    className="c-white/80 fs-sm h:c-white fv:oc-white fv:ow-2"
                  >
                    Docs
                  </Link>
                  <Link
                    href="/blog"
                    className="c-white/80 fs-sm h:c-white fv:oc-white fv:ow-2"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/ui/components"
                    className="c-white/80 fs-sm h:c-white fv:oc-white fv:ow-2"
                  >
                    Components
                  </Link>
                  <Link
                    href="https://play.yummacss.com"
                    className="c-white/80 fs-sm h:c-white fv:oc-white fv:ow-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Playground
                  </Link>
                </div>
              )}

              <Button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="d-f ai-c jc-c g-2 h-8 px-3 bc-white/10 bg-white/5 c-white bw-1 br-pill fs-sm bf-b-sm lg:px-4 h:bg-white/10 fv:oc-white fv:ow-2"
              >
                <Magnifier className="w-4 h-4" />
                <kbd className="d-none c-white/60 fs-xs us-none lg:d-b">
                  Search documentation…
                </kbd>
              </Button>

              <div className="d-none ai-c g-4 ml-2 md:d-f">
                <Link
                  href="https://npmx.dev/package/yummacss"
                  className="d-f c-white/80 ai-c g-1 fs-xs h:c-white fv:oc-white fv:ow-2"
                  target="_blank"
                >
                  <SiNpm className="w-4 h-4" />
                  <span className="tw-b">
                    v{pkg.devDependencies.yummacss.replace("^", "")}
                  </span>
                </Link>
                <Link
                  href="https://github.com/yummacss/yummacss"
                  className="d-f c-white/80 ai-c g-1 fs-xs h:c-white fv:oc-white fv:ow-2"
                  target="_blank"
                >
                  <SiGithub className="w-4 h-4" />
                  <span>GitHub</span>
                </Link>
              </div>

              {showMobileSidebar && (
                <Button
                  type="button"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="d-f p-r ai-c jc-c h-8 px-3 bc-white/10 bg-white/5 c-white bw-1 br-pill bf-b-sm lg:d-none h:bg-white/10 fv:oc-white fv:ow-2"
                  aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                >
                  <div className="d-f p-r ai-c jc-c w-4 h-4">
                    <Bars
                      className="p-a w-4 h-4"
                      style={{
                        opacity: isSidebarOpen ? 0 : 1,
                        transform: isSidebarOpen
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                        transition:
                          "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
                      }}
                    />
                    <Xmark
                      className="p-a w-4 h-4"
                      style={{
                        opacity: isSidebarOpen ? 1 : 0,
                        transform: isSidebarOpen
                          ? "rotate(0deg)"
                          : "rotate(-90deg)",
                        transition:
                          "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
                      }}
                    />
                  </div>
                </Button>
              )}
            </div>
          </nav>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {showMobileSidebar && (
        <Suspense fallback={null}>
          <MobileSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            routeType={isUI ? "ui" : "docs"}
          />
        </Suspense>
      )}
    </>
  );
}

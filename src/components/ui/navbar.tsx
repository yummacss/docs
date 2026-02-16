"use client";

import { Button } from "@base-ui/react";
import {
  EqualsIcon,
  MagnifyingGlassIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { lazy, type ReactNode, Suspense, useEffect, useState } from "react";
import { SiGithub, SiNpm } from "react-icons/si";
import pkg from "../../../package.json";
import { YummaCSSDark } from "../icons/yummacss-dark";
import { LogoContextMenu } from "./logo-context-menu";
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
  const isLandingPage = pathname === "/" || pathname === "/ui";
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
        <div className="sm-xxl mx-auto px-3 py-2">
          <nav className="d-f ai-c jc-sb">
            <div className="d-f ai-c g-2">
              <LogoContextMenu>
                <Link
                  href={isUI ? "/ui" : "/"}
                  className="fv:oc-indigo-4 fv:ow-2"
                >
                  <YummaCSSDark className="h-8 w-auto d-b" />
                </Link>
              </LogoContextMenu>
            </div>
            <div className="d-f ai-c g-4">
              {links ? (
                links
              ) : (
                <div className="d-none lg:d-f ai-c g-8">
                  <Link
                    href="/docs"
                    className="fs-sm c-white/80 h:c-white fv:oc-indigo-4 fv:ow-2"
                  >
                    Docs
                  </Link>
                  <Link
                    href="/blog"
                    className="fs-sm c-white/80 h:c-white fv:oc-indigo-4 fv:ow-2"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/ui/components"
                    className="fs-sm c-white/80 h:c-white fv:oc-indigo-4 fv:ow-2"
                  >
                    Components
                  </Link>
                  <Link
                    href="/ui/templates"
                    className="fs-sm c-white/80 h:c-white fv:oc-indigo-4 fv:ow-2"
                  >
                    Templates
                  </Link>
                </div>
              )}

              <Button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="d-f ai-c jc-c g-2 h-8 px-3 lg:px-4 bg-white/5 bf-b-sm fs-sm h:bg-white/10 c-white bw-1 bc-white/10 br-pill fv:oc-indigo-4 fv:ow-2"
              >
                <MagnifyingGlassIcon size={15} />
                <kbd className="d-none lg:d-b fs-xs c-white/60 us-none">
                  Ctrl K
                </kbd>
              </Button>

              <div className="d-none md:d-f ai-c g-4 ml-2">
                <Link
                  href="https://www.npmjs.com/package/yummacss"
                  className="d-f ai-c g-1 c-white/80 h:c-white fs-xs fv:oc-indigo-4 fv:ow-2"
                  target="_blank"
                >
                  <SiNpm className="d-4" />
                  <span className="tw-b">
                    v{pkg.devDependencies.yummacss.replace("^", "")}
                  </span>
                </Link>
                <Link
                  href="https://github.com/yummacss/yummacss"
                  className="d-f ai-c g-1 c-white/80 h:c-white fs-xs fv:oc-indigo-4 fv:ow-2"
                  target="_blank"
                >
                  <SiGithub className="d-4" />
                  <span>GitHub</span>
                </Link>
              </div>

              {showMobileSidebar && (
                <Button
                  type="button"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="d-f lg:d-none ai-c jc-c g-2 c-white/70 h:c-white"
                  aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                >
                  {isSidebarOpen ? (
                    <XIcon size={20} />
                  ) : (
                    <EqualsIcon size={20} />
                  )}
                  <span className="fs-sm">Navigation</span>
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

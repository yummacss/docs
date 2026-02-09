"use client";

import { Button } from "@base-ui/react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { YummaCSS } from "@react-symbols/icons/files";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { SiGithub, SiNpm } from "react-icons/si";
import pkg from "../../../package.json";
import { SearchDialog } from "./search-dialog";

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
}

export default function Navbar({ variant, className, links }: NavbarProps) {
  const pathname = usePathname();
  const isUI = pathname?.startsWith("/ui");
  const isLandingPage = pathname === "/" || pathname === "/ui";
  const [searchOpen, setSearchOpen] = useState(false);

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
        className={clsx(navbarVariants({ variant }), className)}
        style={{ backgroundColor: isLandingPage ? "transparent" : "#151724" }}
      >
        <div className="sm-xxl mx-auto px-6 py-2">
          <nav className="d-f ai-c jc-sb">
            <div className="d-f ai-c g-2">
              <Link
                href={isUI ? "/ui" : "/"}
                className="fv:oc-indigo-4 fv:ow-2"
              >
                <YummaCSS className="h-8 w-auto us-none" />
              </Link>
            </div>
            <div className="d-f ai-c g-8">
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
                className="d-f ai-c jc-c g-2 py-2 px-3 lg:px-4 lg:py-2 bg-white/5 bf-b-sm fs-sm h:bg-white/10 c-white bw-1 bc-white/10 br-pill fv:oc-indigo-4 fv:ow-2"
              >
                <MagnifyingGlassIcon size={15} />
                <kbd className="d-none lg:d-b fs-xs c-white/60 us-none">
                  Ctrl&nbsp;K
                </kbd>
              </Button>

              <div className="d-none md:d-f ai-c g-4 ml-2">
                <Link
                  href="https://www.npmjs.com/package/yummacss"
                  className="d-f ai-c g-1 c-white/80 h:c-white fs-xs fv:oc-indigo-4 fv:ow-2"
                  target="_blank"
                >
                  <SiNpm size={16} />
                  <span className="tw-b">v{pkg.version}</span>
                </Link>
                <Link
                  href="https://github.com/yummacss/yummacss"
                  className="d-f ai-c g-1 c-white/80 h:c-white fs-xs fv:oc-indigo-4 fv:ow-2"
                  target="_blank"
                >
                  <SiGithub size={16} />
                  <span>GitHub</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

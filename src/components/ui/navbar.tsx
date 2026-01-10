"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

const OramaSearch = dynamic(
  () => import("./orama-search").then((mod) => mod.OramaSearch),
  {
    ssr: false,
  },
);

const navbarVariants = cva("p-f l-0 r-0 t-0 zi-10 bbw-1", {
  variants: {
    variant: {
      default: "lg:bf-b-md bc-white/5",
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
        <div className="~sm-xxl mx-auto px-6 py-2">
          <nav className="d-f ai-c jc-sb">
            <div className="d-f ai-c g-2">
              <Link href={isUI ? "/ui" : "/"}>
                <Image
                  src={isUI ? "/ui-logotype.png" : "/logotype.png"}
                  width={240}
                  height={80}
                  alt="Yumma CSS"
                  className="h-10 w-auto of-c us-none"
                />
              </Link>
            </div>
            <div className="d-f ai-c g-8">
              {links ? (
                links
              ) : (
                <>
                  <Link
                    href="/docs"
                    className="d-none md:d-b fs-sm c-white/80 h:c-white"
                  >
                    Docs
                  </Link>
                  <Link
                    href="/blog"
                    className="d-none md:d-b fs-sm c-white/80 h:c-white"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/ui/introduction"
                    className="d-none md:d-b fs-sm c-white/80 h:c-white"
                  >
                    Components
                  </Link>
                  <Link
                    href="https://github.com/yumma-css/yumma-css"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-none md:d-b fs-sm c-white/80 h:c-white"
                  >
                    GitHub
                  </Link>
                </>
              )}

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="d-f ai-c g-2 md:px-4 md:py-2 bg-white/5 bf-b-sm fs-sm h:bg-white/10 c-white bw-1 bc-white/10 br-0 sm:br-0"
              >
                <MagnifyingGlassIcon size={15} weight="duotone" />
                <span className="d-none md:d-b us-none">Ctrl K</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <OramaSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

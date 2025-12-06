"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const OramaSearch = dynamic(
  () => import("./OramaSearch").then((mod) => mod.OramaSearch),
  {
    ssr: false,
  },
);

const navbarVariants = cva("p-st t-0 zi-10 bb-1", {
  variants: {
    variant: {
      default: "bf-b-md bc-white/5",
      transparent: "bc-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface NavbarProps extends VariantProps<typeof navbarVariants> {
  className?: string;
}

export default function Navbar({ variant, className }: NavbarProps) {
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
      <header className={clsx(navbarVariants({ variant }), className)}>
        <div className="~sm-xxl mx-auto px-6 py-2">
          <nav className="d-f ai-c jc-sb">
            <div className="d-f ai-c g-2">
              <Link href="/">
                <Image
                  src="/logotype.png"
                  width={240}
                  height={80}
                  alt="Yumma CSS"
                  className="h-10 w-auto of-c"
                />
              </Link>
            </div>
            <div className="d-f ai-c g-8">
              <Link
                href="/docs"
                className="d-none md:d-b fs-sm tc-white/80 h:tc-white"
              >
                Docs
              </Link>
              <Link
                href="/blog"
                className="d-none md:d-b fs-sm tc-white/80 h:tc-white"
              >
                Blog
              </Link>
              <Link
                href="/ui"
                className="d-none md:d-b fs-sm tc-white/80 h:tc-white"
              >
                Components
              </Link>
              <Link
                href="https://github.com/yumma-lib/yumma-css"
                target="_blank"
                rel="noopener noreferrer"
                className="d-none md:d-b fs-sm tc-white/80 h:tc-white"
              >
                GitHub
              </Link>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="d-f ai-c g-2 md:px-4 md:py-2 bg-white/5 bf-b-sm fs-sm h:bg-white/10 tc-white b-1 bc-white/10"
              >
                <Search className="w-5 h-5 md:w-4 md:h-4" />
                <span className="d-none md:d-b">Ctrl K</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <OramaSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

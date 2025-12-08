"use client";

import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const OramaSearch = dynamic(
  () => import("./orama-search").then((mod) => mod.OramaSearch),
  {
    ssr: false,
  },
);

export default function UINavbar() {
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
      <header className="p-st t-0 zi-10 bb-1 bc-silver-3 bg-white">
        <div className="~sm-xxl mx-auto px-6 py-2">
          <nav className="d-f ai-c jc-sb">
            <div className="d-f ai-c g-2">
              <Link href="/ui">
                <Image
                  src="/ui-logotype.png"
                  width={240}
                  height={80}
                  alt="Yumma UI"
                  className="h-10 w-auto of-c"
                />
              </Link>
            </div>
            <div className="d-f ai-c g-8">
              <Link
                href="/docs"
                className="d-none md:d-b fs-sm tc-slate-10 h:tc-black"
              >
                Docs
              </Link>
              <Link
                href="/blog"
                className="d-none md:d-b fs-sm tc-slate-10 h:tc-black"
              >
                Blog
              </Link>
              <Link
                href="/ui"
                className="d-none md:d-b fs-sm tc-slate-10 h:tc-black"
              >
                Components
              </Link>
              <Link
                href="https://github.com/yumma-lib/yumma-css"
                target="_blank"
                rel="noopener noreferrer"
                className="d-none md:d-b fs-sm tc-slate-10 h:tc-black"
              >
                GitHub
              </Link>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="d-f ai-c g-2 md:px-4 md:py-2 rad-0 fs-sm bg-white tc-slate-8 b-1 bc-silver-4 h:bg-silver-1 f:oc-silver-1 f:os-s f:ow-2"
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

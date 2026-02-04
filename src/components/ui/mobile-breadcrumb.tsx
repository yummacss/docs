"use client";

import { Button } from "@base-ui/react";
import { CaretRightIcon, EqualsIcon, XIcon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { lazy, Suspense, useEffect, useState } from "react";
import { findCurrentPageInfo } from "@/utils/sidebar";
import { findCurrentUIPageInfo } from "@/utils/ui-sidebar";

const MobileSidebar = lazy(() => import("./mobile-sidebar"));

export default function MobileBreadcrumb() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isUIRoute = pathname.startsWith("/ui");
  const pageInfo = isUIRoute
    ? findCurrentUIPageInfo(pathname)
    : findCurrentPageInfo(pathname);

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

  if (!pageInfo) return null;

  return (
    <>
      <div
        className={`p-f t-12 r-0 l-0 zi-10 d-b lg:d-none btw-1 ${isSidebarOpen ? "" : "bbw-1"} bc-white/5`}
        style={{ backgroundColor: "#151724" }}
      >
        <div className="sm-xxl mx-auto px-6 py-2">
          <div className="d-f ai-c g-4">
            <Button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="d-f ai-c jc-c c-white/70 h:c-white"
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? <XIcon size={15} /> : <EqualsIcon size={15} />}
            </Button>

            <div className="d-f ai-c g-2 fs-sm c-white/70">
              <span>{pageInfo.sectionTitle}</span>
              <CaretRightIcon size={10} />
              <span className="c-white">{pageInfo.pageTitle}</span>
            </div>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <Suspense fallback={null}>
          <MobileSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            routeType={isUIRoute ? "ui" : "docs"}
          />
        </Suspense>
      )}
    </>
  );
}

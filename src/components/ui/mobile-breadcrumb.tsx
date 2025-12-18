"use client";

import { CaretRightIcon, ListIcon } from "@phosphor-icons/react";
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
        className="t-18 zi-10 d-b lg:d-none bb-1 bc-white/5"
        style={{ backgroundColor: "#151724", top: "3.5rem" }}
      >
        <div className="~sm-xxl mx-auto px-4 py-2">
          <div className="d-f ai-c g-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="d-f ai-c jc-c tc-white/70 h:tc-white"
              aria-label="Open sidebar"
            >
              <ListIcon size={15} />
            </button>

            <div className="d-f ai-c g-2 fs-sm tc-white/70">
              <span>{pageInfo.sectionTitle}</span>
              <CaretRightIcon size={15} />
              <span className="tc-white">{pageInfo.pageTitle}</span>
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

"use client";

import { findCurrentPageInfo } from "@/utils/sidebar";
import { CaretRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MobileSidebar from "./mobile-sidebar";

export default function MobileBreadcrumb() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pageInfo = findCurrentPageInfo(pathname);

  if (!pageInfo) return null;

  return (
    <>
      <div className="d-b lg:d-none bb-1 bc-white/5">
        <div className="~sm-xxl mx-auto px-6 py-4">
          <div className="d-f ai-c g-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="d-f ai-c jc-c tc-white/70 h:tc-white"
              aria-label="Open sidebar"
            >
              <HamburgerMenuIcon className="w-5 h-5" />
            </button>

            <div className="d-f ai-c g-2 fs-sm tc-white/70">
              <span>{pageInfo.sectionTitle}</span>
              <CaretRightIcon className="w-4 h-4" />
              <span className="tc-white">{pageInfo.pageTitle}</span>
            </div>
          </div>
        </div>
      </div>

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}

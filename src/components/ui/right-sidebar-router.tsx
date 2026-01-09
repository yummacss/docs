"use client";

import { usePathname } from "next/navigation";
import TableOfContents from "@/components/ui/table-of-contents";
import TemplateDetailsSidebar from "@/components/ui/template-details-sidebar";
import TemplatesLegalSidebar from "@/components/ui/templates-legal-sidebar";

export default function RightSidebarRouter() {
  const pathname = usePathname();
  const isTemplatesListing = pathname === "/ui/templates";
  const isTemplateDetail =
    pathname?.startsWith("/ui/templates/") && pathname !== "/ui/templates";

  if (isTemplatesListing) {
    return <TemplatesLegalSidebar />;
  }
  if (isTemplateDetail) {
    return <TemplateDetailsSidebar />;
  }
  return <TableOfContents />;
}

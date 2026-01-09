"use client";

import { usePathname } from "next/navigation";
import TemplatesSidebar from "@/components/ui/templates-sidebar";
import UISidebar from "@/components/ui/ui-sidebar";

export default function LeftSidebarRouter() {
  const pathname = usePathname();
  const isTemplatesPage = pathname?.startsWith("/ui/templates");

  if (isTemplatesPage) {
    return <TemplatesSidebar />;
  }
  return <UISidebar />;
}

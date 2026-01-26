"use client";

import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { findCurrentUIPageInfo } from "@/utils/ui-sidebar";

export default function ExternalLinks() {
  const pathname = usePathname();
  const info = findCurrentUIPageInfo(pathname);

  if (!info || info.sectionTitle !== "Components") {
    return null;
  }

  const slug = pathname.replace(/^\/ui\//, "");
  const docUrl = `https://base-ui.com/react/components/${slug}`;
  const apiUrl = `https://base-ui.com/react/components/${slug}#api-reference`;

  return (
    <>
      <Link
        href={docUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="d-f ai-c g-2 fs-sm c-white/70 h:c-white td-none"
      >
        <ArrowSquareOutIcon weight="duotone" size={16} />
        <span>Documentation</span>
      </Link>
      <Link
        href={apiUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="d-f ai-c g-2 fs-sm c-white/70 h:c-white td-none"
      >
        <ArrowSquareOutIcon weight="duotone" size={16} />
        <span>API Reference</span>
      </Link>
    </>
  );
}

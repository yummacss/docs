"use client";

import { LogoMarkdown } from "@gravity-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ViewMarkdown() {
  const pathname = usePathname();
  const url = `${pathname.replace(/\/$/, "")}.md`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="d-if c-white/70 ai-c g-2 w-fc fs-sm td-none h:c-white fv:oc-white fv:ow-2"
    >
      <LogoMarkdown className="w-4 h-4" />
      View as markdown
    </Link>
  );
}
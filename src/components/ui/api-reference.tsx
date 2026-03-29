"use client";

import { Link as LinkIcon } from "@gravity-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ApiReference() {
  const pathname = usePathname();
  const slug = pathname.replace(/^\/ui\//, "").replace(/\/$/, "");
  const url = `https://base-ui.com/react/components/${slug}`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="d-if c-white/70 ai-c g-2 w-fc fs-sm td-none h:c-white fv:oc-white fv:ow-2"
    >
      <LinkIcon className="w-4 h-4" />
      API Reference
    </Link>
  );
}

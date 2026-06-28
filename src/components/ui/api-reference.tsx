"use client";

import { PageStar } from "iconoir-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ApiReference() {
  const pathname = usePathname();
  let slug = pathname.replace(/^\/ui\/components\//, "");
  slug = slug.replace(/^\/ui\//, "").replace(/\/$/, "");
  const url = `https://base-ui.com/react/components/${slug}#api-reference`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="d-if ai-c g-2 w-fc c-white/70 fs-sm td-none h:c-white fv:oc-white fv:ow-2"
    >
      <PageStar className="w-4 h-4" />
      API reference
    </Link>
  );
}

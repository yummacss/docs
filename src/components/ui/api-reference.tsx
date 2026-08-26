"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BaseUI } from "@/components/icons/icons";

interface ApiReferenceProps {
  /** Pass Base UI slug when it differs from the route (e.g. Textarea -> field). */
  primitive: boolean | string;
}

/** Link to the underlying Base UI primitive (not this page's Yumma UI API). */
export default function ApiReference({ primitive }: ApiReferenceProps) {
  const pathname = usePathname();
  let routeSlug = pathname.replace(/^\/ui\/components\//, "");
  routeSlug = routeSlug.replace(/^\/ui\//, "").replace(/\/$/, "");
  const slug = typeof primitive === "string" ? primitive : routeSlug;
  const url = `https://base-ui.com/react/components/${slug}#api-reference`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="d-if ai-c g-2 w-fc c-foreground/80 fs-sm td-none h:c-accent fv:oc-accent fv:ow-2"
    >
      <BaseUI className="w-4 h-4" />
      Base UI primitive
    </Link>
  );
}

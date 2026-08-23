"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BaseUI } from "@/components/icons/base-ui";

interface ApiReferenceProps {
  /**
   * `true` derives the Base UI slug from the current page's own route, which
   * only works when the two names match (Switch -> switch). Pass the real
   * Base UI slug as a string when they diverge - Textarea is built on
   * Field's `render` prop, not a "Textarea" primitive, which doesn't exist.
   */
  primitive: boolean | string;
}

/**
 * A link to the Base UI primitive this component is built on.
 *
 * Not the same thing as the page's own `## API Reference`, which documents the
 * props Yumma UI adds. This one documents the primitive underneath, which is
 * what you need the moment you edit the file you copied - and you will, because
 * you own it. The label says "Base UI primitive" rather than "API reference"
 * precisely so the two are not mistaken for each other.
 *
 * Rendered only for pages with `primitive` set in their frontmatter.
 */
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
      className="d-if ai-c g-2 w-fc c-white/70 fs-sm td-none h:c-white fv:oc-white fv:ow-2"
    >
      <BaseUI className="w-4 h-4" />
      Base UI primitive
    </Link>
  );
}

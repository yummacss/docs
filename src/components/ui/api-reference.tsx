"use client";

import { PageStar } from "iconoir-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * A link to the Base UI primitive this component is built on.
 *
 * Not the same thing as the page's own `## API Reference`, which documents the
 * props Yumma UI adds. This one documents the primitive underneath, which is
 * what you need the moment you edit the file you copied - and you will, because
 * you own it. The label says "Base UI primitive" rather than "API reference"
 * precisely so the two are not mistaken for each other.
 *
 * Rendered only for pages with `primitive: true` in their frontmatter.
 */
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
      Base UI primitive
    </Link>
  );
}

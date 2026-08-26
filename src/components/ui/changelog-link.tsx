"use client";

import { Github } from "iconoir-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Changelog links the file, not a heading fragment (dates are in headings). */
const CHANGELOG_URL =
  "https://github.com/yummacss/yummacss/blob/main/CHANGELOG.md";

export default function ChangelogLink() {
  const pathname = usePathname();

  if (!pathname?.startsWith("/blog")) {
    return null;
  }

  return (
    <Link
      href={CHANGELOG_URL}
      target="_blank"
      rel="noreferrer"
      className="d-if ai-c g-2 w-fc c-foreground/80 fs-sm td-none h:c-accent fv:oc-accent fv:ow-2"
    >
      <Github className="w-4 h-4" />
      View the changelog
    </Link>
  );
}

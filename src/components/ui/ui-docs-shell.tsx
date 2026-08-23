"use client";

import { usePathname } from "next/navigation";
import TableOfContents from "@/components/ui/toc";
import { registryMeta } from "@/registry";

/**
 * The /ui grid body after the sidebar: article width and whether the right
 * rail is a table of contents.
 *
 * Schema-backed component pages (button, dialog, ...) widen the article to
 * nine columns and drop the TOC, so a later playground rail can sit there.
 * Prose pages (installation, customization) keep the six-column article and
 * the TOC they already had.
 *
 * Lives as a client shell rather than a nested layout.tsx under [slug], which
 * would nest inside `src/app/ui/layout.tsx` and render the navbar twice.
 */
export default function UIDocsShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const match = pathname.match(/^\/ui\/components\/([^/]+)\/?$/);
  const slug = match?.[1] ?? "";
  const hasSchema = Boolean(slug) && Object.hasOwn(registryMeta, slug);

  return (
    <>
      <div className={`pt-12 ${hasSchema ? "@lg:gc-s-9" : "@lg:gc-s-6"}`}>
        <article>{children}</article>
      </div>
      {!hasSchema && <TableOfContents />}
    </>
  );
}

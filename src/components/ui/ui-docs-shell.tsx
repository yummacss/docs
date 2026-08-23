"use client";

import { usePathname } from "next/navigation";
import {
  PlaygroundRailProvider,
  useSetPlaygroundRail,
} from "@/components/playground-rail";
import TableOfContents from "@/components/ui/toc";
import { registryMeta } from "@/registry";

/**
 * The /ui grid body after the sidebar: article width and whether the right
 * rail is a table of contents or the props mount for `<ComponentPlayground>`.
 *
 * Schema-backed pages keep the six-column article and a three-column rail
 * (same grid as before). Prose pages keep the TOC.
 *
 * Lives as a client shell rather than a nested layout.tsx under [slug], which
 * would nest inside `src/app/ui/layout.tsx` and render the navbar twice.
 */
export default function UIDocsShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlaygroundRailProvider>
      <UIDocsShellInner>{children}</UIDocsShellInner>
    </PlaygroundRailProvider>
  );
}

function UIDocsShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const match = pathname.match(/^\/ui\/components\/([^/]+)\/?$/);
  const slug = match?.[1] ?? "";
  const hasSchema = Boolean(slug) && Object.hasOwn(registryMeta, slug);
  const setRail = useSetPlaygroundRail();

  return (
    <>
      <div className="pt-12 @lg:gc-s-6">
        <article>{children}</article>
      </div>
      {hasSchema ? (
        <aside className="d-none bc-border blw-1 @lg:d-b @lg:gc-s-3">
          <div
            ref={setRail}
            className="p-st t-20 oy-auto"
            style={{ maxHeight: "calc(100dvh - 5rem)" }}
          />
        </aside>
      ) : (
        <TableOfContents />
      )}
    </>
  );
}

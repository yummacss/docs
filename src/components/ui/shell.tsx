"use client";

import { allUis } from "content-collections";
import { usePathname } from "next/navigation";
import { PlaygroundProvider } from "@/components/playground/context";
import PlaygroundRail from "@/components/playground/rail";
import Sidebar from "@/components/ui/sidebar";
import TableOfContents from "@/components/ui/toc";
import { registryMeta } from "@/registry";

/** UI layout grid; third column is playground rail or TOC per route. */
export default function UIShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const slug = (pathname || "")
    .replace(/^\/ui\/components\//, "")
    .replace(/^\/ui\//, "")
    .replace(/\/$/, "");
  const page = allUis.find((ui) => ui._meta.path === slug);
  const playground =
    page?.playground && Object.hasOwn(registryMeta, slug) ? slug : null;

  const grid = (
    <div className="d-g gtc-1 g-8 @lg:gtc-12">
      <Sidebar variant="ui" />

      <div className="pt-12 @lg:gc-s-6">
        <article>{children}</article>
      </div>

      {playground ? <PlaygroundRail /> : <TableOfContents />}
    </div>
  );

  if (!playground) return grid;

  return (
    <PlaygroundProvider key={playground} id={playground}>
      {grid}
    </PlaygroundProvider>
  );
}

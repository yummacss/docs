"use client";

import { allUis } from "content-collections";
import { usePathname } from "next/navigation";
import { PlaygroundProvider } from "@/components/playground/context";
import PlaygroundRail from "@/components/playground/rail";
import Sidebar from "@/components/ui/sidebar";
import TableOfContents from "@/components/ui/toc";
import { registryMeta } from "@/registry";

/**
 * The Yumma UI grid, and which of two things fills its third column.
 *
 * A component page spends that column on the component's controls; the prose
 * pages under the same route - installation, customization - keep their table
 * of contents. Deciding here rather than in the layout is not a preference:
 * layouts do not re-render on navigation, so a server layout reading the route
 * would still be showing the previous page's answer.
 *
 * A page counts as a component page when it opts in with `playground: true`
 * and the registry has a schema under its slug. The flag is not redundant: 35
 * of the 36 schemas still render a static preview, and a rail beside one of
 * those would be a set of controls that move nothing.
 */
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

  return <PlaygroundProvider id={playground}>{grid}</PlaygroundProvider>;
}

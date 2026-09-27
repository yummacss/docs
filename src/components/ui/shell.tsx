"use client";

import { allUis } from "content-collections";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import {
  PlaygroundProvider,
  usePlayground,
} from "@/components/playground/context";
import Customize from "@/components/playground/customize";
import Sidebar from "@/components/ui/sidebar";
import TableOfContents from "@/components/ui/toc";
import { registryMeta } from "@/registry";
import { useWide } from "@/utils/media";

const GRID = "d:g gtc:1 g:8 @lg:gtc:12";
const ARTICLE = "d:f fd:c pt:12";
// below @lg: the sheet rests at 12rem over the page, so the page ends above it
const STAGE = "pb:48 @lg:h:dvh @lg:pb:6 @lg:o:h";
const DOCK = "bc:border @lg:blw:1 @lg:gc-s:3";

export default function UIShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const slug = (pathname || "")
    .replace(/^\/ui\/components\//, "")
    .replace(/^\/ui\//, "")
    .replace(/\/$/, "");
  const page = allUis.find((ui) => ui._meta.path === slug);
  const playground =
    page?.playground && Object.hasOwn(registryMeta, slug) ? slug : null;

  if (!playground) {
    return (
      <div className={GRID}>
        <Sidebar variant="ui" />
        <div className={`${ARTICLE} @lg:gc-s:6`}>
          <article className="d:f fd:c f:1 min-h:0">{children}</article>
        </div>
        <TableOfContents />
      </div>
    );
  }

  const docked = (
    <div className={GRID}>
      <Sidebar variant="ui" />
      <div className={`${ARTICLE} ${STAGE} @lg:gc-s:6`}>
        <article className="d:f fd:c f:1 min-h:0">{children}</article>
      </div>
      <aside className={DOCK} />
    </div>
  );

  return (
    <Suspense fallback={docked}>
      <PlaygroundProvider id={playground}>
        <Stage>{children}</Stage>
      </PlaygroundProvider>
    </Suspense>
  );
}

// the drawer docks into the third column at @lg:, and the stage takes it back when closed
function Stage({ children }: { children: React.ReactNode }) {
  const playground = usePlayground();
  const wide = useWide();
  const [dock, setDock] = useState<HTMLElement | null>(null);
  const docked = wide && (playground?.panel ?? true);

  return (
    <div className={GRID}>
      <Sidebar variant="ui" />
      <div
        className={`${ARTICLE} ${STAGE} ${docked ? "@lg:gc-s:6" : "@lg:gc-s:9"}`}
      >
        <article className="d:f fd:c f:1 min-h:0">{children}</article>
      </div>
      {docked && (
        <aside className={DOCK}>
          <div ref={setDock} className="@lg:p:st @lg:t:20" />
        </aside>
      )}
      <Customize dock={dock} />
    </div>
  );
}

"use client";

import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { useEffect, useState } from "react";
import PreviewFrame, { usePreviewContainer } from "@/components/preview-frame";
import { getRegistryMeta } from "@/registry";
import { accentCss, DEFAULT_ACCENT } from "@/utils/accent";
import {
  type DemoProps,
  exampleChildren,
  resolveIcons,
  seedValues,
} from "@/utils/demo";
import {
  getCachedRegistryComponent,
  loadRegistryComponent,
} from "@/utils/prefetch-registry";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  section: string;
}

/** One component at its defaults, live, in its own frame. */
function Live({
  id,
  height,
  scale = 1,
}: {
  id: string;
  height: number;
  scale?: number;
}) {
  const meta = getRegistryMeta(id);
  const [Component, setComponent] = useState(
    () =>
      getCachedRegistryComponent(id) as ComponentType<DemoProps> | undefined,
  );

  useEffect(() => {
    if (Component) return;
    let live = true;
    loadRegistryComponent(id).then((loaded) => {
      if (live && loaded)
        setComponent(() => loaded as ComponentType<DemoProps>);
    });
    return () => {
      live = false;
    };
  }, [id, Component]);

  if (!meta) return null;
  const values = Object.fromEntries(
    Object.entries(seedValues(meta)).filter(([, value]) => value !== ""),
  );

  // rendered at full size, then shrunk, so a tile shows the component as it is
  return (
    <div className="p:r w:100% h:100% o:h">
      <div
        className="p:a t:0 l:0"
        style={{
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
        }}
      >
        <PreviewFrame
          minHeight={height / scale}
          fill
          className="h:100%"
          accentCss={accentCss(DEFAULT_ACCENT)}
        >
          {Component && (
            <Mounted
              Component={Component}
              props={resolveIcons(values) as DemoProps}
              portals={meta.props.some((prop) => prop.name === "container")}
            >
              {exampleChildren(meta)}
            </Mounted>
          )}
        </PreviewFrame>
      </div>
    </div>
  );
}

function Mounted({
  Component,
  props,
  portals,
  children,
}: {
  Component: ComponentType<DemoProps>;
  props: DemoProps;
  portals: boolean;
  children?: ReactNode;
}) {
  const container = usePreviewContainer();
  return (
    <Component {...props} {...(portals ? { container } : {})}>
      {children}
    </Component>
  );
}

// components that read best with room to spread
const WIDE = new Set([
  "menubar",
  "toolbar",
  "tabs",
  "onboarding",
  "file-upload",
  "empty-state",
  "inline-icon-heading",
  "accordion",
  "skeleton",
]);

/** A: a section per sidebar group, equal cards, name & description under each. */
export function GalleryA({ items }: { items: GalleryItem[] }) {
  const sections = [...new Set(items.map((item) => item.section))];
  return (
    <div className="d:f fd:c g:12">
      {sections.map((section) => (
        <section key={section}>
          <h2 className="m:0 mb:4 ff:display fw:400 fs:xl c:ink">{section}</h2>
          <div className="d:g gtc:1 g:4 @md:gtc:2 @xl:gtc:3">
            {items
              .filter((item) => item.section === section)
              .map((item) => (
                <div
                  key={item.id}
                  className="d:f fd:c bw:1 bc:border bg:surface"
                >
                  <div className="h:56 bbw:1 bc:border">
                    <Live id={item.id} height={224} scale={0.75} />
                  </div>
                  <Link
                    href={`/components/${item.id}`}
                    className="d:b px:4 py:3 a:none h:bg:ink/5 fv:os:s fv:ow:2 fv:oo:-2 fv:oc:accent"
                  >
                    <span className="d:b fw:600 c:ink fs:sm">{item.title}</span>
                    <span className="d:b mt:1 c:ink/60 fs:xs lh:2">
                      {item.description}
                    </span>
                  </Link>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/** B: one continuous wall, wide components span two columns, the name in a corner. */
export function GalleryB({ items }: { items: GalleryItem[] }) {
  return (
    <div className="d:g gtc:1 g:4 @md:gtc:2 @xl:gtc:3 gaf:d">
      {items.map((item) => (
        <div
          key={item.id}
          className={`p:r h:64 bw:1 bc:border bg:surface ${
            WIDE.has(item.id) ? "@xl:gc-s:2" : ""
          }`}
        >
          <Live id={item.id} height={256} scale={0.8} />
          <Link
            href={`/components/${item.id}`}
            className="p:a t:3 l:3 px:2 py:1 bg:surface bw:1 bc:border fs:xs ff:m c:ink/70 a:none h:c:ink fv:os:s fv:ow:2 fv:oo:2 fv:oc:accent"
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

/** C: a tight index, four across, the name under each tile and nothing else. */
export function GalleryC({ items }: { items: GalleryItem[] }) {
  return (
    <div className="d:g gtc:2 cg:4 rg:6 @md:gtc:3 @xl:gtc:4">
      {items.map((item) => (
        <div key={item.id} className="d:f fd:c g:2">
          <div className="h:44 bw:1 bc:border bg:surface o:h">
            <Live id={item.id} height={176} scale={0.6} />
          </div>
          <Link
            href={`/components/${item.id}`}
            className="as:fs fs:sm c:ink/80 a:none h:c:ink h:td:u fv:os:s fv:ow:2 fv:oo:2 fv:oc:accent"
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

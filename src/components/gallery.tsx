"use client";

import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { useEffect, useState } from "react";
import Scene from "@/components/playground/scene";
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
import { DEFAULT_STYLE, STYLES } from "@/utils/styles.mjs";

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
          {meta.scene ? (
            <Scene
              scene={meta.scene}
              style={DEFAULT_STYLE}
              radius={STYLES[DEFAULT_STYLE].radius}
            />
          ) : (
            Component && (
              <Mounted
                Component={Component}
                props={resolveIcons(values) as DemoProps}
                portals={meta.props.some((prop) => prop.name === "container")}
              >
                {exampleChildren(meta)}
              </Mounted>
            )
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

const LINK = "a:none fv:os:s fv:ow:2 fv:oo:2 fv:oc:accent";

/** C2: no borders, white tiles on the page tint, the group under each name. */
export function GalleryC2({ items }: { items: GalleryItem[] }) {
  return (
    <div className="d:g gtc:2 cg:4 rg:6 @md:gtc:3 @xl:gtc:4">
      {items.map((item) => (
        <div key={item.id} className="d:f fd:c g:2">
          <div className="h:44 br:lg o:h bs-o:sm">
            <Live id={item.id} height={176} scale={0.6} />
          </div>
          <Link href={`/components/${item.id}`} className={`as:fs ${LINK}`}>
            <span className="d:b fs:sm c:ink h:td:u">{item.title}</span>
            <span className="d:b fs:xs ff:m c:ink/50">{item.section}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

/** C3: five across, square tiles, the name on a strip inside the tile. */
export function GalleryC3({ items }: { items: GalleryItem[] }) {
  return (
    <div className="d:g gtc:2 g:3 @md:gtc:4 @xl:gtc:5">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/components/${item.id}`}
          className={`p:r d:f fd:c h:48 bw:1 bc:border bg:surface o:h h:bc:ink/40 ${LINK}`}
        >
          <div className="f:1 min-h:0 pe:none">
            <Live id={item.id} height={160} scale={0.55} />
          </div>
          <span className="px:3 py:2 btw:1 bc:border fs:xs c:ink/80">
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
}

/** C4: the index, grouped under the sidebar's own small labels. */
export function GalleryC4({ items }: { items: GalleryItem[] }) {
  const sections = [...new Set(items.map((item) => item.section))];
  return (
    <div className="d:f fd:c g:10">
      {sections.map((section) => (
        <section key={section}>
          <h2 className="m:0 mb:4 fs:xs fw:600 ls:2 tt:u c:silver-8">
            {section}
          </h2>
          <div className="d:g gtc:2 cg:4 rg:6 @md:gtc:3 @xl:gtc:4">
            {items
              .filter((item) => item.section === section)
              .map((item) => (
                <div key={item.id} className="d:f fd:c g:2">
                  <div className="h:44 bw:1 bc:border bg:surface o:h">
                    <Live id={item.id} height={176} scale={0.6} />
                  </div>
                  <Link
                    href={`/components/${item.id}`}
                    className={`as:fs fs:sm c:ink/80 h:c:ink h:td:u ${LINK}`}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/** C5: three across, larger tiles, the name in the corner of each tile. */
export function GalleryC5({ items }: { items: GalleryItem[] }) {
  return (
    <div className="d:g gtc:1 g:4 @md:gtc:2 @xl:gtc:3">
      {items.map((item) => (
        <div key={item.id} className="p:r h:56 bw:1 bc:border bg:surface">
          <Live id={item.id} height={224} scale={0.7} />
          <Link
            href={`/components/${item.id}`}
            className={`p:a b:3 l:4 fs:sm fw:500 c:ink/70 h:c:ink h:td:u ${LINK}`}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

/** C6: two columns of rows, a tile beside each name & description. */
export function GalleryC6({ items }: { items: GalleryItem[] }) {
  return (
    <div className="d:g gtc:1 cg:8 rg:4 @xl:gtc:2">
      {items.map((item) => (
        <div key={item.id} className="d:f ai:c g:4">
          <div className="fs:0 w:48 h:32 bw:1 bc:border bg:surface o:h">
            <Live id={item.id} height={128} scale={0.5} />
          </div>
          <Link href={`/components/${item.id}`} className={`min-w:0 ${LINK}`}>
            <span className="d:b fs:sm fw:600 c:ink h:td:u">{item.title}</span>
            <span className="d:b mt:1 fs:xs c:ink/60 lh:2">
              {item.description}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}

/** D: the mockup's grid. A white stage per group, three across, the name in a corner. */
export function GalleryD({ items }: { items: GalleryItem[] }) {
  const sections = [...new Set(items.map((item) => item.section))];
  return (
    <div className="d:f fd:c g:10">
      {sections.map((section) => (
        <section key={section} className="d:g g:3">
          <h2 className="m:0 ff:display fw:400 fs:xxl c:ink">{section}</h2>
          <div className="d:g gtc:1 gaf:d bw:1 bc:border bg:surface o:h @md:gtc:2 @xl:gtc:3">
            {items
              .filter((item) => item.section === section)
              .map((item) => (
                <div
                  key={item.id}
                  className={`p:r h:68 brw:1 bbw:1 bc:border ${
                    WIDE.has(item.id) ? "@md:gc-s:2" : ""
                  }`}
                >
                  <Live id={item.id} height={272} />
                  <Link
                    href={`/components/${item.id}`}
                    className={`p:a l:3 b:2 fs:xs fw:500 ls:1 tt:u c:ink/50 h:c:ink ${LINK}`}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

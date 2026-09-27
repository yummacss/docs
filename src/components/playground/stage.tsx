"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePlayground } from "@/components/playground/context";
import PreviewFrame, { usePreviewContainer } from "@/components/preview-frame";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/tabs";
import TokenBlock from "@/components/ui/token-block";
import { getRegistryTarget, type RegistryMeta } from "@/registry";
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
import { buildUsage } from "@/utils/snippet";
import {
  DEFAULT_STYLE,
  radiusCss,
  STYLES,
  styleProps,
} from "@/utils/styles.mjs";

const FILL = "d:f fd:c f:1 min-h:0";

interface Frame {
  id: string;
  meta: RegistryMeta;
  values: DemoProps;
  Component: ComponentType<DemoProps>;
}

export default function ComponentPlayground() {
  const playground = usePlayground();
  const playgroundRef = useRef(playground);
  playgroundRef.current = playground;
  const [frame, setFrame] = useState<Frame | null>(() => {
    const cached =
      playground?.meta && getCachedRegistryComponent(playground.id);
    return cached && playground?.meta
      ? {
          id: playground.id,
          meta: playground.meta,
          values: playground.values,
          Component: cached as ComponentType<DemoProps>,
        }
      : null;
  });

  useEffect(() => {
    const id = playground?.id;
    const meta = playground?.meta;
    if (!id || !meta) return;

    let live = true;

    const commit = (Component: ComponentType<DemoProps>) => {
      if (!live) return;
      const current = playgroundRef.current;

      const values =
        current?.id === id && current.meta ? current.values : seedValues(meta);
      setFrame({ id, meta, values, Component });
    };

    const cached = getCachedRegistryComponent(id);
    if (cached) {
      commit(cached as ComponentType<DemoProps>);
      return () => {
        live = false;
      };
    }

    loadRegistryComponent(id).then((Component) => {
      if (Component) commit(Component as ComponentType<DemoProps>);
    });

    return () => {
      live = false;
    };
  }, [playground?.id, playground?.meta]);

  const handlerProps = playground?.meta?.props;
  const handlers = useMemo(
    () =>
      Object.fromEntries(
        (handlerProps ?? [])
          .filter((prop) => prop.handler)
          .map((prop) => [
            prop.handler as string,
            (value: unknown) =>
              playgroundRef.current?.setValue(prop.name, value),
          ]),
      ),
    [handlerProps],
  );

  // a component already loaded swaps in this render; until the first arrives the frame stays empty
  const ready =
    playground && frame?.id !== playground.id
      ? (getCachedRegistryComponent(playground.id) as
          | ComponentType<DemoProps>
          | undefined)
      : undefined;
  const live =
    !frame ||
    Boolean(ready) ||
    (frame.id === playground?.id && Boolean(playground?.meta));
  const id = live ? (playground?.id ?? "") : (frame?.id ?? "");
  const values = live ? (playground?.values ?? {}) : (frame?.values ?? {});
  const meta = live ? playground?.meta : frame?.meta;
  if (!id || !meta) return null;
  const set = Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== ""),
  );
  const usage = buildUsage(getRegistryTarget(id).component, meta, set);
  const Component = ready ?? frame?.Component;
  const style = playground?.style ?? DEFAULT_STYLE;
  const radius = playground?.radius ?? STYLES[DEFAULT_STYLE].radius;

  const uncontrolled = Object.entries(set)
    .filter(([name]) => name.startsWith("default"))
    .map(([name, value]) => `${name}:${JSON.stringify(value)}`)
    .join("|");

  return (
    <Tabs defaultValue="preview" className={FILL}>
      <TabsList>
        <TabsTab value="preview">Preview</TabsTab>
        <TabsTab value="code">Code</TabsTab>
      </TabsList>

      <TabsPanel value="preview" className={FILL}>
        <PreviewFrame
          className="f:1 min-h:0"
          minHeight={0}
          fill
          accentCss={[
            accentCss(playground?.accent ?? DEFAULT_ACCENT),
            radiusCss(style, radius),
          ].join("\n")}
        >
          {Component && (
            <Mounted
              key={`${id}:${uncontrolled}`}
              Component={Component}
              props={{
                ...(resolveIcons(set) as DemoProps),
                ...styleProps(meta.props, style, radius),
                ...handlers,
              }}
              portals={meta.props.some((prop) => prop.name === "container")}
            >
              {exampleChildren(meta)}
            </Mounted>
          )}
        </PreviewFrame>
      </TabsPanel>

      <TabsPanel value="code" className={FILL}>
        <TokenBlock tokens={usage} title="page.tsx" className={FILL} fill />
      </TabsPanel>
    </Tabs>
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

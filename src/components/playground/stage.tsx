"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePlayground } from "@/components/playground/context";
import { CustomizeTrigger } from "@/components/playground/customize";
import PreviewFrame, { usePreviewContainer } from "@/components/preview-frame";
import PreviewSpinner from "@/components/preview-spinner";
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

const PREVIEW_SHELL = "d:f p:r ox:auto ai:c jc:c p:10 bg:white";

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
  const [frame, setFrame] = useState<Frame | null>(null);

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

  if (!frame) {
    return (
      <div className={`bc:border bw:1 ${FILL}`}>
        <div data-preview className={`f:1 min-h:0 ${PREVIEW_SHELL}`}>
          <PreviewSpinner />
        </div>
      </div>
    );
  }

  const live = frame.id === playground?.id && Boolean(playground?.meta);
  const values = live && playground ? playground.values : frame.values;
  const meta = live && playground?.meta ? playground.meta : frame.meta;
  const set = Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== ""),
  );
  const usage = buildUsage(getRegistryTarget(frame.id).component, meta, set);
  const { Component } = frame;
  const style = playground?.style ?? DEFAULT_STYLE;
  const radius = playground?.radius ?? STYLES[DEFAULT_STYLE].radius;

  const uncontrolled = Object.entries(set)
    .filter(([name]) => name.startsWith("default"))
    .map(([name, value]) => `${name}:${JSON.stringify(value)}`)
    .join("|");

  return (
    <Tabs defaultValue="preview" className={FILL}>
      <div className="d:f ai:c bbw:1 bc:border">
        <TabsList className="f:1 min-w:0 bbw:0">
          <TabsTab value="preview">Preview</TabsTab>
          <TabsTab value="code">Code</TabsTab>
        </TabsList>
        <CustomizeTrigger />
      </div>

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
          <Mounted
            key={uncontrolled}
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

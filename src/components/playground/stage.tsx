"use client";

import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";
import { usePlayground } from "@/components/playground/context";
import PreviewSpinner from "@/components/preview-spinner";
import TokenBlock from "@/components/ui/token-block";
import { getRegistryTarget, type RegistryMeta } from "@/registry";
import { type DemoProps, resolveIcons } from "@/utils/demo";
import {
  getCachedRegistryComponent,
  loadRegistryComponent,
} from "@/utils/prefetch-registry";
import { buildUsage } from "@/utils/snippet";

const PREVIEW_SHELL = "d-f p-r ox-auto ai-c jc-c p-10 min-h-64 bg-white";

interface Frame {
  id: string;
  meta: RegistryMeta;
  values: DemoProps;
  Component: ComponentType<DemoProps>;
}

/** Live preview and usage snippet; keeps the last ready frame while the next loads. */
export default function ComponentPlayground() {
  const playground = usePlayground();
  const playgroundRef = useRef(playground);
  playgroundRef.current = playground;
  const [frame, setFrame] = useState<Frame | null>(null);

  // Commit a new frame only when meta and the component module are both ready.
  useEffect(() => {
    const id = playground?.id;
    const meta = playground?.meta;
    if (!id || !meta) return;

    let live = true;

    const commit = (Component: ComponentType<DemoProps>) => {
      if (!live) return;
      setFrame({
        id,
        meta,
        values: playgroundRef.current?.values ?? {},
        Component,
      });
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

  // Cold start only: no previous frame to hold.
  if (!frame) {
    return (
      <div className="mb-8 bc-border bw-1">
        <div data-preview className={PREVIEW_SHELL}>
          <PreviewSpinner />
        </div>
        <div
          className="bc-border btw-1 bg-surface"
          style={{ minHeight: "7rem" }}
          aria-hidden
        />
      </div>
    );
  }

  const live = frame.id === playground?.id;
  // While the next id loads, keep rendering the previous frame unchanged.
  const values = live && playground ? playground.values : frame.values;
  const meta = live && playground?.meta ? playground.meta : frame.meta;
  const set = Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== ""),
  );
  const usage = buildUsage(getRegistryTarget(frame.id).component, meta, set);
  const { Component } = frame;

  return (
    <div className="mb-8 bc-border bw-1">
      <div data-preview className={PREVIEW_SHELL}>
        <Component {...(resolveIcons(set) as DemoProps)}>
          {meta.children}
        </Component>
      </div>
      <TokenBlock
        tokens={usage}
        title="page.tsx"
        installId={getRegistryTarget(frame.id).install}
      />
    </div>
  );
}

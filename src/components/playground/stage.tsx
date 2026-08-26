"use client";

import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";
import { usePlayground } from "@/components/playground/context";
import PreviewSpinner from "@/components/preview-spinner";
import TokenBlock from "@/components/ui/token-block";
import { getRegistryTarget, type RegistryMeta } from "@/registry";
import { type DemoProps, resolveIcons, seedValues } from "@/utils/demo";
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

  // Commit only when meta is present; fixtures come from the schema itself so
  // a cleared values bag can never ship into the preview.
  useEffect(() => {
    const id = playground?.id;
    const meta = playground?.meta;
    if (!id || !meta) return;

    let live = true;

    const commit = (Component: ComponentType<DemoProps>) => {
      if (!live) return;
      const current = playgroundRef.current;
      // Prefer the provider's seeded values when they match this id; otherwise
      // rebuild from meta so options/items/steps are never missing.
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

  // Require meta too: while the provider clears for the next id, values is {}
  // even if frame.id still matches during the same tick as a remount.
  const live = frame.id === playground?.id && Boolean(playground?.meta);
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

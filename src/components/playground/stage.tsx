"use client";

import { lazy, Suspense, useMemo } from "react";
import { usePlayground } from "@/components/playground/context";
import PreviewSpinner from "@/components/preview-spinner";
import TokenBlock from "@/components/ui/token-block";
import { getRegistryImport, getRegistryTarget } from "@/registry";
import { type DemoProps, resolveIcons } from "@/utils/demo";
import { buildUsage } from "@/utils/snippet";

const PREVIEW_SHELL = "d-f p-r ox-auto ai-c jc-c p-10 min-h-64 bg-white";

/** Live preview and usage snippet; id comes from route via PlaygroundProvider. */
export default function ComponentPlayground() {
  const playground = usePlayground();

  // Key lazy() on id only; values changes should not remount the component.
  const id = playground?.id;
  const Component = useMemo(() => {
    if (!id) return null;
    const importFn = getRegistryImport(id);
    return importFn ? lazy(importFn) : null;
  }, [id]);

  if (!playground?.meta || !Component) return null;

  const { meta, values } = playground;

  // Empty string means unset, not an explicit empty value.
  const set = Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== ""),
  );

  const usage = buildUsage(
    getRegistryTarget(playground.id).component,
    meta,
    set,
  );

  return (
    <div className="mb-8 bc-border bw-1">
      <Suspense
        fallback={
          <div data-preview className={PREVIEW_SHELL}>
            <PreviewSpinner />
          </div>
        }
      >
        <div data-preview className={PREVIEW_SHELL}>
          <Component {...(resolveIcons(set) as DemoProps)}>
            {meta.children}
          </Component>
        </div>
      </Suspense>

      <TokenBlock tokens={usage} title="page.tsx" />
    </div>
  );
}

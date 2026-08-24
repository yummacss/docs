"use client";

import type { ComponentType } from "react";
import { lazy, Suspense, useMemo } from "react";
import { usePlayground } from "@/components/playground/context";
import TokenBlock from "@/components/ui/token-block";
import { getRegistryImport, getRegistryTarget } from "@/registry";
import { type DemoProps, resolveIcons } from "@/utils/demo";
import { buildUsage } from "@/utils/snippet";

/**
 * The live component, and the code that produces it.
 *
 * Takes no props: the page's route decides which component this is, and the
 * provider above it holds the state the controls write to. Anything else would
 * let the stage and the rail drift onto two different components.
 */
export default function ComponentPlayground() {
  const playground = usePlayground();

  // Keyed on the id alone. Depending on the whole playground rebuilt `lazy()`
  // on every keystroke, which handed Suspense a component it had never seen
  // and blanked the stage until the import resolved again.
  const id = playground?.id;
  const Component = useMemo(() => {
    if (!id) return null;
    const importFn = getRegistryImport(id);
    return importFn ? lazy(importFn) : null;
  }, [id]);

  if (!playground?.meta || !Component) return null;

  const { meta, values } = playground;

  // An empty text field means the prop was left alone, not that it was set to
  // the empty string, so it never reaches the component.
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
      <Suspense fallback={null}>
        <div
          data-preview
          className="d-f p-r ox-auto ai-c jc-c p-10 min-h-64 bg-white"
        >
          <Component {...(resolveIcons(set) as DemoProps)}>
            {meta.children}
          </Component>
        </div>
      </Suspense>

      {/* Directly under the stage, because the whole point of touching a
          control is to see what it does to the code you would copy. A file of
          yours, which is why `buildUsage` imports through the `@/` alias. */}
      <TokenBlock tokens={usage} title="page.tsx" />
    </div>
  );
}

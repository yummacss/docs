"use client";

import type { ComponentType } from "react";
import { lazy, Suspense, useMemo } from "react";
import { usePlayground } from "@/components/playground/context";
import PreviewFrame, { usePreviewContainer } from "@/components/preview-frame";
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
      {/* Tall enough that a modal opening inside the frame is not clipped by
          it. The frame grows past this whenever the component is taller.
          Stretching it to the viewport was tried & the component ended up
          adrift in the middle of a very tall white box. */}
      <PreviewFrame minHeight={384}>
        <Suspense fallback={null}>
          <Mounted
            Component={Component}
            props={resolveIcons(set) as DemoProps}
            portals={meta.props.some((prop) => prop.name === "container")}
          >
            {meta.children}
          </Mounted>
        </Suspense>
      </PreviewFrame>

      {/* Directly under the stage, because the whole point of touching a
          control is to see what it does to the code you would copy. A file of
          yours, which is why `buildUsage` imports through the `@/` alias. */}
      <TokenBlock tokens={usage} title="page.tsx" />
    </div>
  );
}

/**
 * The component, inside the frame, holding a portal target if it wants one.
 *
 * `container` is read here rather than passed down because the context it
 * comes from is only populated on the frame's side of the portal. The schema
 * decides whether to pass it: on a component with no popup it would reach the
 * DOM as an unknown attribute.
 */
function Mounted({
  Component,
  props,
  portals,
  children,
}: {
  Component: ComponentType<DemoProps>;
  props: DemoProps;
  portals: boolean;
  children?: string;
}) {
  const container = usePreviewContainer();

  return (
    <Component {...props} {...(portals ? { container } : {})}>
      {children}
    </Component>
  );
}

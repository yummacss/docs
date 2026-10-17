"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { usePreviewContainer } from "@/components/preview-frame";
import type { RegistryMeta } from "@/registry";
import { type DemoProps, renderScene, sceneIds } from "@/utils/demo";
import {
  getCachedRegistryComponent,
  loadRegistryComponent,
} from "@/utils/prefetch-registry";

function loaded(ids: string[]) {
  return Object.fromEntries(
    ids.map((id) => [id, getCachedRegistryComponent(id)]),
  ) as Record<string, ComponentType<DemoProps> | null>;
}

export default function Scene({
  scene,
  style,
  radius,
}: {
  scene: NonNullable<RegistryMeta["scene"]>;
  style: string;
  radius: string;
}) {
  const container = usePreviewContainer();
  const ids = useMemo(() => sceneIds(scene), [scene]);
  const [components, setComponents] = useState(() => loaded(ids));

  useEffect(() => {
    let live = true;
    Promise.all(ids.map((id) => loadRegistryComponent(id))).then(() => {
      if (live) setComponents(loaded(ids));
    });
    return () => {
      live = false;
    };
  }, [ids]);

  // a scene draws whole or not at all, so nothing jumps in as it loads
  if (ids.some((id) => !components[id])) return null;
  return renderScene(
    scene,
    components as Record<string, ComponentType<DemoProps>>,
    style,
    radius,
    container,
  );
}

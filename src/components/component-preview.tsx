"use client";
import { Toggle } from "@base-ui/react/toggle";
import type { ComponentType } from "react";
import { lazy, type ReactNode, Suspense, useEffect, useState } from "react";
import TokenBlock from "@/components/ui/token-block";
import {
  getRegistryImport,
  getRegistryMeta,
  getRegistryTarget,
} from "@/registry";
import { type DemoProps, resolveIcons, seedValues } from "@/utils/demo";
import { buildUsage, type Token } from "@/utils/snippet";

interface Props {
  registryId?: string;
  id?: string;
  className?: string;
  /** Start snippet fold regions open (for data-shape-focused pages). */
  expanded?: boolean;
  children?: ReactNode;
}

export default function ComponentPreview({
  registryId,
  id,
  className,
  expanded = false,
  children,
}: Props) {
  const [showCode, setShowCode] = useState(false);
  const [RegistryComponent, setRegistryComponent] =
    useState<ComponentType<DemoProps> | null>(null);
  // Seed demo from schema when a meta file exists.
  const [demo, setDemo] = useState<{ props: DemoProps; children?: string }>({
    props: {},
  });
  // Base variants show usage snippet, not registry source.
  const [usage, setUsage] = useState<Token[] | null>(null);
  const actualId = registryId || id;

  useEffect(() => {
    if (!actualId) return;

    const importFn = getRegistryImport(actualId);
    if (importFn) {
      setRegistryComponent(() => lazy(importFn));
    }

    const importMeta = getRegistryMeta(actualId);
    if (!importMeta) return;

    const target = getRegistryTarget(actualId);

    importMeta().then((module) => {
      const meta = module.default;
      const props = seedValues(meta);

      setDemo({
        props: resolveIcons(props) as DemoProps,
        children: meta.children,
      });
      if (target.variant === "base") {
        setUsage(buildUsage(target.component, meta, props));
      }
    });
  }, [actualId]);

  return (
    <div className={`mb-6 bc-border bw-1 ${className || ""}`}>
      <Suspense fallback={null}>
        {RegistryComponent ? (
          <div data-preview className="d-f p-r ox-auto ai-c jc-c p-10 bg-white">
            <RegistryComponent {...demo.props}>
              {demo.children}
            </RegistryComponent>
          </div>
        ) : null}
      </Suspense>

      <Toggle
        pressed={showCode}
        onPressedChange={setShowCode}
        className="d-f ai-c jc-c w-100% h-8 bc-border bg-surface c-accent bw-0 btw-1 fs-sm fw-500 tp-c tdu-150 ttf-io us-none fv:oc-accent fv:ow-2"
      >
        {showCode ? "Hide code" : "Show code"}
      </Toggle>

      {showCode &&
        (usage ? (
          <TokenBlock tokens={usage} expanded={expanded} title="page.tsx" />
        ) : (
          children
        ))}
    </div>
  );
}

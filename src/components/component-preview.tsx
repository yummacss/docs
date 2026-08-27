"use client";
import { Toggle } from "@base-ui/react/toggle";
import type { ComponentType } from "react";
import { type ReactNode, useEffect, useState } from "react";
import PreviewSpinner from "@/components/preview-spinner";
import TokenBlock from "@/components/ui/token-block";
import { getRegistryMeta, getRegistryTarget } from "@/registry";
import { type DemoProps, resolveIcons, seedValues } from "@/utils/demo";
import {
  getCachedRegistryComponent,
  loadRegistryComponent,
} from "@/utils/prefetch-registry";
import { buildUsage, type Token } from "@/utils/snippet";

const PREVIEW_SHELL = "d-f p-r ox-auto ai-c jc-c p-10 min-h-64 bg-white";

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
  const actualId = registryId || id;
  const [showCode, setShowCode] = useState(false);
  const [demo, setDemo] = useState<{ props: DemoProps; children?: string }>({
    props: {},
  });
  const [usage, setUsage] = useState<Token[] | null>(null);
  const expectsMeta = Boolean(actualId && getRegistryMeta(actualId));
  const [demoReady, setDemoReady] = useState(!expectsMeta);
  const [RegistryComponent, setRegistryComponent] =
    useState<ComponentType<DemoProps> | null>(() =>
      actualId
        ? (getCachedRegistryComponent(
            actualId,
          ) as ComponentType<DemoProps> | null)
        : null,
    );

  useEffect(() => {
    if (!actualId) return;

    let live = true;

    loadRegistryComponent(actualId).then((Component) => {
      if (!live || !Component) return;
      setRegistryComponent(() => Component as ComponentType<DemoProps>);
    });

    const importMeta = getRegistryMeta(actualId);
    if (!importMeta) {
      setDemoReady(true);
      return () => {
        live = false;
      };
    }

    setDemoReady(false);
    const target = getRegistryTarget(actualId);

    importMeta().then((module) => {
      if (!live) return;
      const meta = module.default;
      const props = seedValues(meta);

      setDemo({
        props: resolveIcons(props) as DemoProps,
        children: meta.children,
      });
      if (target.variant === "base") {
        setUsage(buildUsage(target.component, meta, props));
      }
      setDemoReady(true);
    });

    return () => {
      live = false;
    };
  }, [actualId]);

  const showComponent = RegistryComponent && demoReady;

  return (
    <div className={`mb-6 bc-border bw-1 ${className || ""}`}>
      {showComponent ? (
        <div data-preview className={PREVIEW_SHELL}>
          <RegistryComponent {...demo.props}>{demo.children}</RegistryComponent>
        </div>
      ) : (
        <div data-preview className={PREVIEW_SHELL}>
          <PreviewSpinner />
        </div>
      )}

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

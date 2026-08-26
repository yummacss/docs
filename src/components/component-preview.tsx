"use client";
import { Toggle } from "@base-ui/react/toggle";
import type { ComponentType } from "react";
import {
  lazy,
  type ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import PreviewSpinner from "@/components/preview-spinner";
import TokenBlock from "@/components/ui/token-block";
import {
  getRegistryImport,
  getRegistryMeta,
  getRegistryTarget,
} from "@/registry";
import { type DemoProps, resolveIcons, seedValues } from "@/utils/demo";
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
  const [showCode, setShowCode] = useState(false);
  // Seed demo from schema when a meta file exists.
  const [demo, setDemo] = useState<{ props: DemoProps; children?: string }>({
    props: {},
  });
  // Base variants show usage snippet, not registry source.
  const [usage, setUsage] = useState<Token[] | null>(null);
  const actualId = registryId || id;
  // Meta-backed previews need seeded props before mount; empty props crash bases.
  const expectsMeta = Boolean(actualId && getRegistryMeta(actualId));
  const [demoReady, setDemoReady] = useState(!expectsMeta);

  // Key lazy() on id only; avoid an empty first paint from useEffect.
  const RegistryComponent = useMemo(() => {
    if (!actualId) return null;
    const importFn = getRegistryImport(actualId);
    return importFn ? (lazy(importFn) as ComponentType<DemoProps>) : null;
  }, [actualId]);

  useEffect(() => {
    if (!actualId) return;

    const importMeta = getRegistryMeta(actualId);
    if (!importMeta) {
      setDemoReady(true);
      return;
    }

    setDemoReady(false);
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
      setDemoReady(true);
    });
  }, [actualId]);

  const showComponent = RegistryComponent && demoReady;

  return (
    <div className={`mb-6 bc-border bw-1 ${className || ""}`}>
      <Suspense
        fallback={
          <div data-preview className={PREVIEW_SHELL}>
            <PreviewSpinner />
          </div>
        }
      >
        {showComponent ? (
          <div data-preview className={PREVIEW_SHELL}>
            <RegistryComponent {...demo.props}>
              {demo.children}
            </RegistryComponent>
          </div>
        ) : (
          <div data-preview className={PREVIEW_SHELL}>
            <PreviewSpinner />
          </div>
        )}
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

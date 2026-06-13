"use client";
import { Toggle } from "@base-ui/react/toggle";
import { Expand } from "iconoir-react";
import type { ComponentType } from "react";
import { lazy, type ReactNode, Suspense, useEffect, useState } from "react";
import { getRegistryImport } from "@/registry";

interface Props {
  registryId?: string;
  id?: string;
  className?: string;
  children?: ReactNode;
}

export default function ComponentPreview({
  registryId,
  id,
  className,
  children,
}: Props) {
  const [showCode, setShowCode] = useState(false);
  const [RegistryComponent, setRegistryComponent] =
    useState<ComponentType<object> | null>(null);
  const actualId = registryId || id;

  useEffect(() => {
    if (actualId) {
      const importFn = getRegistryImport(actualId);
      if (importFn) {
        setRegistryComponent(() => lazy(importFn));
      }
    }
  }, [actualId]);

  return (
    <div className={`mb-6 bc-border bw-1 ${className || ""}`}>
      <Suspense fallback={null}>
        {RegistryComponent ? (
          <div data-preview className="d-f p-r ox-auto ai-c jc-c p-10 bg-white">
            <a
              href={`https://registry.yummacss.com/preview/${actualId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="d-f p-a t-2 r-2 ai-c jc-c w-7 h-7 c-page"
              aria-label="Open in registry"
            >
              <Expand className="w-4 h-4" />
            </a>
            <RegistryComponent />
          </div>
        ) : null}
      </Suspense>

      <Toggle
        pressed={showCode}
        onPressedChange={setShowCode}
        className="d-f ai-c jc-c w-100% h-8 bc-border bg-surface c-accent bw-0 bbw-1 fs-sm fw-500 tp-c tdu-150 ttf-io us-none fv:oc-white fv:ow-2"
      >
        {showCode ? "Hide code" : "Show code"}
      </Toggle>

      {showCode && children}
    </div>
  );
}

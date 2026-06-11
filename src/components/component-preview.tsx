"use client";
import { Toggle } from "@base-ui/react/toggle";
import type { ReactNode } from "react";
import { useState } from "react";
import { getRegistryComponent } from "@/registry";

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
  const actualId = registryId || id;
  const RegistryComponent = actualId ? getRegistryComponent(actualId) : null;

  return (
    <div className={`mb-6 bc-border bw-1 ${className || ""}`}>
      {actualId ? (
        <div className="d-f ai-c jc-c h-7 px-4 bc-border bg-surface bbw-1">
          <a
            href={`https://registry.yummacss.com/preview/${actualId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="c-accent h:c-accent-4 fs-sm fw-500 us-none"
          >
            View in fullscreen
          </a>
        </div>
      ) : null}

      {RegistryComponent ? (
        <div data-preview className="d-f ox-auto ai-c jc-c p-10 bg-white">
          <RegistryComponent />
        </div>
      ) : null}

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

"use client";
import { clsx } from "clsx";
import type { ComponentType } from "react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import PreviewSpinner from "@/components/preview-spinner";
import { getRegistryImport } from "@/registry";

type Variant = "centered" | "inline" | "inlineCentered" | "noPadding";

const BASE = "btw-1 brw-1 blw-1 min-h-64";

const VARIANTS: Record<Variant, string> = {
  centered: "d-f ai-c jc-c p-10",
  inline: "d-f fd-c p-4",
  inlineCentered: "d-f jc-c p-10",
  noPadding: "d-f fd-c",
};

interface PreviewProps {
  registryId?: string;
  id?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: Variant;
}

export default function Preview({
  registryId,
  id,
  children,
  variant = "centered",
  className,
}: PreviewProps) {
  const actualId = registryId || id;
  // Defer lazy registry mounts until the client; SSR has no Suspense chunk boundary.
  const [mounted, setMounted] = useState(!actualId);

  useEffect(() => {
    setMounted(true);
  }, []);

  const RegistryComponent = useMemo(() => {
    if (!actualId || !mounted) return null;
    const importFn = getRegistryImport(actualId);
    return importFn ? (lazy(importFn) as ComponentType<object>) : null;
  }, [actualId, mounted]);

  return (
    <div
      data-preview
      className={`${clsx(BASE, VARIANTS[variant], className)} bc-border bg-white`}
    >
      <Suspense fallback={<PreviewSpinner />}>
        {RegistryComponent ? (
          <RegistryComponent />
        ) : actualId ? (
          <PreviewSpinner />
        ) : (
          children
        )}
      </Suspense>
    </div>
  );
}

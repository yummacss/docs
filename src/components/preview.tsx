"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import type { ComponentType } from "react";
import { lazy, Suspense, useMemo } from "react";
import PreviewSpinner from "@/components/preview-spinner";
import { getRegistryImport } from "@/registry";

const previewVariants = cva("btw-1 brw-1 blw-1 min-h-64", {
  variants: {
    variant: {
      centered: "d-f ai-c jc-c p-10",
      inline: "d-f fd-c p-4",
      inlineCentered: "d-f jc-c p-10",
      noPadding: "d-f fd-c",
    },
  },
  defaultVariants: {
    variant: "centered",
  },
});

interface PreviewProps extends VariantProps<typeof previewVariants> {
  registryId?: string;
  id?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Preview({
  registryId,
  id,
  children,
  variant,
  className,
}: PreviewProps) {
  const actualId = registryId || id;

  const RegistryComponent = useMemo(() => {
    if (!actualId) return null;
    const importFn = getRegistryImport(actualId);
    return importFn ? (lazy(importFn) as ComponentType<object>) : null;
  }, [actualId]);

  return (
    <div
      data-preview
      className={`${clsx(previewVariants({ variant }), className)} bc-border bg-white`}
    >
      <Suspense fallback={<PreviewSpinner />}>
        {RegistryComponent ? <RegistryComponent /> : children}
      </Suspense>
    </div>
  );
}

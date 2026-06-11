"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { lazy, Suspense } from "react";
import { getRegistryImport } from "@/registry";

const previewVariants = cva("bg-white btw-1 brw-1 blw-1", {
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
  const importFn = actualId ? getRegistryImport(actualId) : null;
  const RegistryComponent = importFn ? lazy(importFn) : null;

  return (
    <div
      data-preview
      className={`${clsx(previewVariants({ variant }), className)} bc-border`}
    >
      <Suspense fallback={null}>
        {RegistryComponent ? <RegistryComponent /> : children}
      </Suspense>
    </div>
  );
}

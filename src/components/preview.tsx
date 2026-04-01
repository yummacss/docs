"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { registry } from "@/registry/ui";

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
  /** Registry ID for isolated preview (recommended for UI components) */
  registryId?: string;
  id?: string;
  /** Direct children (for simple inline demos, subject to MDX styling) */
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
  // If id is provided, render from registry (isolated from MDX)
  const actualId = registryId || id;
  const RegistryComponent = actualId ? registry[actualId] : null;

  if (actualId && !RegistryComponent) {
    return (
      <div
        className={`${clsx(previewVariants({ variant }), className)}c-red bc-navy`}
      >
        Preview not found: "{actualId}"
      </div>
    );
  }

  return (
    <div
      data-preview
      className={`${clsx(previewVariants({ variant }), className)} bc-navy`}
    >
      {RegistryComponent ? <RegistryComponent /> : children}
    </div>
  );
}

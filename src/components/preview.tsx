import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// Lazy-load registry components individually to avoid pulling the entire
// registry (100+ components) into a single module graph, which causes
// Turbopack to stall during HMR. Each component is loaded on demand via
// next/dynamic with a variable import path, so the bundler creates a
// separate chunk per component.
const dynamicCache = new Map<string, ComponentType>();

function getRegistryComponent(id: string): ComponentType | null {
  if (dynamicCache.has(id)) {
    return dynamicCache.get(id) || null;
  }

  const LazyComponent = dynamic(
    () =>
      import(`@/registry/ui/${id}.tsx`).catch(
        () => import(`@/registry/docs/${id}.tsx`),
      ),
    { ssr: true },
  );

  dynamicCache.set(id, LazyComponent);
  return LazyComponent;
}

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
  const RegistryComponent = actualId ? getRegistryComponent(actualId) : null;

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

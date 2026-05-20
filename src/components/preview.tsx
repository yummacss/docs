import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { getRegistryComponent } from "@/registry";

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

  // perf: never create dynamic() calls at render time.
  const RegistryComponent = actualId ? getRegistryComponent(actualId) : null;

  return (
    <div
      data-preview
      className={`${clsx(previewVariants({ variant }), className)} bc-navy`}
    >
      {RegistryComponent ? <RegistryComponent /> : children}
    </div>
  );
}

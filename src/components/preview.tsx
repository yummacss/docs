"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const previewVariants = cva("bt-1 br-1 bl-1 tc-reset", {
  variants: {
    variant: {
      centered: "d-f ai-c jc-c p-4",
      inline: "d-f fd-c p-4",
      noPadding: "d-f fd-c",
    },
  },
  defaultVariants: {
    variant: "centered",
  },
});

interface PreviewProps extends VariantProps<typeof previewVariants> {
  children: React.ReactNode;
  className?: string;
}

export default function Preview({
  children,
  variant,
  className,
}: PreviewProps) {
  return (
    <div
      className={clsx(previewVariants({ variant }), className)}
      style={{ borderColor: "#31365e" }}
    >
      {children}
    </div>
  );
}

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const previewVariants = cva("p-4 bt-1 br-1 bl-1", {
  variants: {
    variant: {
      centered: "d-f ai-c jc-c",
      inline: "d-f fd-c",
      
    },
  },
  defaultVariants: {
    variant: "centered",
  },
});

interface PreviewProps extends VariantProps<typeof previewVariants> {
  children: React.ReactNode;
  className?: string;
  resize?: boolean;
}

export default function Preview({
  children,
  variant,
  className,
  resize = false,
}: PreviewProps) {
  if (resize) {
    return (
      <PanelGroup direction="horizontal">
        <Panel
          defaultSize={100}
          minSize={30}
          maxSize={100}
          className={clsx(previewVariants({ variant }), className)}
          style={{ borderColor: "#31365e" }}
        >
          {children}
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={0} minSize={0} />
      </PanelGroup>
    );
  }

  return (
    <div
      className={clsx(previewVariants({ variant }), className)}
      style={{ borderColor: "#31365e" }}
    >
      {children}
    </div>
  );
}

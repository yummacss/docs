"use client";

import { ContextMenu } from "@base-ui/react/context-menu";

export default function ContextMenuDisabled() {
  return (
    <ContextMenu.Root disabled>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-silver-3 c-slate-4 bw-1 br-md bs-d fs-sm fw-500 o-50 us-none">
        Permissions
      </ContextMenu.Trigger>
    </ContextMenu.Root>
  );
}

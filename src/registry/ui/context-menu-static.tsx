"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

export default function ContextMenuStatic() {
  const [open, setOpen] = React.useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-silver-2 c-slate-10 bw-1 br-md fs-sm fw-600 us-none">
        Right click here
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Positioner className="ow-0">
          <ContextMenu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-lg">
            <ContextMenu.Item
              className={(state) =>
                `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-sm mx-1 ${
                  state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                }`
              }
            >
              Cut
            </ContextMenu.Item>
            <ContextMenu.Item
              className={(state) =>
                `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-sm mx-1 ${
                  state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                }`
              }
            >
              Copy
            </ContextMenu.Item>
            <ContextMenu.Item
              className={(state) =>
                `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-sm mx-1 ${
                  state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                }`
              }
            >
              Paste
            </ContextMenu.Item>

            <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

            <ContextMenu.Item
              className={(state) =>
                `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-sm mx-1 ${
                  state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                }`
              }
            >
              Select all
            </ContextMenu.Item>
            <ContextMenu.Item
              className={(state) =>
                `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-sm mx-1 ${
                  state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                }`
              }
            >
              Undo
            </ContextMenu.Item>

            <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

            <ContextMenu.Item
              className={(state) =>
                `d-f py-2 pr-8 pl-4 fs-sm us-none c-red c-p br-sm mx-1 ${
                  state.highlighted ? "bg-red-1" : "h:bg-red-1"
                }`
              }
            >
              Delete
            </ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

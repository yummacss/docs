"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import {
  ArrowUturnCcwLeft,
  At,
  CommentSlash,
  Link,
  Pin,
  TrashBin,
} from "@gravity-ui/icons";
import * as React from "react";

export default function ContextMenuStatic() {
  const [open, setOpen] = React.useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-slate-3 c-slate-10 bs-d bw-1 br-lg fs-sm fw-500 us-none">
        Right-click here
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Positioner className="ow-0">
          <ContextMenu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg">
            <ContextMenu.Item
              className={(state) =>
                `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                  state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                }`
              }
            >
              <ArrowUturnCcwLeft className="fs-0 w-4 h-4 c-slate-5" />
              Reply
            </ContextMenu.Item>
            <ContextMenu.Item
              className={(state) =>
                `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                  state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                }`
              }
            >
              <At className="fs-0 w-4 h-4 c-slate-5" />
              Mention
            </ContextMenu.Item>
            <ContextMenu.Item
              className={(state) =>
                `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                  state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                }`
              }
            >
              <Link className="fs-0 w-4 h-4 c-slate-5" />
              Copy message link
            </ContextMenu.Item>

            <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

            <ContextMenu.Item
              className={(state) =>
                `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                  state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                }`
              }
            >
              <Pin className="fs-0 w-4 h-4 c-slate-5" />
              Pin message
            </ContextMenu.Item>
            <ContextMenu.Item
              className={(state) =>
                `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                  state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                }`
              }
            >
              <CommentSlash className="fs-0 w-4 h-4 c-slate-5" />
              Mark unread
            </ContextMenu.Item>

            <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

            <ContextMenu.Item
              className={(state) =>
                `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-red c-p br-lg mx-1 ${
                  state.highlighted ? "bg-red-1/50" : "bg-transparent"
                }`
              }
            >
              <TrashBin className="fs-0 w-4 h-4" />
              Delete message
            </ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

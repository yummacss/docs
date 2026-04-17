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
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ContextMenuShortcuts() {
  const [open, setOpen] = React.useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-slate-3 c-slate-10 bs-d bw-1 br-lg fs-sm fw-600 us-none">
        Right-click here
      </ContextMenu.Trigger>

      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner className="ow-0">
              <ContextMenu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                }
                className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg"
              >
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-600 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">
                    <ArrowUturnCcwLeft className="fs-0 w-4 h-4 c-slate-5" />
                    Reply
                  </span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <span>⌘</span>
                    <span>R</span>
                  </span>
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-600 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">
                    <At className="fs-0 w-4 h-4 c-slate-5" />
                    Mention
                  </span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <span>⌘</span>
                    <span>M</span>
                  </span>
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-600 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">
                    <Link className="fs-0 w-4 h-4 c-slate-5" />
                    Copy message link
                  </span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <span>⌘</span>
                    <span>⇧</span>
                    <span>C</span>
                  </span>
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-600 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">
                    <Pin className="fs-0 w-4 h-4 c-slate-5" />
                    Pin message
                  </span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <span>⌘</span>
                    <span>P</span>
                  </span>
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-600 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">
                    <CommentSlash className="fs-0 w-4 h-4 c-slate-5" />
                    Mark unread
                  </span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <span>⌘</span>
                    <span>⇧</span>
                    <span>U</span>
                  </span>
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-600 us-none c-red c-p br-lg mx-1 ${
                      state.highlighted ? "bg-red-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">
                    <TrashBin className="fs-0 w-4 h-4" />
                    Delete message
                  </span>
                  <span className="d-f ai-c g-1 c-red fw-400 fs-xs">
                    <span>⌘</span>
                    <span>⌫</span>
                  </span>
                </ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}

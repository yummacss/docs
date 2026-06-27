"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { Bookmark, Copy, Edit, Link, Pin, ShareIos } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ContextMenuIconTrailing() {
  const [open, setOpen] = useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="bg-white d-f ai-c jc-c h-48 w-60 bc-slate-3 c-slate-10 bs-d bw-1 br-lg fs-sm fw-500 us-none">
        Right-click task
      </ContextMenu.Trigger>

      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner className="ow-0" sideOffset={8}>
              <ContextMenu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-xxl bs-o-xs"
              >
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-2 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="fg-1">Edit</span>
                  <Edit className="fs-0 w-4 h-4 c-slate-5" />
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-2 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="fg-1">Duplicate</span>
                  <Copy className="fs-0 w-4 h-4 c-slate-5" />
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-2 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="fg-1">Share</span>
                  <ShareIos className="fs-0 w-4 h-4 c-slate-5" />
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-2 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="fg-1">Copy link</span>
                  <Link className="fs-0 w-4 h-4 c-slate-5" />
                </ContextMenu.Item>
                <ContextMenu.Separator className="my-1 w-100% h-px bg-silver-2" />
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-2 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="fg-1">Bookmark</span>
                  <Bookmark className="fs-0 w-4 h-4 c-slate-5" />
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-2 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="fg-1">Pin to top</span>
                  <Pin className="fs-0 w-4 h-4 c-slate-5" />
                </ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}

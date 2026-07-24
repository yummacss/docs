"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { Bookmark, Copy, Edit, Link, Pin, ShareIos } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ContextMenuIcons() {
  const [open, setOpen] = useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="bg-white d-f ai-c jc-c h-48 w-60 bc-slate-3 c-slate-10 bs-d bw-1 br-xxl cs-s fs-sm fw-500 us-none">
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
                className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-xxl"
              >
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-3 pl-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${
                      state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                    }`
                  }
                >
                  <Edit className="fs-0 w-4 h-4 c-slate-5" />
                  Edit
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-3 pl-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${
                      state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                    }`
                  }
                >
                  <Copy className="fs-0 w-4 h-4 c-slate-5" />
                  Duplicate
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-3 pl-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${
                      state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                    }`
                  }
                >
                  <ShareIos className="fs-0 w-4 h-4 c-slate-5" />
                  Share
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-3 pl-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${
                      state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                    }`
                  }
                >
                  <Link className="fs-0 w-4 h-4 c-slate-5" />
                  Copy link
                </ContextMenu.Item>
                <ContextMenu.Separator className="my-1 w-100% h-px bg-silver-2" />
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-3 pl-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${
                      state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                    }`
                  }
                >
                  <Bookmark className="fs-0 w-4 h-4 c-slate-5" />
                  Bookmark
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-3 pl-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${
                      state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                    }`
                  }
                >
                  <Pin className="fs-0 w-4 h-4 c-slate-5" />
                  Pin to top
                </ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}

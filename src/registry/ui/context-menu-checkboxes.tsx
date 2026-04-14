"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { Check } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ContextMenuCheckboxes() {
  const [open, setOpen] = React.useState(false);
  const [allMessages, setAllMessages] = React.useState(true);
  const [mentions, setMentions] = React.useState(true);
  const [dm, setDm] = React.useState(false);
  const [muted, setMuted] = React.useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-slate-3 bs-d c-slate-10 bw-1 br-lg fs-sm fw-600 us-none">
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
                className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg w-52"
              >
                <div className="px-3 py-1 fs-xs fw-600 c-slate-5 tt-u ls-3">
                  Notification settings
                </div>

                <ContextMenu.CheckboxItem
                  checked={allMessages}
                  onCheckedChange={setAllMessages}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-600 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c w-4 h-4 br-sm fs-0 bw-1 bc-silver-3">
                    <ContextMenu.CheckboxItemIndicator>
                      <Check className="w-3 h-3 c-indigo" />
                    </ContextMenu.CheckboxItemIndicator>
                  </span>
                  All messages
                </ContextMenu.CheckboxItem>

                <ContextMenu.CheckboxItem
                  checked={mentions}
                  onCheckedChange={setMentions}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-600 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c w-4 h-4 br-sm fs-0 bw-1 bc-silver-3">
                    <ContextMenu.CheckboxItemIndicator>
                      <Check className="w-3 h-3 c-indigo" />
                    </ContextMenu.CheckboxItemIndicator>
                  </span>
                  @mentions only
                </ContextMenu.CheckboxItem>

                <ContextMenu.CheckboxItem
                  checked={dm}
                  onCheckedChange={setDm}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-600 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c w-4 h-4 br-sm fs-0 bw-1 bc-silver-3">
                    <ContextMenu.CheckboxItemIndicator>
                      <Check className="w-3 h-3 c-indigo" />
                    </ContextMenu.CheckboxItemIndicator>
                  </span>
                  DMs only
                </ContextMenu.CheckboxItem>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.CheckboxItem
                  checked={muted}
                  onCheckedChange={setMuted}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-600 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c w-4 h-4 br-sm fs-0 bw-1 bc-silver-3">
                    <ContextMenu.CheckboxItemIndicator>
                      <Check className="w-3 h-3 c-indigo" />
                    </ContextMenu.CheckboxItemIndicator>
                  </span>
                  Mute channel
                </ContextMenu.CheckboxItem>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}

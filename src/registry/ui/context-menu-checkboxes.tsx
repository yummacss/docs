"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { Check } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExampleContextMenu() {
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [extensions, setExtensions] = React.useState(true);
  const [ascending, setAscending] = React.useState(false);
  const [preview, setPreview] = React.useState(true);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-silver-2 c-slate-10 bw-1 br-md fs-sm fw-600 us-none">
        Right click here
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
                className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-lg w-52"
              >
                <div className="px-3 py-1 fs-xs fw-600 c-slate-5 tt-u ls-3">
                  View options
                </div>

                <ContextMenu.CheckboxItem
                  checked={hidden}
                  onCheckedChange={setHidden}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm us-none c-p br-sm mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c w-4 h-4 br-sm fs-0 bw-1 bc-silver-3">
                    <ContextMenu.CheckboxItemIndicator>
                      <Check className="w-2.5 h-2.5 c-indigo" />
                    </ContextMenu.CheckboxItemIndicator>
                  </span>
                  Show hidden files
                </ContextMenu.CheckboxItem>

                <ContextMenu.CheckboxItem
                  checked={extensions}
                  onCheckedChange={setExtensions}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm us-none c-p br-sm mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c w-4 h-4 br-sm fs-0 bw-1 bc-silver-3">
                    <ContextMenu.CheckboxItemIndicator>
                      <Check className="w-2.5 h-2.5 c-indigo" />
                    </ContextMenu.CheckboxItemIndicator>
                  </span>
                  Show file extensions
                </ContextMenu.CheckboxItem>

                <ContextMenu.CheckboxItem
                  checked={ascending}
                  onCheckedChange={setAscending}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm us-none c-p br-sm mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c w-4 h-4 br-sm fs-0 bw-1 bc-silver-3">
                    <ContextMenu.CheckboxItemIndicator>
                      <Check className="w-2.5 h-2.5 c-indigo" />
                    </ContextMenu.CheckboxItemIndicator>
                  </span>
                  Sort ascending
                </ContextMenu.CheckboxItem>

                <ContextMenu.Separator className="mx-4 my-1 h-px bg-silver-2" />

                <ContextMenu.CheckboxItem
                  checked={preview}
                  onCheckedChange={setPreview}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm us-none c-p br-sm mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c w-4 h-4 br-sm fs-0 bw-1 bc-silver-3">
                    <ContextMenu.CheckboxItemIndicator>
                      <Check className="w-2.5 h-2.5 c-indigo" />
                    </ContextMenu.CheckboxItemIndicator>
                  </span>
                  Show preview pane
                </ContextMenu.CheckboxItem>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}

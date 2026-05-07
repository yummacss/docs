"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { CircleFill } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ContextMenuRadios() {
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recent");

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-slate-3 c-slate-10 bs-d bw-1 br-lg fs-sm fw-500 us-none">
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
                className="py-1 w-48 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs"
              >
                <div className="px-3 py-1 c-slate-5 fs-xs fw-500 tt-u ls-3">
                  Sort messages
                </div>

                <ContextMenu.RadioGroup
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  {sortOptions.map((option) => (
                    <ContextMenu.RadioItem
                      key={option.value}
                      value={option.value}
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-pill bw-1">
                        <ContextMenu.RadioItemIndicator>
                          <CircleFill className="w-2 h-2 c-indigo" />
                        </ContextMenu.RadioItemIndicator>
                      </span>
                      {option.label}
                    </ContextMenu.RadioItem>
                  ))}
                </ContextMenu.RadioGroup>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}

const sortOptions = [
  { value: "recent", label: "Recent activity" },
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
];

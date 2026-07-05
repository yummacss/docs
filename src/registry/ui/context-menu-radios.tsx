"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { Circle } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ContextMenuRadios() {
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState("recent");

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="bg-white d-f ai-c jc-c h-48 w-60 bc-slate-3 c-slate-10 bs-d bw-1 br-xxl cs-s fs-sm fw-500 us-none">
        Right-click task
      </ContextMenu.Trigger>

      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner className="ow-0">
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
                <div className="px-3 py-1 c-slate-5 fs-xs fw-500 ls-3">
                  Sort tasks
                </div>

                <ContextMenu.RadioGroup
                  value={account}
                  onValueChange={setAccount}
                >
                  {sortOptions.map((option) => (
                    <ContextMenu.RadioItem
                      key={option.value}
                      value={option.value}
                      render={(props) => (
                        <motion.div
                          {...(props as HTMLMotionProps<"div">)}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                        />
                      )}
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-9999 bw-1">
                        <ContextMenu.RadioItemIndicator>
                          <Circle
                            className="w-2 h-2 c-indigo"
                            style={{ fill: "currentColor" }}
                          />
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
  { value: "recent", label: "Recent updates" },
  { value: "newest", label: "Due soonest" },
  { value: "oldest", label: "Due latest" },
];

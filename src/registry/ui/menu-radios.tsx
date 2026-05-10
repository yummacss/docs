"use client";

import { Menu } from "@base-ui/react/menu";
import { ChevronDown, CircleFill } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenuRadios() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("grid");

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        View <ChevronDown className="w-3 h-3" />
      </Menu.Trigger>

      <AnimatePresence>
        {open && (
          <Menu.Portal keepMounted>
            <Menu.Positioner className="ow-0" sideOffset={8}>
              <Menu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="py-1 w-48 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs"
              >
                <div className="px-3 py-1 c-slate-5 fs-xs fw-500 tt-u ls-3">
                  Display
                </div>

                <Menu.RadioGroup value={view} onValueChange={setView}>
                  {viewOptions.map((option) => (
                    <Menu.RadioItem
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
                        <Menu.RadioItemIndicator>
                          <CircleFill className="w-2 h-2 c-indigo" />
                        </Menu.RadioItemIndicator>
                      </span>
                      {option.label}
                    </Menu.RadioItem>
                  ))}
                </Menu.RadioGroup>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </AnimatePresence>
    </Menu.Root>
  );
}

const viewOptions = [
  { value: "board", label: "Board view" },
  { value: "list", label: "List view" },
  { value: "calendar", label: "Calendar view" },
  { value: "timeline", label: "Timeline view" },
];

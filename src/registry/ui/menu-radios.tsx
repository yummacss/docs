"use client";

import { Menu } from "@base-ui/react/menu";
import { Circle, NavArrowDown } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenuRadios() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("recent");

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5">
        Sort <NavArrowDown className="w-3 h-3" />
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
                className="o-h py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs"
              >
                <div className="px-3 py-1 c-slate-5 fs-xs fw-500 ls-3">
                  Sort tasks
                </div>

                <Menu.RadioGroup value={sort} onValueChange={setSort}>
                  {sortOptions.map((option) => (
                    <Menu.RadioItem
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
                        `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-9999 bw-1">
                        <Menu.RadioItemIndicator>
                          <Circle
                            className="w-2 h-2 c-indigo"
                            style={{ fill: "currentColor" }}
                          />
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

const sortOptions = [
  { value: "recent", label: "Recent updates" },
  { value: "newest", label: "Due soonest" },
  { value: "oldest", label: "Due latest" },
];

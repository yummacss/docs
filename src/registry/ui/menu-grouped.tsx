"use client";

import { Menu } from "@base-ui/react/menu";
import { NavArrowDown } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenuGrouped() {
  const [open, setOpen] = useState(false);

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5">
        Settings <NavArrowDown className="w-3 h-3" />
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
                className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-xxl bs-o-xs"
              >
                <Menu.Group>
                  <div className="px-3 py-1 fs-xs fw-600 c-slate-5 us-none">
                    Quick Actions
                  </div>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Duplicate
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Bookmark
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Pin to top
                  </Menu.Item>
                </Menu.Group>

                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <Menu.Group>
                  <div className="px-3 py-1 fs-xs fw-600 c-slate-5 us-none">
                    Share & Export
                  </div>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Share
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Copy link
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Print
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Archive
                  </Menu.Item>
                </Menu.Group>

                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <Menu.Group>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 c-red ${
                        state.highlighted ? "bg-red-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Delete
                  </Menu.Item>
                </Menu.Group>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </AnimatePresence>
    </Menu.Root>
  );
}

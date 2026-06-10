"use client";

import { Menu } from "@base-ui/react/menu";
import { KeyCommand, NavArrowDown } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenuShortcuts() {
  const [open, setOpen] = useState(false);

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5">
        Page <NavArrowDown className="w-3 h-3" />
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
                className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs"
              >
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-2 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="fg-1">Edit</span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs ml-4">
                    <KeyCommand className="w-3 h-3" />
                    <span>E</span>
                  </span>
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-2 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="fg-1">Duplicate</span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs ml-4">
                    <KeyCommand className="w-3 h-3" />
                    <span>D</span>
                  </span>
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-2 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="fg-1">Bookmark</span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs ml-4">
                    <KeyCommand className="w-3 h-3" />
                    <span>B</span>
                  </span>
                </Menu.Item>
                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-2 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="fg-1">Copy link</span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs ml-4">
                    <KeyCommand className="w-3 h-3" />
                    <span>L</span>
                  </span>
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-2 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="fg-1">Print</span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs ml-4">
                    <KeyCommand className="w-3 h-3" />
                    <span>P</span>
                  </span>
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-2 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="fg-1">Mute notifications</span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs ml-4">
                    <KeyCommand className="w-3 h-3" />
                    <span>M</span>
                  </span>
                </Menu.Item>
                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-2 fs-sm fw-500 us-none c-p br-md mx-1 c-red ${
                      state.highlighted ? "bg-red-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="fg-1">Delete</span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs ml-4">
                    <KeyCommand className="w-3 h-3" />
                    <span>D</span>
                  </span>
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </AnimatePresence>
    </Menu.Root>
  );
}

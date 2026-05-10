"use client";

import { Menu } from "@base-ui/react/menu";
import {
  ChevronDown,
  Copy,
  Link,
  PencilToSquare,
  Pin,
  TrashBin,
  Tray,
} from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenuShortcuts() {
  const [open, setOpen] = useState(false);

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f b-0 ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        File <ChevronDown className="w-3 h-3" />
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
                className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs"
              >
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">
                    <PencilToSquare className="fs-0 w-4 h-4 c-slate-5" />
                    Edit task
                  </span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <span>F2</span>
                  </span>
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">
                    <Copy className="fs-0 w-4 h-4 c-slate-5" />
                    Duplicate task
                  </span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <span>⌘</span>
                    <span>D</span>
                  </span>
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">
                    <Link className="fs-0 w-4 h-4 c-slate-5" />
                    Copy link
                  </span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <span>⌘</span>
                    <span>⇧</span>
                    <span>C</span>
                  </span>
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">
                    <Pin className="fs-0 w-4 h-4 c-slate-5" />
                    Pin task
                  </span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <span>⌘</span>
                    <span>P</span>
                  </span>
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">
                    <Tray className="fs-0 w-4 h-4 c-slate-5" />
                    Archive task
                  </span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <span>⌘</span>
                    <span>E</span>
                  </span>
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">
                    <TrashBin className="fs-0 w-4 h-4 c-slate-5" />
                    Delete task
                  </span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <span>⌘</span>
                    <span>⌫</span>
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

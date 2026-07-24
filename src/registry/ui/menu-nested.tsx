"use client";

import { Menu } from "@base-ui/react/menu";
import {
  Archive,
  BellOff,
  Bookmark,
  ClockRotateRight,
  Copy,
  Edit,
  Label,
  NavArrowDown,
  PrintingPage,
  Trash,
  TriangleFlag,
} from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenuNested() {
  const [open, setOpen] = useState(false);

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5">
        Organize <NavArrowDown className="w-3 h-3" />
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
                className="py-1 w-48 bg-white bc-silver-2 c-slate-10 bw-1 br-xxl bs-o-xs"
              >
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                  }
                >
                  <Edit className="fs-0 w-4 h-4 c-slate-5" />
                  Edit
                </Menu.Item>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                  }
                >
                  <Copy className="fs-0 w-4 h-4 c-slate-5" />
                  Duplicate
                </Menu.Item>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                  }
                >
                  <Bookmark className="fs-0 w-4 h-4 c-slate-5" />
                  Bookmark
                </Menu.Item>

                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                  }
                >
                  <PrintingPage className="fs-0 w-4 h-4 c-slate-5" />
                  Print
                </Menu.Item>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                  }
                >
                  <Label className="fs-0 w-4 h-4 c-slate-5" />
                  Add label
                </Menu.Item>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                  }
                >
                  <TriangleFlag className="fs-0 w-4 h-4 c-slate-5" />
                  Set priority
                </Menu.Item>

                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                  }
                >
                  <ClockRotateRight className="fs-0 w-4 h-4 c-slate-5" />
                  Version history
                </Menu.Item>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                  }
                >
                  <BellOff className="fs-0 w-4 h-4 c-slate-5" />
                  Mute notifications
                </Menu.Item>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                  }
                >
                  <Archive className="fs-0 w-4 h-4 c-slate-5" />
                  Archive
                </Menu.Item>

                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-red c-p br-xl mx-1 ${
                      state.highlighted ? "bg-red-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <Trash className="fs-0 w-4 h-4 c-red" />
                  Delete
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </AnimatePresence>
    </Menu.Root>
  );
}

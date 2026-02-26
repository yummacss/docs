"use client";

import { Menu } from "@base-ui/react/menu";
import { CaretDownIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExampleMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f b-0 ai-c g-2 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-2 bw-1 fw-600 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        Actions <CaretDownIcon size={12} />
      </Menu.Trigger>

      <AnimatePresence>
        {open && (
          <Menu.Portal keepMounted>
            <Menu.Positioner className="ow-0" sideOffset={8}>
              <Menu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                }
                className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-2 bs-o-lg"
              >
                <Menu.Item
                  className={(state) =>
                    `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-1 mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-1 mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  Duplicate
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-1 mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  Archive
                </Menu.Item>

                <Menu.Separator className="mx-4 my-1 h-px bg-silver-2" />

                <Menu.Item
                  className={(state) =>
                    `d-f py-2 pr-8 pl-4 fs-sm us-none c-p c-red br-1 mx-1 ${
                      state.highlighted ? "bg-red-1" : "h:bg-red-1"
                    }`
                  }
                >
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

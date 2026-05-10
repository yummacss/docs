"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Menu } from "@base-ui/react/menu";
import {
  ArrowRightFromSquare,
  Check,
  Gear,
  House,
  Moon,
} from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenuAccount() {
  const [open, setOpen] = useState(false);

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f b-0 ai-c g-3 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5">
        <Avatar.Root className="d-if o-h ai-c jc-c w-8 h-8 bc-white br-pill bw-1 va-m us-none">
          <Avatar.Image
            src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9"
            alt="Sarah"
            className="of-c w-full h-full"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-8 fs-xs">
            S
          </Avatar.Fallback>
        </Avatar.Root>
        <span className="fs-sm fw-500">Sarah</span>
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
                    `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <House className="fs-0 w-4 h-4 c-slate-5" />
                  View profile
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <Gear className="fs-0 w-4 h-4 c-slate-5" />
                  Account settings
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-4 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2">
                    <Moon className="fs-0 w-4 h-4 c-slate-5" />
                    Dark mode
                  </span>
                  <Check className="fs-0 w-4 h-4 c-indigo" />
                </Menu.Item>
                <Menu.Separator className="my-1 w-full h-px bg-silver-2" />
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-red c-p br-lg mx-1 ${
                      state.highlighted ? "bg-red-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <ArrowRightFromSquare className="fs-0 w-4 h-4" />
                  Sign out
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </AnimatePresence>
    </Menu.Root>
  );
}

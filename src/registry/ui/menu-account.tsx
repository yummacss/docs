"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Checkbox } from "@base-ui/react/checkbox";
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
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
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
                  <Checkbox.Root
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    className={(state) =>
                      `d-f w-4 h-4 ai-c jc-c br-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
                        state.checked
                          ? "bg-indigo"
                          : "bw-1 bc-silver-3 bg-transparent bs-o-xs"
                      }`
                    }
                  >
                    <Checkbox.Indicator className="d-f c-white">
                      <Check className="w-3 h-3" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
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

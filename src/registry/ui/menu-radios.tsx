"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Menu } from "@base-ui/react/menu";
import {
  Circle,
  LogOut,
  NavArrowDown,
  Plus,
  User,
  Wrench,
} from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenuRadios() {
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState("sarah");

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5">
        Account <NavArrowDown className="w-3 h-3" />
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
                className="o-h py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs"
              >
                <Menu.Item
                  render={(props) => (
                    <motion.div
                      {...(props as HTMLMotionProps<"div">)}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    />
                  )}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <User className="fs-0 w-4 h-4 c-slate-5" />
                  View profile
                </Menu.Item>
                <Menu.Item
                  render={(props) => (
                    <motion.div
                      {...(props as HTMLMotionProps<"div">)}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    />
                  )}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <Wrench className="fs-0 w-4 h-4 c-slate-5" />
                  Settings
                </Menu.Item>
                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />
                <div className="px-3 py-1 c-slate-5 fs-xs fw-500 ls-3">
                  Switch account
                </div>

                <Menu.RadioGroup value={account} onValueChange={setAccount}>
                  <Menu.RadioItem
                    value="sarah"
                    render={(props) => (
                      <motion.div
                        {...(props as HTMLMotionProps<"div">)}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      />
                    )}
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-4 pl-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Avatar.Root className="d-if o-h ai-c jc-c w-5 h-5 bc-white br-9999 bw-1 va-m us-none">
                      <Avatar.Image
                        src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9"
                        alt="Sarah"
                        className="of-c w-100% h-100%"
                      />
                      <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-xs">
                        S
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <span className="fs-sm fw-500">Sarah</span>
                    <span className="d-f ai-c jc-c fs-0 w-3 h-3 ml-auto bc-silver-3 br-9999 bw-1">
                      <Menu.RadioItemIndicator>
                        <Circle
                          className="w-2 h-2 c-indigo"
                          style={{ fill: "currentColor" }}
                        />
                      </Menu.RadioItemIndicator>
                    </span>
                  </Menu.RadioItem>

                  <Menu.RadioItem
                    value="john"
                    render={(props) => (
                      <motion.div
                        {...(props as HTMLMotionProps<"div">)}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      />
                    )}
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-4 pl-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Avatar.Root className="d-if o-h ai-c jc-c w-5 h-5 bc-white br-9999 bw-1 va-m us-none">
                      <Avatar.Image
                        src="https://api.dicebear.com/9.x/open-peeps/svg?seed=John&backgroundColor=c0a0f0"
                        alt="John"
                        className="of-c w-100% h-100%"
                      />
                      <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-xs">
                        J
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <span className="fs-sm fw-500">John</span>
                    <span className="d-f ai-c jc-c fs-0 w-3 h-3 ml-auto bc-silver-3 br-9999 bw-1">
                      <Menu.RadioItemIndicator>
                        <Circle
                          className="w-2 h-2 c-indigo"
                          style={{ fill: "currentColor" }}
                        />
                      </Menu.RadioItemIndicator>
                    </span>
                  </Menu.RadioItem>
                </Menu.RadioGroup>

                <Menu.Item
                  render={(props) => (
                    <motion.div
                      {...(props as HTMLMotionProps<"div">)}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    />
                  )}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <Plus className="fs-0 w-4 h-4 c-slate-5" />
                  Add account
                </Menu.Item>

                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />
                <Menu.Item
                  render={(props) => (
                    <motion.div
                      {...(props as HTMLMotionProps<"div">)}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    />
                  )}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-red c-p br-md mx-1 ${
                      state.highlighted ? "bg-red-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <LogOut className="fs-0 w-4 h-4" />
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

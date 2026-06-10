"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Menu } from "@base-ui/react/menu";
import {
  ClipboardCheck,
  Folder,
  HelpCircle,
  LogOut,
  NavArrowDown,
  NavArrowRight,
  User,
  Wrench,
} from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenuAccountStatus() {
  const [open, setOpen] = useState(false);

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5">
        <div className="p-r">
          <Avatar.Root className="d-if o-h ai-c jc-c w-6 h-6 bc-white br-9999 bw-1 va-m us-none">
            <Avatar.Image
              src="https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9"
              alt="John"
              className="of-c w-100% h-100%"
            />
            <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-xs">
              S
            </Avatar.Fallback>
          </Avatar.Root>
          <span className="p-a b-0 r-0 w-2 h-2 bg-mint bc-white br-9999 bw-1" />
        </div>
        <span className="fs-sm fw-500">John</span>
        <NavArrowDown className="w-3 h-3" />
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
                    `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <User className="fs-0 w-4 h-4 c-slate-5" />
                  View profile
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <ClipboardCheck className="fs-0 w-4 h-4 c-slate-5" />
                  My tasks
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <Folder className="fs-0 w-4 h-4 c-slate-5" />
                  My projects
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <Wrench className="fs-0 w-4 h-4 c-slate-5" />
                  Settings
                </Menu.Item>
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <HelpCircle className="fs-0 w-4 h-4 c-slate-5" />
                  Help
                </Menu.Item>
                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />
                <Menu.SubmenuRoot>
                  <Menu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-4 pl-4 fs-sm fw-500 us-none c-p br-md mx-1 w-100% ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-3">
                      <span className="d-f ai-c jc-c fs-0 w-3 h-3 bc-silver-3 br-9999">
                        <span className="d-b w-2 h-2 bg-mint br-9999" />
                      </span>
                      Online
                    </span>
                    <NavArrowRight className="fs-0 w-3 h-3 c-slate-5" />
                  </Menu.SubmenuTrigger>
                  <Menu.Portal>
                    <Menu.Positioner sideOffset={-4} alignOffset={-4}>
                      <Menu.Popup className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs">
                        <Menu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`
                          }
                        >
                          <span className="d-f ai-c jc-c fs-0 w-3 h-3 bc-silver-3 br-9999">
                            <span className="d-b w-2 h-2 bg-mint br-9999" />
                          </span>
                          Online
                        </Menu.Item>
                        <Menu.Item
                          className={(state) =>
                            `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`
                          }
                        >
                          <span className="d-f ai-c jc-c fs-0 w-3 h-3 bc-silver-3 br-9999">
                            <span className="d-b w-2 h-2 bg-yellow br-9999" />
                          </span>
                          Away
                        </Menu.Item>
                        <Menu.Item
                          className={(state) =>
                            `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`
                          }
                        >
                          <span className="d-f ai-c jc-c fs-0 w-3 h-3 bc-silver-3 br-9999">
                            <span className="d-b w-2 h-2 bg-red br-9999" />
                          </span>
                          Do not disturb
                        </Menu.Item>
                        <Menu.Item
                          className={(state) =>
                            `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`
                          }
                        >
                          <span className="d-f ai-c jc-c fs-0 w-3 h-3 bc-silver-3 br-9999">
                            <span className="d-b w-2 h-2 bg-silver br-9999" />
                          </span>
                          Invisible
                        </Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.SubmenuRoot>
                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />
                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-red c-p br-md mx-1 ${
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

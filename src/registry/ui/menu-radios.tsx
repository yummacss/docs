"use client";

import { Menu } from "@base-ui/react/menu";
import { Avatar } from "@base-ui/react/avatar";
import {
  Check,
  ChevronDown,
  ChevronRight,
  CircleFill,
  Plus,
} from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenuRadios() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("grid");
  const [account, setAccount] = useState("sarah");

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        View <ChevronDown className="w-3 h-3" />
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
                <div className="px-3 py-1 c-slate-5 fs-xs fw-500 tt-u ls-3">
                  Display
                </div>

                <Menu.RadioGroup value={view} onValueChange={setView}>
                  {viewOptions.map((option) => (
                    <Menu.RadioItem
                      key={option.value}
                      value={option.value}
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-pill bw-1">
                        <Menu.RadioItemIndicator>
                          <CircleFill className="w-2 h-2 c-indigo" />
                        </Menu.RadioItemIndicator>
                      </span>
                      {option.label}
                    </Menu.RadioItem>
                  ))}
                </Menu.RadioGroup>

                <Menu.Separator className="my-1 w-full h-px bg-silver-2" />
                <div className="px-3 py-1 c-slate-5 fs-xs fw-500 tt-u ls-3">
                  Switch account
                </div>

                <Menu.SubmenuRoot>
                  <Menu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-4 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 w-full ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2">
                      <Avatar.Root className="d-if o-h ai-c jc-c w-5 h-5 bc-white br-pill bw-1 va-m us-none">
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
                    </span>
                    <span className="d-f ai-c jc-c fs-0 w-3 h-3 bc-silver-3 br-sm bw-1">
                      <ChevronRight className="w-3 h-3 c-slate-5" />
                    </span>
                  </Menu.SubmenuTrigger>
                  <Menu.Portal>
                    <Menu.Positioner sideOffset={-4} alignOffset={-4}>
                      <Menu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs">
                        <Menu.RadioGroup
                          value={account}
                          onValueChange={setAccount}
                        >
                          <Menu.RadioItem
                            value="sarah"
                            className={(state) =>
                              `d-f ai-c g-2 py-2 pr-4 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 w-full ${
                                state.highlighted
                                  ? "bg-silver-1/50"
                                  : "bg-transparent"
                              }`
                            }
                          >
                            <Avatar.Root className="d-if o-h ai-c jc-c w-5 h-5 bc-white br-pill bw-1 va-m us-none">
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
                            <span className="d-f ai-c jc-c fs-0 w-3 h-3 bc-silver-3 br-pill bw-1 ml-auto">
                              <Menu.RadioItemIndicator>
                                <CircleFill className="w-2 h-2 c-indigo" />
                              </Menu.RadioItemIndicator>
                            </span>
                          </Menu.RadioItem>

                          <Menu.RadioItem
                            value="john"
                            className={(state) =>
                              `d-f ai-c g-2 py-2 pr-4 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 w-full ${
                                state.highlighted
                                  ? "bg-silver-1/50"
                                  : "bg-transparent"
                              }`
                            }
                          >
                            <Avatar.Root className="d-if o-h ai-c jc-c w-5 h-5 bc-white br-pill bw-1 va-m us-none">
                              <Avatar.Image
                                src="https://api.dicebear.com/9.x/open-peeps/svg?seed=John&backgroundColor=c0a0f0"
                                alt="John"
                                className="of-c w-full h-full"
                              />
                              <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-8 fs-xs">
                                J
                              </Avatar.Fallback>
                            </Avatar.Root>
                            <span className="fs-sm fw-500">John</span>
                            <span className="d-f ai-c jc-c fs-0 w-3 h-3 bc-silver-3 br-pill bw-1 ml-auto">
                              <Menu.RadioItemIndicator>
                                <CircleFill className="w-2 h-2 c-indigo" />
                              </Menu.RadioItemIndicator>
                            </span>
                          </Menu.RadioItem>
                        </Menu.RadioGroup>

                        <Menu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`
                          }
                        >
                          <Plus className="fs-0 w-4 h-4 c-slate-5" />
                          Add account
                        </Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.SubmenuRoot>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </AnimatePresence>
    </Menu.Root>
  );
}

const viewOptions = [
  { value: "board", label: "Board view" },
  { value: "list", label: "List view" },
  { value: "calendar", label: "Calendar view" },
  { value: "timeline", label: "Timeline view" },
];
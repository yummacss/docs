"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { Check } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarCheckboxes() {
  const [viewOpen, setViewOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [labelsOpen, setLabelsOpen] = useState(false);

  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-lg bw-1">
      <Menu.Root open={viewOpen} onOpenChange={setViewOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
            }`
          }
        >
          View
        </Menu.Trigger>
        <AnimatePresence>
          {viewOpen && (
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-xxl bw-1 bs-o-xs"
                >
                  <div className="px-3 py-1 c-slate-5 fs-xs fw-500 ls-3">
                    Show views
                  </div>

                  <Menu.CheckboxItem
                    defaultChecked
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                      <Menu.CheckboxItemIndicator>
                        <Check className="w-3 h-3 c-indigo" />
                      </Menu.CheckboxItemIndicator>
                    </span>
                    Board view
                  </Menu.CheckboxItem>

                  <Menu.CheckboxItem
                    defaultChecked
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                      <Menu.CheckboxItemIndicator>
                        <Check className="w-3 h-3 c-indigo" />
                      </Menu.CheckboxItemIndicator>
                    </span>
                    List view
                  </Menu.CheckboxItem>

                  <Menu.CheckboxItem
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                      <Menu.CheckboxItemIndicator>
                        <Check className="w-3 h-3 c-indigo" />
                      </Menu.CheckboxItemIndicator>
                    </span>
                    Calendar view
                  </Menu.CheckboxItem>

                  <Menu.CheckboxItem
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                      <Menu.CheckboxItemIndicator>
                        <Check className="w-3 h-3 c-indigo" />
                      </Menu.CheckboxItemIndicator>
                    </span>
                    Keyframes view
                  </Menu.CheckboxItem>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={priorityOpen} onOpenChange={setPriorityOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
            }`
          }
        >
          Priority
        </Menu.Trigger>
        <AnimatePresence>
          {priorityOpen && (
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-xxl bw-1 bs-o-xs"
                >
                  <Menu.CheckboxItem
                    defaultChecked
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                      <Menu.CheckboxItemIndicator>
                        <Check className="w-3 h-3 c-indigo" />
                      </Menu.CheckboxItemIndicator>
                    </span>
                    Show priority
                  </Menu.CheckboxItem>

                  <Menu.CheckboxItem
                    defaultChecked
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                      <Menu.CheckboxItemIndicator>
                        <Check className="w-3 h-3 c-indigo" />
                      </Menu.CheckboxItemIndicator>
                    </span>
                    Show labels
                  </Menu.CheckboxItem>

                  <Menu.CheckboxItem
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                      <Menu.CheckboxItemIndicator>
                        <Check className="w-3 h-3 c-indigo" />
                      </Menu.CheckboxItemIndicator>
                    </span>
                    Show assignee
                  </Menu.CheckboxItem>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={labelsOpen} onOpenChange={setLabelsOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
            }`
          }
        >
          Labels
        </Menu.Trigger>
        <AnimatePresence>
          {labelsOpen && (
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-xxl bw-1 bs-o-xs"
                >
                  <Menu.CheckboxItem
                    defaultChecked
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                      <Menu.CheckboxItemIndicator>
                        <Check className="w-3 h-3 c-indigo" />
                      </Menu.CheckboxItemIndicator>
                    </span>
                    Bug
                  </Menu.CheckboxItem>

                  <Menu.CheckboxItem
                    defaultChecked
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                      <Menu.CheckboxItemIndicator>
                        <Check className="w-3 h-3 c-indigo" />
                      </Menu.CheckboxItemIndicator>
                    </span>
                    Feature
                  </Menu.CheckboxItem>

                  <Menu.CheckboxItem
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                      <Menu.CheckboxItemIndicator>
                        <Check className="w-3 h-3 c-indigo" />
                      </Menu.CheckboxItemIndicator>
                    </span>
                    Enhancement
                  </Menu.CheckboxItem>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>
    </Menubar>
  );
}

"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarDisabled() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [sprintOpen, setSprintOpen] = useState(false);

  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-lg bw-1">
      <Menu.Root open={settingsOpen} onOpenChange={setSettingsOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-2/50" : ""
            }`
          }
        >
          Settings
        </Menu.Trigger>
        <AnimatePresence>
          {settingsOpen && (
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-xxl bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Workspace
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Notifications
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Billing
                  </Menu.Item>
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
              state.open ? "bg-silver-2/50" : ""
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    />
                  }
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-xxl bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Critical
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    High
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Medium
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Low
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={sprintOpen} onOpenChange={setSprintOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-2/50" : ""
            }`
          }
        >
          Sprint
        </Menu.Trigger>
        <AnimatePresence>
          {sprintOpen && (
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-xxl bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Active Sprint
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Backlog
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-xl mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Velocity
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root disabled>
        <Menu.Trigger className="h-8 br-lg px-3 bg-transparent c-slate-4 fs-sm fw-500 o-50 us-none c-na">
          Roles
        </Menu.Trigger>
      </Menu.Root>
    </Menubar>
  );
}

"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarGrouped() {
  const [projectOpen, setProjectOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [permissionsOpen, setPermissionsOpen] = useState(false);

  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-lg bw-1">
      <Menu.Root open={projectOpen} onOpenChange={setProjectOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
            }`
          }
        >
          Navigate
        </Menu.Trigger>
        <AnimatePresence>
          {projectOpen && (
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
                  <Menu.Group>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      My tasks
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      My projects
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      Team dashboard
                    </Menu.Item>
                  </Menu.Group>

                  <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />

                  <Menu.Group>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      Backlog
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      Sprints
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      Archive
                    </Menu.Item>
                  </Menu.Group>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={settingsOpen} onOpenChange={setSettingsOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
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
                  <Menu.Group>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      Project settings
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      Team members
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      Labels & priorities
                    </Menu.Item>
                  </Menu.Group>

                  <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />

                  <Menu.Group>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      Billing
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      Notifications
                    </Menu.Item>
                  </Menu.Group>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={permissionsOpen} onOpenChange={setPermissionsOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
            }`
          }
        >
          Permissions
        </Menu.Trigger>
        <AnimatePresence>
          {permissionsOpen && (
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
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    View roles
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Manage permissions
                  </Menu.Item>
                  <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Audit log
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>
    </Menubar>
  );
}

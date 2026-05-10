"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import {
  BellDot,
  Briefcase,
  CreditCard,
  Gear,
  House,
  ListOl,
  ListUl,
  PersonPlanetEarth,
  TrashBin,
} from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarGrouped() {
  const [projectOpen, setProjectOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-lg bw-1">
      <Menu.Root open={projectOpen} onOpenChange={setProjectOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs"
                >
                  <Menu.Group>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <House className="fs-0 w-4 h-4 c-slate-5" />
                      My tasks
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <PersonPlanetEarth className="fs-0 w-4 h-4 c-slate-5" />
                      My projects
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <Briefcase className="fs-0 w-4 h-4 c-slate-5" />
                      Team dashboard
                    </Menu.Item>
                  </Menu.Group>

                  <Menu.Separator className="my-1 w-full h-px bg-silver-2" />

                  <Menu.Group>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <ListUl className="fs-0 w-4 h-4 c-slate-5" />
                      Backlog
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <Briefcase className="fs-0 w-4 h-4 c-slate-5" />
                      Sprints
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <TrashBin className="fs-0 w-4 h-4 c-slate-5" />
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
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs"
                >
                  <Menu.Group>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <Gear className="fs-0 w-4 h-4 c-slate-5" />
                      Project settings
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <PersonPlanetEarth className="fs-0 w-4 h-4 c-slate-5" />
                      Team members
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <ListOl className="fs-0 w-4 h-4 c-slate-5" />
                      Labels & priorities
                    </Menu.Item>
                  </Menu.Group>

                  <Menu.Separator className="my-1 w-full h-px bg-silver-2" />

                  <Menu.Group>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <CreditCard className="fs-0 w-4 h-4 c-slate-5" />
                      Billing
                    </Menu.Item>
                    <Menu.Item
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <BellDot className="fs-0 w-4 h-4 c-slate-5" />
                      Notifications
                    </Menu.Item>
                  </Menu.Group>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root disabled>
        <Menu.Trigger className="h-8 px-3 bg-transparent c-slate-10 br-lg fs-sm fw-500 o-50 us-none">
          Help
        </Menu.Trigger>
      </Menu.Root>
    </Menubar>
  );
}

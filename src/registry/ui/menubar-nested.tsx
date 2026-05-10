"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { ChevronRight, CircleFill } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarNested() {
  const [fileOpen, setFileOpen] = useState(false);

  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-lg bw-1">
      <Menu.Root open={fileOpen} onOpenChange={setFileOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          Project
        </Menu.Trigger>
        <AnimatePresence>
          {fileOpen && (
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
                  <Menu.SubmenuRoot>
                    <Menu.SubmenuTrigger
                      className={(state) =>
                        `d-f ai-c jc-sb g-2 py-2 pl-3 pr-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <span>Move to</span>
                      <ChevronRight className="fs-0 w-3 h-3 c-slate-4" />
                    </Menu.SubmenuTrigger>

                    <Menu.Portal>
                      <Menu.Positioner
                        className="ow-0"
                        sideOffset={-4}
                        alignOffset={-4}
                      >
                        <Menu.Popup className="py-1 w-fc bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs">
                          {sprints.map((sprint) => (
                            <Menu.Item
                              key={sprint.name}
                              className={(state) =>
                                `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                                  state.highlighted
                                    ? "bg-silver-1/50"
                                    : "bg-transparent"
                                }`
                              }
                            >
                              {sprint.name}
                            </Menu.Item>
                          ))}
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.SubmenuRoot>

                  <Menu.SubmenuRoot>
                    <Menu.SubmenuTrigger
                      className={(state) =>
                        `d-f ai-c jc-sb g-2 py-2 pl-3 pr-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <span>Set priority</span>
                      <ChevronRight className="fs-0 w-3 h-3 c-slate-4" />
                    </Menu.SubmenuTrigger>

                    <Menu.Portal>
                      <Menu.Positioner
                        className="ow-0"
                        sideOffset={-4}
                        alignOffset={-4}
                      >
                        <Menu.Popup className="py-1 w-fc bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs">
                          {priorities.map((priority) => (
                            <Menu.Item
                              key={priority.name}
                              className={(state) =>
                                `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                                  state.highlighted
                                    ? "bg-silver-1/50"
                                    : "bg-transparent"
                                }`
                              }
                            >
                              <span
                                className="fs-0 w-3 h-3 br-pill"
                                style={{ backgroundColor: priority.color }}
                              />
                              {priority.name}
                            </Menu.Item>
                          ))}
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.SubmenuRoot>

                  <Menu.Separator className="my-1 w-full h-px bg-silver-2" />

                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Copy task link
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Archive task
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root disabled>
        <Menu.Trigger className="h-8 px-3 bg-transparent c-slate-10 br-lg fs-sm fw-500 o-50 us-none">
          Edit
        </Menu.Trigger>
      </Menu.Root>

      <Menu.Root disabled>
        <Menu.Trigger className="h-8 px-3 bg-transparent c-slate-10 br-lg fs-sm fw-500 o-50 us-none">
          View
        </Menu.Trigger>
      </Menu.Root>
    </Menubar>
  );
}

const sprints = [
  { name: "Sprint 1" },
  { name: "Sprint 2" },
  { name: "Backlog" },
  { name: "Archive" },
];

const priorities = [
  { name: "High", color: "#e63946" },
  { name: "Medium", color: "#ffb81c" },
  { name: "Low", color: "#10b981" },
  { name: "None", color: "#6b7280" },
];

const members = [
  { name: "John Doe", initials: "JD" },
  { name: "Jane Smith", initials: "JS" },
  { name: "Mike Wilson", initials: "MW" },
];

"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { NavArrowRight } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarNested() {
  const [projectOpen, setProjectOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [columnOpen, setColumnOpen] = useState(false);

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
          Project
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
                  <Menu.SubmenuRoot>
                    <Menu.SubmenuTrigger
                      className={(state) =>
                        `d-f ai-c jc-sb g-2 py-2 pl-3 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <span>Move to</span>
                      <NavArrowRight className="fs-0 w-3 h-3 c-slate-4" />
                    </Menu.SubmenuTrigger>

                    <Menu.Portal>
                      <Menu.Positioner
                        className="ow-0"
                        sideOffset={-4}
                        alignOffset={-4}
                      >
                        <Menu.Popup className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-xxl bs-o-xs">
                          {sprints.map((sprint) => (
                            <Menu.Item
                              key={sprint.name}
                              className={(state) =>
                                `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
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
                        `d-f ai-c jc-sb g-2 py-2 pl-3 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <span>Set priority</span>
                      <NavArrowRight className="fs-0 w-3 h-3 c-slate-4" />
                    </Menu.SubmenuTrigger>

                    <Menu.Portal>
                      <Menu.Positioner
                        className="ow-0"
                        sideOffset={-4}
                        alignOffset={-4}
                      >
                        <Menu.Popup className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-xxl bs-o-xs">
                          {priorities.map((priority) => (
                            <Menu.Item
                              key={priority.name}
                              className={(state) =>
                                `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                                  state.highlighted
                                    ? "bg-silver-1/50"
                                    : "bg-transparent"
                                }`
                              }
                            >
                              <span
                                className={`fs-0 w-3 h-3 br-9999 ${priority.bg}`}
                              />
                              {priority.name}
                            </Menu.Item>
                          ))}
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.SubmenuRoot>

                  <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />

                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Copy task link
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
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

      <Menu.Root open={taskOpen} onOpenChange={setTaskOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
            }`
          }
        >
          Task
        </Menu.Trigger>
        <AnimatePresence>
          {taskOpen && (
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
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Assign task
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Set due date
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Add label
                  </Menu.Item>
                  <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Delete task
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={columnOpen} onOpenChange={setColumnOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
            }`
          }
        >
          Column
        </Menu.Trigger>
        <AnimatePresence>
          {columnOpen && (
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
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Add task
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Sort by priority
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Collapse column
                  </Menu.Item>
                  <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    Rename column
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

const sprints = [
  { name: "Sprint 1" },
  { name: "Sprint 2" },
  { name: "Backlog" },
  { name: "Archive" },
];

const priorities = [
  { name: "High", bg: "bg-red" },
  { name: "Medium", bg: "bg-yellow" },
  { name: "Low", bg: "bg-mint" },
];

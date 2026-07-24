"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { ArrowUp, KeyCommand } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarShortcuts() {
  const [projectOpen, setProjectOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [sprintOpen, setSprintOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);

  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-lg bw-1">
      <Menu.Root open={projectOpen} onOpenChange={setProjectOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-2/50" : ""
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-xxl bw-1"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">New task</span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <KeyCommand className="w-3 h-3" />
                      <span>N</span>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">New project</span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <KeyCommand className="w-3 h-3" />
                      <ArrowUp className="w-3 h-3" />
                      <span>N</span>
                    </span>
                  </Menu.Item>
                  <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">Import tasks</span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <KeyCommand className="w-3 h-3" />
                      <span>I</span>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">Export tasks</span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <KeyCommand className="w-3 h-3" />
                      <span>E</span>
                    </span>
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
              state.open ? "bg-silver-2/50" : ""
            }`
          }
        >
          Actions
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-xxl bw-1"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">Undo</span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <KeyCommand className="w-3 h-3" />
                      <span>Z</span>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">Redo</span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <KeyCommand className="w-3 h-3" />
                      <span>Y</span>
                    </span>
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-xxl bw-1"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">Board view</span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <KeyCommand className="w-3 h-3" />
                      <span>1</span>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">List view</span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <KeyCommand className="w-3 h-3" />
                      <span>2</span>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">Calendar view</span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <KeyCommand className="w-3 h-3" />
                      <span>3</span>
                    </span>
                  </Menu.Item>
                  <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">Toggle sidebar</span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <KeyCommand className="w-3 h-3" />
                      <span>B</span>
                    </span>
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={teamOpen} onOpenChange={setTeamOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-2/50" : ""
            }`
          }
        >
          Team
        </Menu.Trigger>
        <AnimatePresence>
          {teamOpen && (
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-xxl bw-1"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">Invite members</span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <KeyCommand className="w-3 h-3" />
                      <ArrowUp className="w-3 h-3" />
                      <span>I</span>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">Manage roles</span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <KeyCommand className="w-3 h-3" />
                      <span>R</span>
                    </span>
                  </Menu.Item>
                  <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">Activity log</span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <KeyCommand className="w-3 h-3" />
                      <span>L</span>
                    </span>
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

"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Copy,
  DotsGrid3x3,
  FolderPlus,
  InputField,
  KeyframesCoupleSolid,
  Link,
  List,
  Plus,
  User,
} from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarIcons() {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [rolesOpen, setRolesOpen] = useState(false);

  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-md bw-1">
      <Menu.Root open={actionsOpen} onOpenChange={setActionsOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-md px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
            }`
          }
        >
          Actions
        </Menu.Trigger>
        <AnimatePresence>
          {actionsOpen && (
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-md bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Plus className="fs-0 w-4 h-4 c-slate-5" />
                    New task
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <FolderPlus className="fs-0 w-4 h-4 c-slate-5" />
                    New project
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <ArrowRight className="fs-0 w-4 h-4 c-slate-5" />
                    Import tasks
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <ArrowLeft className="fs-0 w-4 h-4 c-slate-5" />
                    Export tasks
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Archive className="fs-0 w-4 h-4 c-slate-5" />
                    Archive project
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={editOpen} onOpenChange={setEditOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-md px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
            }`
          }
        >
          Edit
        </Menu.Trigger>
        <AnimatePresence>
          {editOpen && (
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-md bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <InputField className="fs-0 w-4 h-4 c-slate-5" />
                    Rename task
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Copy className="fs-0 w-4 h-4 c-slate-5" />
                    Duplicate task
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Link className="fs-0 w-4 h-4 c-slate-5" />
                    Copy task link
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Archive className="fs-0 w-4 h-4 c-slate-5" />
                    Archive task
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={viewOpen} onOpenChange={setViewOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-md px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    />
                  }
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-md bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <List className="fs-0 w-4 h-4 c-slate-5" />
                    List view
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <DotsGrid3x3 className="fs-0 w-4 h-4 c-slate-5" />
                    Board view
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Calendar className="fs-0 w-4 h-4 c-slate-5" />
                    Calendar view
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <KeyframesCoupleSolid className="fs-0 w-4 h-4 c-slate-5" />
                    KeyframesCoupleSolid view
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={rolesOpen} onOpenChange={setRolesOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-md px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
            }`
          }
        >
          Roles
        </Menu.Trigger>
        <AnimatePresence>
          {rolesOpen && (
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-md bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <User className="fs-0 w-4 h-4 c-slate-5" />
                    Admin
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <User className="fs-0 w-4 h-4 c-slate-5" />
                    Editor
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-3 py-2 pr-8 pl-4 fs-sm us-none c-p br-md mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <User className="fs-0 w-4 h-4 c-slate-5" />
                    Viewer
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

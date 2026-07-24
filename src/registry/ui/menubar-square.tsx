"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarSquare() {
  const [fileOpen, setFileOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 bw-1">
      <Menu.Root open={fileOpen} onOpenChange={setFileOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-2/50" : ""
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    New task
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Import tasks
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Export tasks
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
            `h-8 px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-2/50" : ""
            }`
          }
        >
          Assign
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Assign task
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Reassign task
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Bulk assign
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
            `h-8 px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-2/50" : ""
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Board view
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    List view
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Keyframes view
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-2/50" : ""
            }`
          }
        >
          Shortcuts
        </Menu.Trigger>
        <AnimatePresence>
          {shortcutsOpen && (
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Keyboard shortcuts
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p mx-1 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                    }
                  >
                    Cheat sheet
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

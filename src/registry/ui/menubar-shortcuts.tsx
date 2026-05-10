"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import {
  ArrowDownToSquare,
  ArrowRotateLeft,
  ArrowRotateRight,
  CloudArrowUpIn,
  Copy,
  Folder,
  LayoutHeaderCellsLargeFill,
  ListUl,
  Pencil,
  Scissors,
} from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarShortcuts() {
  const [fileOpen, setFileOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

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
          File
        </Menu.Trigger>
        <AnimatePresence>
          {fileOpen && (
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
                  className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <Pencil className="fs-0 w-4 h-4 c-slate-5" />
                      New task
                    </span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <span>Ctrl</span>
                      <span>N</span>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <Folder className="fs-0 w-4 h-4 c-slate-5" />
                      New project
                    </span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <span>Ctrl</span>
                      <span>Shift</span>
                      <span>N</span>
                    </span>
                  </Menu.Item>
                  <Menu.Separator className="my-1 w-full h-px bg-silver-2" />
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <CloudArrowUpIn className="fs-0 w-4 h-4 c-slate-5" />
                      Import tasks
                    </span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <span>Ctrl</span>
                      <span>I</span>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <ArrowDownToSquare className="fs-0 w-4 h-4 c-slate-5" />
                      Export tasks
                    </span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <span>Ctrl</span>
                      <span>E</span>
                    </span>
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
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
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
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                    />
                  }
                  className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <ArrowRotateLeft className="fs-0 w-4 h-4 c-slate-5" />
                      Undo
                    </span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <span>Ctrl</span>
                      <span>Z</span>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <ArrowRotateRight className="fs-0 w-4 h-4 c-slate-5" />
                      Redo
                    </span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <span>Ctrl</span>
                      <span>Y</span>
                    </span>
                  </Menu.Item>
                  <Menu.Separator className="my-1 w-full h-px bg-silver-2" />
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <Scissors className="fs-0 w-4 h-4 c-slate-5" />
                      Cut
                    </span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <span>Ctrl</span>
                      <span>X</span>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <Copy className="fs-0 w-4 h-4 c-slate-5" />
                      Copy
                    </span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <span>Ctrl</span>
                      <span>C</span>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <Copy className="fs-0 w-4 h-4 c-slate-5" />
                      Paste
                    </span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <span>Ctrl</span>
                      <span>V</span>
                    </span>
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
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
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
                  className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <Folder className="fs-0 w-4 h-4 c-slate-5" />
                      Board view
                    </span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <span>Ctrl</span>
                      <span>1</span>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <ListUl className="fs-0 w-4 h-4 c-slate-5" />
                      List view
                    </span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <span>Ctrl</span>
                      <span>2</span>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <LayoutHeaderCellsLargeFill className="fs-0 w-4 h-4 c-slate-5" />
                      Calendar view
                    </span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <span>Ctrl</span>
                      <span>3</span>
                    </span>
                  </Menu.Item>
                  <Menu.Separator className="my-1 w-full h-px bg-silver-2" />
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <Folder className="fs-0 w-4 h-4 c-slate-5" />
                      Toggle sidebar
                    </span>
                    <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                      <span>Ctrl</span>
                      <span>B</span>
                    </span>
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root disabled>
        <Menu.Trigger className="h-8 px-3 bg-transparent c-slate-10 br-lg fs-sm fw-500 o-50 us-none">
          Team
        </Menu.Trigger>
      </Menu.Root>
    </Menubar>
  );
}

"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import {
  ArrowDownToSquare,
  ArrowUpFromSquare,
  CloudArrowUpIn,
  Copy,
  File,
  Folder,
  LayoutHeaderCellsLargeFill,
  Link,
  Pencil,
  TrashBin,
} from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarIcons() {
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
          Actions
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
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Pencil className="fs-0 w-4 h-4 c-slate-5" />
                    New task
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Folder className="fs-0 w-4 h-4 c-slate-5" />
                    New project
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <CloudArrowUpIn className="fs-0 w-4 h-4 c-slate-5" />
                    Import tasks
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <ArrowDownToSquare className="fs-0 w-4 h-4 c-slate-5" />
                    Export tasks
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <TrashBin className="fs-0 w-4 h-4 c-slate-5" />
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
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Pencil className="fs-0 w-4 h-4 c-slate-5" />
                    Rename task
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Copy className="fs-0 w-4 h-4 c-slate-5" />
                    Duplicate task
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Link className="fs-0 w-4 h-4 c-slate-5" />
                    Copy task link
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <ArrowUpFromSquare className="fs-0 w-4 h-4 c-slate-5" />
                    ArrowUpFromSquare task
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <TrashBin className="fs-0 w-4 h-4 c-slate-5" />
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
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <LayoutHeaderCellsLargeFill className="fs-0 w-4 h-4 c-slate-5" />
                    List view
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <File className="fs-0 w-4 h-4 c-slate-5" />
                    Board view
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Folder className="fs-0 w-4 h-4 c-slate-5" />
                    Calendar view
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <LayoutHeaderCellsLargeFill className="fs-0 w-4 h-4 c-slate-5" />
                    Timeline view
                  </Menu.Item>
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

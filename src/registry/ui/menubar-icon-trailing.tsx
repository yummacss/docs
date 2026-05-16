"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { ArrowUpRightFromSquare, Eye, Link, Pin, Tray } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarIconTrailing() {
  const [assignOpen, setAssignOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-lg bw-1">
      <Menu.Root open={assignOpen} onOpenChange={setAssignOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          Assign
        </Menu.Trigger>
        <AnimatePresence>
          {assignOpen && (
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
                  className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                    }
                  >
                    Add watcher
                    <Eye className="fs-0 w-4 h-4 c-slate-5" />
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                    }
                  >
                    Assign to
                    <ArrowUpRightFromSquare className="fs-0 w-4 h-4 c-slate-5" />
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                    }
                  >
                    Pin task
                    <Pin className="fs-0 w-4 h-4 c-slate-5" />
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                    }
                  >
                    Link task
                    <Link className="fs-0 w-4 h-4 c-slate-5" />
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
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent ${
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    />
                  }
                  className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                    }
                  >
                    List view
                    <Eye className="fs-0 w-4 h-4 c-slate-5" />
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                    }
                  >
                    Board view
                    <Link className="fs-0 w-4 h-4 c-slate-5" />
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                    }
                  >
                    Timeline view
                    <Pin className="fs-0 w-4 h-4 c-slate-5" />
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={exportOpen} onOpenChange={setExportOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          Export
        </Menu.Trigger>
        <AnimatePresence>
          {exportOpen && (
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
                  className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs"
                >
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                    }
                  >
                    Export as CSV
                    <ArrowUpRightFromSquare className="fs-0 w-4 h-4 c-slate-5" />
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                    }
                  >
                    Export as JSON
                    <Tray className="fs-0 w-4 h-4 c-slate-5" />
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

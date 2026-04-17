"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function MenubarBase() {
  const [fileOpen, setFileOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);

  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-lg bw-1">
      <Menu.Root open={fileOpen} onOpenChange={setFileOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-600 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          File
        </Menu.Trigger>
        <AnimatePresence>
          {fileOpen && (
            <Menu.Portal keepMounted>
              <Menu.Positioner className="ow-0" sideOffset={6}>
                <Menu.Popup
                  render={
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                    />
                  }
                  className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-lg"
                >
                  <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>New project</Menu.Item>
                  <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Open file</Menu.Item>
                  <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Save</Menu.Item>
                  <Menu.Separator className="my-1 w-full h-px bg-silver-2" />
                  <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Print</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={editOpen} onOpenChange={setEditOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-600 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          Edit
        </Menu.Trigger>
        <AnimatePresence>
          {editOpen && (
            <Menu.Portal keepMounted>
              <Menu.Positioner className="ow-0" sideOffset={6}>
                <Menu.Popup
                  render={
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                    />
                  }
                  className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-lg"
                >
                  <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Undo action</Menu.Item>
                  <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Redo action</Menu.Item>
                  <Menu.Separator className="my-1 w-full h-px bg-silver-2" />
                  <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Cut selection</Menu.Item>
                  <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Copy text</Menu.Item>
                  <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Paste content</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={viewOpen} onOpenChange={setViewOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-600 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          View
        </Menu.Trigger>
        <AnimatePresence>
          {viewOpen && (
            <Menu.Portal keepMounted>
              <Menu.Positioner className="ow-0" sideOffset={6}>
                <Menu.Popup
                  render={
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                    />
                  }
                  className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-lg"
                >
                  <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Zoom in</Menu.Item>
                  <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Zoom out</Menu.Item>
                  <Menu.Separator className="my-1 w-full h-px bg-silver-2" />
                  <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Full screen</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root disabled>
        <Menu.Trigger className="h-8 px-3 bg-transparent c-slate-10 br-lg fs-sm fw-600 o-50 us-none">
          Help
        </Menu.Trigger>
      </Menu.Root>
    </Menubar>
  );
}

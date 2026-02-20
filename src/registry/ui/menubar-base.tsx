"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

const itemClass = (state: { highlighted: boolean }) =>
  `d-f ai-c jc-sb g-4 px-4 py-2 fs-sm us-none c-p ${
    state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
  }`;

export default function ExampleMenubar() {
  const [fileOpen, setFileOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);

  return (
    <Menubar className="d-f br-2 bw-1 bc-silver-2 bg-white p-1 g-1">
      {/* File Menu */}
      <Menu.Root open={fileOpen} onOpenChange={setFileOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-1 px-3 fs-sm fw-600 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1" : "h:bg-silver-1"
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
                  className="br-2 bg-white c-slate-10 py-1 bs-o-lg bw-1 bc-silver-2"
                >
                  <Menu.Item className={itemClass}>New project</Menu.Item>
                  <Menu.Item className={itemClass}>Open file</Menu.Item>
                  <Menu.Item className={itemClass}>Save</Menu.Item>
                  <Menu.Separator className="mx-4 my-1 h-px bg-silver-2" />
                  <Menu.Item className={itemClass}>Print</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      {/* Edit Menu */}
      <Menu.Root open={editOpen} onOpenChange={setEditOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-1 px-3 fs-sm fw-600 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1" : "h:bg-silver-1"
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
                  className="br-2 bg-white c-slate-10 py-1 bs-o-lg bw-1 bc-silver-2"
                >
                  <Menu.Item className={itemClass}>Undo action</Menu.Item>
                  <Menu.Item className={itemClass}>Redo action</Menu.Item>
                  <Menu.Separator className="mx-4 my-1 h-px bg-silver-2" />
                  <Menu.Item className={itemClass}>Cut selection</Menu.Item>
                  <Menu.Item className={itemClass}>Copy text</Menu.Item>
                  <Menu.Item className={itemClass}>Paste content</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      {/* View Menu */}
      <Menu.Root open={viewOpen} onOpenChange={setViewOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-1 px-3 fs-sm fw-600 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1" : "h:bg-silver-1"
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
                  className="br-2 bg-white c-slate-10 py-1 bs-o-lg bw-1 bc-silver-2"
                >
                  <Menu.Item className={itemClass}>Zoom in</Menu.Item>
                  <Menu.Item className={itemClass}>Zoom out</Menu.Item>
                  <Menu.Separator className="mx-4 my-1 h-px bg-silver-2" />
                  <Menu.Item className={itemClass}>Full screen</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      {/* Help Menu (disabled) */}
      <Menu.Root disabled>
        <Menu.Trigger className="h-8 br-1 px-3 fs-sm fw-600 c-slate-10 us-none b-0 bg-transparent o-50">
          Help
        </Menu.Trigger>
      </Menu.Root>
    </Menubar>
  );
}

"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import * as React from "react";

const itemClass = (state: { highlighted: boolean }) =>
  `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-sm mx-1 ${
    state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
  }`;

export default function MenubarStatic() {
  const [fileOpen, setFileOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);

  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-md bw-1">
      <Menu.Root open={fileOpen} onOpenChange={setFileOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-sm px-3 fs-sm fw-600 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1" : "h:bg-silver-1"
            }`
          }
        >
          File
        </Menu.Trigger>
        {fileOpen && (
          <Menu.Portal keepMounted>
            <Menu.Positioner className="ow-0" sideOffset={6}>
              <Menu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 br-md bw-1 bs-o-lg">
                <Menu.Item className={itemClass}>New project</Menu.Item>
                <Menu.Item className={itemClass}>Open file</Menu.Item>
                <Menu.Item className={itemClass}>Save</Menu.Item>
                <Menu.Separator className="mx-4 my-1 h-px bg-silver-2" />
                <Menu.Item className={itemClass}>Print</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </Menu.Root>

      <Menu.Root open={editOpen} onOpenChange={setEditOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-sm px-3 fs-sm fw-600 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1" : "h:bg-silver-1"
            }`
          }
        >
          Edit
        </Menu.Trigger>
        {editOpen && (
          <Menu.Portal keepMounted>
            <Menu.Positioner className="ow-0" sideOffset={6}>
              <Menu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 br-md bw-1 bs-o-lg">
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
      </Menu.Root>

      <Menu.Root open={viewOpen} onOpenChange={setViewOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-sm px-3 fs-sm fw-600 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1" : "h:bg-silver-1"
            }`
          }
        >
          View
        </Menu.Trigger>
        {viewOpen && (
          <Menu.Portal keepMounted>
            <Menu.Positioner className="ow-0" sideOffset={6}>
              <Menu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 br-md bw-1 bs-o-lg">
                <Menu.Item className={itemClass}>Zoom in</Menu.Item>
                <Menu.Item className={itemClass}>Zoom out</Menu.Item>
                <Menu.Separator className="mx-4 my-1 h-px bg-silver-2" />
                <Menu.Item className={itemClass}>Full screen</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </Menu.Root>

      <Menu.Root disabled>
        <Menu.Trigger className="h-8 px-3 bg-transparent c-slate-10 br-sm fs-sm fw-600 o-50 us-none">
          Help
        </Menu.Trigger>
      </Menu.Root>
    </Menubar>
  );
}

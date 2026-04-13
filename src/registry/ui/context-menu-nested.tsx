"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import {
  ArrowUpFromSquare,
  ChevronRight,
  Copy,
  Envelope,
  Link,
  Pencil,
  PersonPlus,
  TrashBin,
} from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

const itemClass = (highlighted: boolean) =>
  `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm us-none c-p br-sm mx-1 ${
    highlighted ? "bg-silver-1" : "h:bg-silver-1"
  }`;

export default function ContextMenuNested() {
  const [open, setOpen] = React.useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-silver-2 c-slate-10 bw-1 br-md fs-sm fw-600 us-none">
        Right click here
      </ContextMenu.Trigger>

      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner className="ow-0">
              <ContextMenu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                }
                className="py-1 w-48 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-lg"
              >
                <ContextMenu.Item
                  className={(state) => itemClass(state.highlighted)}
                >
                  <Pencil className="fs-0 w-4 h-4 c-slate-5" />
                  Edit
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) => itemClass(state.highlighted)}
                >
                  <Copy className="fs-0 w-4 h-4 c-slate-5" />
                  Duplicate
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.SubmenuRoot>
                  <ContextMenu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pl-3 pr-3 fs-sm us-none c-p br-sm mx-1 ${
                        state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2">
                      <ArrowUpFromSquare className="fs-0 w-4 h-4 c-slate-5" />
                      Share
                    </span>
                    <ChevronRight className="fs-0 w-3 h-3 c-slate-4" />
                  </ContextMenu.SubmenuTrigger>

                  <ContextMenu.Portal>
                    <ContextMenu.Positioner
                      className="ow-0"
                      sideOffset={-4}
                      alignOffset={-4}
                    >
                      <ContextMenu.Popup className="py-1 w-48 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-lg">
                        <ContextMenu.Item
                          className={(state) => itemClass(state.highlighted)}
                        >
                          <Link className="fs-0 w-4 h-4 c-slate-5" />
                          Copy link
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className={(state) => itemClass(state.highlighted)}
                        >
                          <Envelope className="fs-0 w-4 h-4 c-slate-5" />
                          Send via email
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className={(state) => itemClass(state.highlighted)}
                        >
                          <PersonPlus className="fs-0 w-4 h-4 c-slate-5" />
                          Invite collaborator
                        </ContextMenu.Item>
                      </ContextMenu.Popup>
                    </ContextMenu.Positioner>
                  </ContextMenu.Portal>
                </ContextMenu.SubmenuRoot>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm us-none c-red c-p br-sm mx-1 ${
                      state.highlighted ? "bg-red-1" : "h:bg-red-1"
                    }`
                  }
                >
                  <TrashBin className="fs-0 w-4 h-4" />
                  Delete
                </ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}

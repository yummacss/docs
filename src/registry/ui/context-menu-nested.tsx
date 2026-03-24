"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import {
  CaretRightIcon,
  CopyIcon,
  EnvelopeIcon,
  LinkIcon,
  PencilIcon,
  ShareNetworkIcon,
  TrashIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

const itemClass = (highlighted: boolean) =>
  `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm us-none c-p br-sm mx-1 ${
    highlighted ? "bg-silver-1" : "h:bg-silver-1"
  }`;

export default function ExampleContextMenu() {
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
                className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-lg w-48"
              >
                <ContextMenu.Item
                  className={(state) => itemClass(state.highlighted)}
                >
                  <PencilIcon size={14} className="c-slate-5 fs-0" />
                  Edit
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) => itemClass(state.highlighted)}
                >
                  <CopyIcon size={14} className="c-slate-5 fs-0" />
                  Duplicate
                </ContextMenu.Item>

                <ContextMenu.Separator className="mx-4 my-1 h-px bg-silver-2" />

                <ContextMenu.SubmenuRoot>
                  <ContextMenu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pl-3 pr-3 fs-sm us-none c-p br-sm mx-1 ${
                        state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2">
                      <ShareNetworkIcon size={14} className="c-slate-5 fs-0" />
                      Share
                    </span>
                    <CaretRightIcon size={12} className="c-slate-4 fs-0" />
                  </ContextMenu.SubmenuTrigger>

                  <ContextMenu.Portal>
                    <ContextMenu.Positioner
                      className="ow-0"
                      sideOffset={-4}
                      alignOffset={-4}
                    >
                      <ContextMenu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-lg w-48">
                        <ContextMenu.Item
                          className={(state) => itemClass(state.highlighted)}
                        >
                          <LinkIcon size={14} className="c-slate-5 fs-0" />
                          Copy link
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className={(state) => itemClass(state.highlighted)}
                        >
                          <EnvelopeIcon size={14} className="c-slate-5 fs-0" />
                          Send via email
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className={(state) => itemClass(state.highlighted)}
                        >
                          <UserPlusIcon size={14} className="c-slate-5 fs-0" />
                          Invite collaborator
                        </ContextMenu.Item>
                      </ContextMenu.Popup>
                    </ContextMenu.Positioner>
                  </ContextMenu.Portal>
                </ContextMenu.SubmenuRoot>

                <ContextMenu.Separator className="mx-4 my-1 h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm us-none c-p br-sm mx-1 ${
                      state.highlighted ? "bg-red-1 c-red" : "c-red h:bg-red-1"
                    }`
                  }
                >
                  <TrashIcon size={14} className="fs-0" />
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

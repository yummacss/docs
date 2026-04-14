"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import {
  ArrowUturnCcwLeft,
  ArrowUturnCwRight,
  ChevronRight,
  FaceSmile,
  Pencil,
  TrashBin,
} from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

const itemClass = (highlighted: boolean) =>
  `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-600 us-none c-p br-lg mx-1 ${
    highlighted ? "bg-silver-1" : "h:bg-silver-1"
  }`;

export default function ContextMenuNested() {
  const [open, setOpen] = React.useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-slate-3 bs-d c-slate-10 bw-1 br-lg fs-sm fw-600 us-none">
        Right-click here
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
                className="py-1 w-48 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg"
              >
                <ContextMenu.SubmenuRoot>
                  <ContextMenu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pl-3 pr-3 fs-sm fw-600 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2">
                      <FaceSmile className="fs-0 w-4 h-4 c-slate-5" />
                      Add Reaction
                    </span>
                    <ChevronRight className="fs-0 w-3 h-3 c-slate-4" />
                  </ContextMenu.SubmenuTrigger>

                  <ContextMenu.Portal>
                    <ContextMenu.Positioner
                      className="ow-0"
                      sideOffset={-4}
                      alignOffset={-4}
                    >
                      <ContextMenu.Popup className="py-1 w-48 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg">
                        {reactions.map((reaction) => (
                          <ContextMenu.Item
                            key={reaction.code}
                            className={(state) => itemClass(state.highlighted)}
                          >
                            <span className="fs-sm">{reaction.emoji}</span>
                            <span className="c-slate-6">{reaction.code}</span>
                          </ContextMenu.Item>
                        ))}
                      </ContextMenu.Popup>
                    </ContextMenu.Positioner>
                  </ContextMenu.Portal>
                </ContextMenu.SubmenuRoot>

                <ContextMenu.Item
                  className={(state) => itemClass(state.highlighted)}
                >
                  <Pencil className="fs-0 w-4 h-4 c-slate-5" />
                  Edit Message
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) => itemClass(state.highlighted)}
                >
                  <ArrowUturnCcwLeft className="fs-0 w-4 h-4 c-slate-5" />
                  Reply
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) => itemClass(state.highlighted)}
                >
                  <ArrowUturnCwRight className="fs-0 w-4 h-4 c-slate-5" />
                  Forward
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-600 us-none c-red c-p br-lg mx-1 ${
                      state.highlighted ? "bg-red-1" : "h:bg-red-1"
                    }`
                  }
                >
                  <TrashBin className="fs-0 w-4 h-4" />
                  Delete Message
                </ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}

const reactions = [
  { emoji: "😂", code: ":joy:" },
  { emoji: "😍", code: ":heart_eyes:" },
  { emoji: "🤔", code: ":thinking:" },
  { emoji: "😢", code: ":sob:" },
  { emoji: "😡", code: ":rage:" },
  { emoji: "🔥", code: ":fire:" },
  { emoji: "👍", code: ":thumbsup:" },
  { emoji: "👎", code: ":thumbsdown:" },
];

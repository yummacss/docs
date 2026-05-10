"use client";

import { Avatar } from "@base-ui/react/avatar";
import { ContextMenu } from "@base-ui/react/context-menu";
import {
  ArrowUpFromSquare,
  ChevronRight,
  Flag,
  Pencil,
  PersonPlus,
  TrashBin,
} from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ContextMenuNested() {
  const [open, setOpen] = useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-slate-3 c-slate-10 bs-d bw-1 br-lg fs-sm fw-500 us-none">
        Right-click task
      </ContextMenu.Trigger>

      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner className="ow-0">
              <ContextMenu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs"
              >
                <ContextMenu.SubmenuRoot>
                  <ContextMenu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pl-3 pr-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2">
                      <Flag className="fs-0 w-4 h-4 c-slate-5" />
                      Add Label
                    </span>
                    <ChevronRight className="fs-0 w-3 h-3 c-slate-4" />
                  </ContextMenu.SubmenuTrigger>

                  <ContextMenu.Portal>
                    <ContextMenu.Positioner
                      className="ow-0"
                      sideOffset={-4}
                      alignOffset={-4}
                    >
                      <ContextMenu.Popup className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs">
                        {labels.map((label) => (
                          <ContextMenu.Item
                            key={label.name}
                            className={(state) =>
                              `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                            }
                          >
                            <span
                              className="d-f ai-c jc-c w-3 h-3 br-pill"
                              style={{ backgroundColor: label.color }}
                            />
                            <span className="c-slate-10">{label.name}</span>
                          </ContextMenu.Item>
                        ))}
                      </ContextMenu.Popup>
                    </ContextMenu.Positioner>
                  </ContextMenu.Portal>
                </ContextMenu.SubmenuRoot>

                <ContextMenu.SubmenuRoot>
                  <ContextMenu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pl-3 pr-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2">
                      <PersonPlus className="fs-0 w-4 h-4 c-slate-5" />
                      Assign to
                    </span>
                    <ChevronRight className="fs-0 w-3 h-3 c-slate-4" />
                  </ContextMenu.SubmenuTrigger>

                  <ContextMenu.Portal>
                    <ContextMenu.Positioner
                      className="ow-0"
                      sideOffset={-4}
                      alignOffset={-4}
                    >
                      <ContextMenu.Popup className="py-1 w-fc bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs">
                        {teamMembers.map((member) => (
                          <ContextMenu.Item
                            key={member.name}
                            className={(state) =>
                              `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                            }
                          >
                            <div className="p-r">
                              <Avatar.Root className="d-if o-h ai-c jc-c w-5 h-5 bc-white br-pill bw-1 va-m us-none">
                                <Avatar.Image
                                  src={member.avatar}
                                  alt={member.name}
                                  className="of-c w-full h-full"
                                />
                              </Avatar.Root>
                              <span
                                className={`p-a b-0 r-0 w-2 h-2 bc-white br-pill bw-1 ${
                                  member.status === "online"
                                    ? "bg-mint"
                                    : member.status === "away"
                                      ? "bg-yellow"
                                      : "bg-silver-4"
                                }`}
                              />
                            </div>
                            <span className="c-slate-10">{member.name}</span>
                          </ContextMenu.Item>
                        ))}
                      </ContextMenu.Popup>
                    </ContextMenu.Positioner>
                  </ContextMenu.Portal>
                </ContextMenu.SubmenuRoot>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Pencil className="fs-0 w-4 h-4 c-slate-5" />
                  Edit task
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <ArrowUpFromSquare className="fs-0 w-4 h-4 c-slate-5" />
                  Share task
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-red c-p br-lg mx-1 ${
                      state.highlighted ? "bg-red-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <TrashBin className="fs-0 w-4 h-4" />
                  Archive task
                </ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}

const labels = [
  { name: "High", color: "#e63946" },
  { name: "Medium", color: "#ffb81c" },
  { name: "Low", color: "#10b981" },
];

const teamMembers = [
  {
    name: "Sarah",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9",
    status: "online",
  },
  {
    name: "John",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=John&backgroundColor=B4E9F2",
    status: "away",
  },
  {
    name: "Noah",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Noah&backgroundColor=D0D1FB",
    status: "offline",
  },
  {
    name: "Melanie",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Melanie&backgroundColor=DCCEFC",
    status: "online",
  },
  {
    name: "Riley",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Riley&backgroundColor=F4C8FA",
    status: "away",
  },
];

"use client";

import { Avatar } from "@base-ui/react/avatar";
import { ContextMenu } from "@base-ui/react/context-menu";
import {
  Archive,
  BellOff,
  Bookmark,
  ClockRotateRight,
  Copy,
  Edit,
  Folder,
  Group,
  Label,
  Link,
  NavArrowRight,
  Pin,
  PrintingPage,
  ShareIos,
  SubmitDocument,
  Trash,
  TriangleFlag,
} from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ContextMenuNested() {
  const [open, setOpen] = useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-slate-3 c-slate-10 bs-d bw-1 br-md fs-sm fw-500 us-none">
        Right-click task
      </ContextMenu.Trigger>

      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner className="ow-0" sideOffset={8}>
              <ContextMenu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs"
              >
                <div className="px-3 py-1 fs-xs fw-600 c-slate-5 us-none">
                  Quick Actions
                </div>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Edit className="fs-0 w-4 h-4 c-slate-5" />
                  Edit
                </ContextMenu.Item>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Copy className="fs-0 w-4 h-4 c-slate-5" />
                  Duplicate
                </ContextMenu.Item>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Bookmark className="fs-0 w-4 h-4 c-slate-5" />
                  Bookmark
                </ContextMenu.Item>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Pin className="fs-0 w-4 h-4 c-slate-5" />
                  Pin to top
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <div className="px-3 py-1 fs-xs fw-600 c-slate-5 us-none">
                  Share & Export
                </div>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <ShareIos className="fs-0 w-4 h-4 c-slate-5" />
                  Share
                </ContextMenu.Item>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Link className="fs-0 w-4 h-4 c-slate-5" />
                  Copy link
                </ContextMenu.Item>

                <ContextMenu.SubmenuRoot>
                  <ContextMenu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <SubmitDocument className="fs-0 w-4 h-4 c-slate-5" />
                      Export as
                    </span>
                    <NavArrowRight className="fs-0 w-4 h-4 c-slate-4" />
                  </ContextMenu.SubmenuTrigger>

                  <ContextMenu.Portal>
                    <ContextMenu.Positioner
                      className="ow-0"
                      sideOffset={-4}
                      alignOffset={-4}
                    >
                      <ContextMenu.Popup className="py-1 w-fc bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs">
                        <ContextMenu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                          }
                        >
                          PDF
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                          }
                        >
                          CSV
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                          }
                        >
                          Markdown
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                          }
                        >
                          Plain text
                        </ContextMenu.Item>
                      </ContextMenu.Popup>
                    </ContextMenu.Positioner>
                  </ContextMenu.Portal>
                </ContextMenu.SubmenuRoot>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <PrintingPage className="fs-0 w-4 h-4 c-slate-5" />
                  Print
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <ContextMenu.SubmenuRoot>
                  <ContextMenu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <Folder className="fs-0 w-4 h-4 c-slate-5" />
                      Move to
                    </span>
                    <NavArrowRight className="fs-0 w-4 h-4 c-slate-4" />
                  </ContextMenu.SubmenuTrigger>

                  <ContextMenu.Portal>
                    <ContextMenu.Positioner
                      className="ow-0"
                      sideOffset={-4}
                      alignOffset={-4}
                    >
                      <ContextMenu.Popup className="py-1 w-fc bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs">
                        <ContextMenu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                          }
                        >
                          Sprint 1
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                          }
                        >
                          Sprint 2
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                          }
                        >
                          Backlog
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                          }
                        >
                          Archive
                        </ContextMenu.Item>
                      </ContextMenu.Popup>
                    </ContextMenu.Positioner>
                  </ContextMenu.Portal>
                </ContextMenu.SubmenuRoot>

                <ContextMenu.SubmenuRoot>
                  <ContextMenu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2 fg-1">
                      <Group className="fs-0 w-4 h-4 c-slate-5" />
                      Assign to
                    </span>
                    <NavArrowRight className="fs-0 w-4 h-4 c-slate-4" />
                  </ContextMenu.SubmenuTrigger>

                  <ContextMenu.Portal>
                    <ContextMenu.Positioner
                      className="ow-0"
                      sideOffset={-4}
                      alignOffset={-4}
                    >
                      <ContextMenu.Popup className="py-1 w-fc bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs">
                        {teamMembers.map((member) => (
                          <ContextMenu.Item
                            key={`${member.name}-${member.role}`}
                            className={(state) =>
                              `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                            }
                          >
                            <div className="p-r">
                              <Avatar.Root className="d-if o-h ai-c jc-c w-5 h-5 bc-white br-9999 bw-1 va-m us-none">
                                <Avatar.Image
                                  src={member.avatar}
                                  alt={member.name}
                                  className="of-c w-100% h-100%"
                                />
                              </Avatar.Root>
                              <span
                                className={`p-a b-0 r-0 w-2 h-2 bc-white br-9999 bw-1 ${
                                  member.status === "online"
                                    ? "bg-green"
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
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Label className="fs-0 w-4 h-4 c-slate-5" />
                  Add label
                </ContextMenu.Item>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <TriangleFlag className="fs-0 w-4 h-4 c-slate-5" />
                  Set priority
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <ClockRotateRight className="fs-0 w-4 h-4 c-slate-5" />
                  Version history
                </ContextMenu.Item>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <BellOff className="fs-0 w-4 h-4 c-slate-5" />
                  Mute notifications
                </ContextMenu.Item>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Archive className="fs-0 w-4 h-4 c-slate-5" />
                  Archive
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-red c-p br-md mx-1 ${
                      state.highlighted ? "bg-red-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <Trash className="fs-0 w-4 h-4 c-red" />
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

const teamMembers = [
  {
    name: "Adrian",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Adrian&backgroundColor=FFD4DE",
    status: "away",
  },
  {
    name: "John",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
    status: "online",
  },
  {
    name: "Melanie",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Melanie&backgroundColor=DCCEFC",
    status: "online",
  },
  {
    name: "Noah",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Noah&backgroundColor=D0D1FB",
    status: "offline",
  },
  {
    name: "Riley",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Riley&backgroundColor=F4C8FA",
    status: "away",
  },
];

"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Menu } from "@base-ui/react/menu";
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
  NavArrowDown,
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

export default function MenuNested() {
  const [open, setOpen] = useState(false);

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5">
        Organize <NavArrowDown className="w-3 h-3" />
      </Menu.Trigger>

      <AnimatePresence>
        {open && (
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
                className="py-1 w-48 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs"
              >
                <div className="px-3 py-1 fs-xs fw-600 c-slate-5 us-none">
                  Quick Actions
                </div>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Edit className="fs-0 w-4 h-4 c-slate-5" />
                  Edit
                </Menu.Item>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Copy className="fs-0 w-4 h-4 c-slate-5" />
                  Duplicate
                </Menu.Item>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Bookmark className="fs-0 w-4 h-4 c-slate-5" />
                  Bookmark
                </Menu.Item>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Pin className="fs-0 w-4 h-4 c-slate-5" />
                  Pin to top
                </Menu.Item>

                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <div className="px-3 py-1 fs-xs fw-600 c-slate-5 us-none">
                  Share & Export
                </div>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <ShareIos className="fs-0 w-4 h-4 c-slate-5" />
                  Share
                </Menu.Item>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Link className="fs-0 w-4 h-4 c-slate-5" />
                  Copy link
                </Menu.Item>

                <Menu.SubmenuRoot>
                  <Menu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-3 fg-1">
                      <SubmitDocument className="fs-0 w-4 h-4 c-slate-5" />
                      Export as
                    </span>
                    <NavArrowRight className="fs-0 w-4 h-4 c-slate-4" />
                  </Menu.SubmenuTrigger>

                  <Menu.Portal>
                    <Menu.Positioner
                      className="ow-0"
                      sideOffset={-4}
                      alignOffset={-4}
                    >
                      <Menu.Popup className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs">
                        <Menu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                          }
                        >
                          PDF
                        </Menu.Item>
                        <Menu.Item
                          className={(state) =>
                            `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                          }
                        >
                          CSV
                        </Menu.Item>
                        <Menu.Item
                          className={(state) =>
                            `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                          }
                        >
                          Markdown
                        </Menu.Item>
                        <Menu.Item
                          className={(state) =>
                            `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                          }
                        >
                          Plain text
                        </Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.SubmenuRoot>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <PrintingPage className="fs-0 w-4 h-4 c-slate-5" />
                  Print
                </Menu.Item>

                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <Menu.SubmenuRoot>
                  <Menu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-3 fg-1">
                      <Folder className="fs-0 w-4 h-4 c-slate-5" />
                      Move to
                    </span>
                    <NavArrowRight className="fs-0 w-4 h-4 c-slate-4" />
                  </Menu.SubmenuTrigger>

                  <Menu.Portal>
                    <Menu.Positioner
                      className="ow-0"
                      sideOffset={-4}
                      alignOffset={-4}
                    >
                      <Menu.Popup className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs">
                        {folders.map((folder) => (
                          <Menu.Item
                            key={folder.name}
                            className={(state) =>
                              `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                            }
                          >
                            {folder.name}
                          </Menu.Item>
                        ))}
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.SubmenuRoot>

                <Menu.SubmenuRoot>
                  <Menu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-3 fg-1">
                      <Group className="fs-0 w-4 h-4 c-slate-5" />
                      Assign to
                    </span>
                    <NavArrowRight className="fs-0 w-4 h-4 c-slate-4" />
                  </Menu.SubmenuTrigger>

                  <Menu.Portal>
                    <Menu.Positioner
                      className="ow-0"
                      sideOffset={-4}
                      alignOffset={-4}
                    >
                      <Menu.Popup className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs">
                        {teamMembers.map((member) => (
                          <Menu.Item
                            key={`${member.name}-${member.role}`}
                            className={(state) =>
                              `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
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
                          </Menu.Item>
                        ))}
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.SubmenuRoot>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Label className="fs-0 w-4 h-4 c-slate-5" />
                  Add label
                </Menu.Item>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <TriangleFlag className="fs-0 w-4 h-4 c-slate-5" />
                  Set priority
                </Menu.Item>

                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <ClockRotateRight className="fs-0 w-4 h-4 c-slate-5" />
                  Version history
                </Menu.Item>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <BellOff className="fs-0 w-4 h-4 c-slate-5" />
                  Mute notifications
                </Menu.Item>

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-md mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Archive className="fs-0 w-4 h-4 c-slate-5" />
                  Archive
                </Menu.Item>

                <Menu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <Menu.Item
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-red c-p br-md mx-1 ${
                      state.highlighted ? "bg-red-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <Trash className="fs-0 w-4 h-4 c-red" />
                  Delete
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </AnimatePresence>
    </Menu.Root>
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

const folders = [
  { name: "Sprint 1" },
  { name: "Sprint 2" },
  { name: "Backlog" },
  { name: "Archive" },
];

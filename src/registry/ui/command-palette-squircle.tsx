"use client";

import { Button } from "@base-ui/react/button";
import { Combobox } from "@base-ui/react/combobox";
import { Dialog } from "@base-ui/react/dialog";
import {
  Activity,
  Folder,
  OpenBook,
  Page,
  PagePlus,
  PageSearch,
  Search,
  StatUp,
  User,
  Wrench,
  Xmark,
} from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function CommandPaletteSquircle() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="d-f ai-c g-2 px-3 py-2 bc-silver-2 c-slate-10 br-xxl cs-s bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        <Search className="w-4 h-4" />
        <span>Commands</span>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal keepMounted>
            <Dialog.Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              }
              className="p-f i-0 min-h-dvh bg-black/20 bf-b-xs"
            />
            <div className="d-f p-f i-0 ai-c jc-c">
              <Dialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                }
                className="o-h w-96 bg-white bc-silver-2 c-slate-12 bw-1 br-3xl cs-s bs-o-lg"
                style={{ maxWidth: "90vw" }}
              >
                <Combobox.Root inline items={commandGroups} autoHighlight>
                  <div className="d-f ai-c g-2 px-4 py-1">
                    <Search className="fs-0 w-5 h-5 c-slate-4" />
                    <Combobox.Input
                      placeholder="Search commands..."
                      autoFocus
                      className="h-10 w-100% bg-transparent c-slate-10 fs-md"
                    />
                    <Dialog.Close
                      render={
                        <Button className="d-f ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 br-xxl cs-s h:bg-silver-2 fv:oo-2 fv:oc-indigo-5" />
                      }
                    >
                      <Xmark aria-hidden className="w-5 h-5" />
                    </Dialog.Close>
                  </div>
                  <div>
                    <Combobox.List className="oy-auto max-h-72 py-1 ow-0">
                      {(group: CommandGroup, groupIndex: number) => (
                        <Combobox.Group key={group.label}>
                          <div className="px-4 pt-2 pb-1 c-slate-5 fs-xs fw-500">
                            {group.label}
                          </div>
                          {group.items.map((item) => (
                            <Combobox.Item
                              key={item.id}
                              value={item.id}
                              onClick={() => setOpen(false)}
                              className={(state: { highlighted: boolean }) =>
                                `d-f ai-c g-3 py-2 px-4 mx-2 fs-sm us-none c-p br-lg ${
                                  state.highlighted
                                    ? "bg-silver-1/50"
                                    : "bg-transparent"
                                }`
                              }
                            >
                              <item.Icon className="fs-0 w-4 h-4 c-slate-7" />
                              <span className="c-slate-10 fw-500">
                                {item.label}
                              </span>
                            </Combobox.Item>
                          ))}
                          {groupIndex < commandGroups.length - 1 && (
                            <div className="w-100% h-px my-1 bg-silver-2" />
                          )}
                        </Combobox.Group>
                      )}
                    </Combobox.List>
                    <Combobox.Empty className="c-slate-6 fs-sm">
                      <div className="py-8 px-4 ta-c fs-sm">
                        No commands found.
                      </div>
                    </Combobox.Empty>
                  </div>
                </Combobox.Root>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  Icon: React.ComponentType<{ className?: string }>;
}

interface CommandGroup {
  label: string;
  items: CommandItem[];
}

const commandGroups: CommandGroup[] = [
  {
    label: "Actions",
    items: [
      { id: "new-doc", label: "New doc", Icon: PagePlus },
      { id: "drafts", label: "Drafts", Icon: Page },
      { id: "templates", label: "Templates", Icon: Folder },
    ],
  },
  {
    label: "Pages",
    items: [
      { id: "knowledge-base", label: "Knowledge base", Icon: PageSearch },
      { id: "published", label: "Published pages", Icon: OpenBook },
      { id: "analytics", label: "Analytics", Icon: StatUp },
      { id: "settings", label: "Settings", Icon: Wrench },
      { id: "team-docs", label: "Team docs", Icon: User },
      { id: "activity", label: "Activity", Icon: Activity },
    ],
  },
];

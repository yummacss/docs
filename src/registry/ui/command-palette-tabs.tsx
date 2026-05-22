"use client";

import { Button } from "@base-ui/react/button";
import { Combobox } from "@base-ui/react/combobox";
import { Dialog } from "@base-ui/react/dialog";
import { Tabs } from "@base-ui/react/tabs";
import {
  Activity,
  BookDashed,
  BookOpenCheck,
  BookSearch,
  ChartColumn,
  Cog,
  Command,
  FilePlusCorner,
  FileText,
  NotepadTextDashed,
  Search,
  UsersRound,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

export default function CommandPaletteTabs() {
  const [open, setOpen] = useState(false);
  const [scope, setScope] = useState<Scope>("all");

  useEffect(() => {
    if (!open) setScope("all");
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const filteredGroups = useMemo(() => {
    if (scope === "all") return commandGroups;
    return commandGroups.filter((g) => g.label.toLowerCase() === scope);
  }, [scope]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="d-f ai-c g-2 px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        <Search className="w-4 h-4" />
        <span>Commands</span>
        <kbd className="d-f ai-c g-0.5 px-1 py-0.5 ml-3 bg-silver-1/50 c-slate-5 br-md fs-xs us-none">
          <Command className="w-3 h-3" />
          <span>/</span>
        </kbd>
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
                className="o-h w-96 bg-silver-1 bc-silver-2 c-slate-12 br-lg bw-1 bs-o-xs"
                style={{ maxWidth: "90vw" }}
              >
                <Combobox.Root inline items={filteredGroups} autoHighlight>
                  <div className="d-f ai-c g-2 px-4 py-1 bg-silver-1">
                    <Search className="fs-0 w-5 h-5 c-slate-4" />
                    <Combobox.Input
                      placeholder="Search..."
                      autoFocus
                      className="h-10 w-100% bg-transparent c-slate-10 fs-md"
                    />
                    <Dialog.Close
                      render={
                        <Button className="d-f ai-c jc-c w-7 h-7 c-slate-6 bw-0 br-md h:bg-silver-2 fv:oo-2 fv:oc-indigo-5" />
                      }
                    >
                      <X aria-hidden className="w-5 h-5" />
                    </Dialog.Close>
                  </div>
                  <Tabs.Root
                    value={scope}
                    onValueChange={(v) => setScope(v as Scope)}
                    className="w-100% bg-silver-1"
                  >
                    <Tabs.List className="d-f p-r g-1 px-4 py-1">
                      {scopes.map(({ value, label }) => (
                        <Tabs.Tab
                          key={value}
                          value={value}
                          className={`p-r zi-10 fg-1 d-f ai-c jc-c py-1 px-2 bg-transparent us-none fv:oo--1 fv:oc-indigo br-md ${
                            scope === value
                              ? "c-slate-10"
                              : "c-slate-6 h:c-slate-10"
                          }`}
                        >
                          <span className="p-r zi-10 fs-xs fw-500">
                            {label}
                          </span>
                        </Tabs.Tab>
                      ))}
                      <Tabs.Indicator
                        className="p-a l-0 zi-0 bg-white br-md bs-o-xs tp-a tdu-200 ttf-io"
                        style={{
                          translate: "var(--active-tab-left) 0",
                          width: "var(--active-tab-width)",
                          top: "var(--active-tab-top)",
                          height: "var(--active-tab-height)",
                        }}
                      />
                    </Tabs.List>
                  </Tabs.Root>
                  <div className="bg-white bc-silver-2 btr-lg btw-1">
                    <Combobox.List className="oy-auto max-h-64 py-1 ow-0">
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
                          {groupIndex < filteredGroups.length - 1 && (
                            <div className="w-100% h-px my-1 bg-silver-2" />
                          )}
                        </Combobox.Group>
                      )}
                    </Combobox.List>
                    <Combobox.Empty className="c-slate-5 fs-sm">
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
  Icon: React.ComponentType<{ className?: string }>;
}

interface CommandGroup {
  label: string;
  items: CommandItem[];
}

type Scope = "all" | "actions" | "pages";

const commandGroups: CommandGroup[] = [
  {
    label: "Actions",
    items: [
      { id: "new-doc", label: "New doc", Icon: FilePlusCorner },
      { id: "drafts", label: "Drafts", Icon: FileText },
      { id: "templates", label: "Templates", Icon: BookDashed },
    ],
  },
  {
    label: "Pages",
    items: [
      { id: "knowledge-base", label: "Knowledge base", Icon: BookSearch },
      { id: "published", label: "Published pages", Icon: BookOpenCheck },
      { id: "analytics", label: "Analytics", Icon: ChartColumn },
      { id: "settings", label: "Settings", Icon: Cog },
      { id: "team-docs", label: "Team docs", Icon: UsersRound },
      { id: "activity", label: "Activity", Icon: Activity },
    ],
  },
];

const scopes: { value: Scope; label: string }[] = [
  { value: "all", label: "All" },
  { value: "actions", label: "Actions" },
  { value: "pages", label: "Pages" },
];

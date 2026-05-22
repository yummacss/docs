"use client";

import { Button } from "@base-ui/react/button";
import { Combobox } from "@base-ui/react/combobox";
import { Dialog } from "@base-ui/react/dialog";
import {
  Activity,
  BookDashed,
  BookOpenCheck,
  BookSearch,
  ChartColumn,
  Cog,
  Command,
  FilePlusCorner,
  NotepadTextDashed,
  Search,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function CommandPaletteStatic() {
  const [open, setOpen] = useState(false);

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

      {open && (
        <Dialog.Portal keepMounted>
          <Dialog.Backdrop className="p-f i-0 min-h-dvh bg-black/20 bf-b-xs" />
          <div className="d-f p-f i-0 ai-c jc-c">
            <Dialog.Popup
              className="o-h w-96 bg-silver-1 bc-silver-2 c-slate-12 br-lg bw-1 bs-o-xs"
              style={{ maxWidth: "90vw" }}
            >
              <Combobox.Root inline items={commandGroups} autoHighlight>
                <div className="d-f ai-c g-2 px-4 py-1 bg-silver-1">
                  <Search className="fs-0 w-5 h-5 c-slate-4" />
                  <Combobox.Input
                    placeholder="Search commands..."
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
                <div className="bg-white bc-silver-2 btr-lg btw-1">
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
      { id: "new-doc", label: "New doc", Icon: FilePlusCorner },
      { id: "drafts", label: "Drafts", Icon: NotepadTextDashed },
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

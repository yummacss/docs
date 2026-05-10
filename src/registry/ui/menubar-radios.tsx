"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarRadios() {
  const [viewOpen, setViewOpen] = useState(false);
  const [view, setView] = useState("board");
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("date");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-lg bw-1">
      <Menu.Root open={viewOpen} onOpenChange={setViewOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          View
        </Menu.Trigger>
        <AnimatePresence>
          {viewOpen && (
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
                  className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs"
                >
                  <div className="px-3 py-1 c-slate-5 fs-xs fw-500 tt-u ls-3">
                    Display
                  </div>

                  <Menu.RadioGroup value={view} onValueChange={setView}>
                    {viewOptions.map((option) => (
                      <Menu.RadioItem
                        key={option.value}
                        value={option.value}
                        className={(state) =>
                          `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                            state.highlighted
                              ? "bg-silver-1/50"
                              : "bg-transparent"
                          }`
                        }
                      >
                        <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-pill bw-1">
                          <Menu.RadioItemIndicator>
                            <span className="w-2 h-2 bg-indigo br-pill" />
                          </Menu.RadioItemIndicator>
                        </span>
                        {option.label}
                      </Menu.RadioItem>
                    ))}
                  </Menu.RadioGroup>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={sortOpen} onOpenChange={setSortOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          Sort
        </Menu.Trigger>
        <AnimatePresence>
          {sortOpen && (
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
                  className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs"
                >
                  <div className="px-3 py-1 c-slate-5 fs-xs fw-500 tt-u ls-3">
                    Sort by
                  </div>

                  <Menu.RadioGroup value={sort} onValueChange={setSort}>
                    {sortOptions.map((option) => (
                      <Menu.RadioItem
                        key={option.value}
                        value={option.value}
                        className={(state) =>
                          `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                            state.highlighted
                              ? "bg-silver-1/50"
                              : "bg-transparent"
                          }`
                        }
                      >
                        <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-pill bw-1">
                          <Menu.RadioItemIndicator>
                            <span className="w-2 h-2 bg-indigo br-pill" />
                          </Menu.RadioItemIndicator>
                        </span>
                        {option.label}
                      </Menu.RadioItem>
                    ))}
                  </Menu.RadioGroup>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>

      <Menu.Root open={filterOpen} onOpenChange={setFilterOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          Filter
        </Menu.Trigger>
        <AnimatePresence>
          {filterOpen && (
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
                  className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs"
                >
                  <div className="px-3 py-1 c-slate-5 fs-xs fw-500 tt-u ls-3">
                    Filter by
                  </div>

                  <Menu.RadioGroup value={filter} onValueChange={setFilter}>
                    <Menu.RadioItem
                      value="all"
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-pill bw-1">
                        <Menu.RadioItemIndicator>
                          <span className="w-2 h-2 bg-indigo br-pill" />
                        </Menu.RadioItemIndicator>
                      </span>
                      All tasks
                    </Menu.RadioItem>
                    <Menu.RadioItem
                      value="assigned"
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-pill bw-1">
                        <Menu.RadioItemIndicator>
                          <span className="w-2 h-2 bg-indigo br-pill" />
                        </Menu.RadioItemIndicator>
                      </span>
                      Assigned to me
                    </Menu.RadioItem>
                    <Menu.RadioItem
                      value="created"
                      className={(state) =>
                        `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                          state.highlighted
                            ? "bg-silver-1/50"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-pill bw-1">
                        <Menu.RadioItemIndicator>
                          <span className="w-2 h-2 bg-indigo br-pill" />
                        </Menu.RadioItemIndicator>
                      </span>
                      Created by me
                    </Menu.RadioItem>
                  </Menu.RadioGroup>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          )}
        </AnimatePresence>
      </Menu.Root>
    </Menubar>
  );
}

const viewOptions = [
  { value: "board", label: "Board view" },
  { value: "list", label: "List view" },
  { value: "calendar", label: "Calendar view" },
  { value: "timeline", label: "Timeline view" },
];

const sortOptions = [
  { value: "date", label: "Due date" },
  { value: "priority", label: "Priority" },
  { value: "name", label: "Name" },
  { value: "assignee", label: "Assignee" },
];

"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { Circle } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenubarRadios() {
  const [viewOpen, setViewOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-md bw-1">
      <Menu.Root open={viewOpen} onOpenChange={setViewOpen}>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-md px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-md bw-1 bs-o-xs"
                >
                  <div className="px-3 py-1 c-slate-5 fs-xs fw-500 ls-3">
                    Display
                  </div>

                  <Menu.RadioGroup defaultValue="board">
                    {viewOptions.map((option) => (
                      <Menu.RadioItem
                        key={option.value}
                        value={option.value}
                        render={(props) => (
                          <motion.div
                            {...(props as HTMLMotionProps<"div">)}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                          />
                        )}
                        className={(state) =>
                          `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                            state.highlighted
                              ? "bg-silver-1/50"
                              : "bg-transparent"
                          }`
                        }
                      >
                        <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-9999 bw-1">
                          <Menu.RadioItemIndicator>
                            <Circle
                              className="w-2 h-2 c-indigo"
                              style={{ fill: "currentColor" }}
                            />
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
            `h-8 br-md px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-md bw-1 bs-o-xs"
                >
                  <div className="px-3 py-1 c-slate-5 fs-xs fw-500 ls-3">
                    Sort by
                  </div>

                  <Menu.RadioGroup defaultValue="date">
                    {sortOptions.map((option) => (
                      <Menu.RadioItem
                        key={option.value}
                        value={option.value}
                        render={(props) => (
                          <motion.div
                            {...(props as HTMLMotionProps<"div">)}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                          />
                        )}
                        className={(state) =>
                          `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                            state.highlighted
                              ? "bg-silver-1/50"
                              : "bg-transparent"
                          }`
                        }
                      >
                        <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-9999 bw-1">
                          <Menu.RadioItemIndicator>
                            <Circle
                              className="w-2 h-2 c-indigo"
                              style={{ fill: "currentColor" }}
                            />
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
            `h-8 br-md px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent h:bg-silver-1/50 ${
              state.open ? "bg-silver-1/50" : ""
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
                  className="py-1 w-52 bg-white bc-silver-2 c-slate-10 br-md bw-1 bs-o-xs"
                >
                  <div className="px-3 py-1 c-slate-5 fs-xs fw-500 ls-3">
                    Filter by
                  </div>

                  <Menu.RadioGroup defaultValue="all">
                    {filterOptions.map((option) => (
                      <Menu.RadioItem
                        key={option.value}
                        value={option.value}
                        render={(props) => (
                          <motion.div
                            {...(props as HTMLMotionProps<"div">)}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                          />
                        )}
                        className={(state) =>
                          `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-md mx-1 ${
                            state.highlighted
                              ? "bg-silver-1/50"
                              : "bg-transparent"
                          }`
                        }
                      >
                        <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-9999 bw-1">
                          <Menu.RadioItemIndicator>
                            <Circle
                              className="w-2 h-2 c-indigo"
                              style={{ fill: "currentColor" }}
                            />
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
    </Menubar>
  );
}

const viewOptions = [
  { value: "board", label: "Board view" },
  { value: "list", label: "List view" },
  { value: "calendar", label: "Calendar view" },
  { value: "timeline", label: "Keyframes view" },
];

const sortOptions = [
  { value: "date", label: "Due date" },
  { value: "priority", label: "Priority" },
  { value: "name", label: "Name" },
  { value: "assignee", label: "Assignee" },
];

const filterOptions = [
  { value: "all", label: "All tasks" },
  { value: "assigned", label: "Assigned to me" },
  { value: "created", label: "Created by me" },
];

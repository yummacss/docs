"use client";

import { Menu } from "@base-ui/react/menu";
import {
  Briefcase,
  ChevronDown,
  GearDot,
  House,
  PersonPlanetEarth,
  Tray,
} from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenuGrouped() {
  const [open, setOpen] = useState(false);

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f b-0 ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        Settings <ChevronDown className="w-3 h-3" />
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
                className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs"
              >
                <Menu.Group>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <House className="fs-0 w-4 h-4 c-slate-5" />
                    My tasks
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <PersonPlanetEarth className="fs-0 w-4 h-4 c-slate-5" />
                    Shared with me
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Briefcase className="fs-0 w-4 h-4 c-slate-5" />
                    My projects
                  </Menu.Item>
                </Menu.Group>

                <Menu.Separator className="my-1 w-full h-px bg-silver-2" />

                <Menu.Group>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <GearDot className="fs-0 w-4 h-4 c-slate-5" />
                    Project settings
                  </Menu.Item>
                  <Menu.Item
                    className={(state) =>
                      `d-f ai-c g-2 py-2 pr-8 pl-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <Tray className="fs-0 w-4 h-4 c-slate-5" />
                    Archive
                  </Menu.Item>
                </Menu.Group>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </AnimatePresence>
    </Menu.Root>
  );
}

"use client";

import { Popover } from "@base-ui/react/popover";
import { Check } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function PopoverColorPalette() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("indigo");

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={`d-f ai-c g-2 px-3 py-2 bw-1 bc-silver-2 br-lg bg-white c-slate-10 us-none c-p fv:oo-2 fv:oc-indigo-5 ${
          open ? "bg-silver-1/50" : ""
        }`}
      >
        <span
          className={`w-4 h-4 br-9999 ${colors.find((c) => c.value === selected)?.bgClass}`}
        />
        <span className="fs-sm fw-500">Accent</span>
      </Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal keepMounted>
            <Popover.Positioner sideOffset={8}>
              <Popover.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="p-3 bg-white bc-silver-2 c-slate-10 bw-1 br-lg bs-o-xs"
              >
                <Popover.Title className="mb-3 c-slate-10 fs-sm fw-500">
                  Accent color
                </Popover.Title>
                <div className="d-g gtc-5 g-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        setSelected(color.value);
                        setOpen(false);
                      }}
                      aria-label={color.label}
                      className={`d-f ai-c jc-c w-8 h-8 br-9999 bw-0 c-p ${color.bgClass}`}
                    >
                      {selected === color.value && (
                        <Check className="w-4 h-4 c-white" />
                      )}
                    </button>
                  ))}
                </div>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}

const colors = [
  { value: "red", label: "Red", bgClass: "bg-red" },
  { value: "coral", label: "Coral", bgClass: "bg-coral" },
  { value: "yellow", label: "Yellow", bgClass: "bg-yellow" },
  { value: "lime", label: "Lime", bgClass: "bg-lime" },
  { value: "mint", label: "Mint", bgClass: "bg-mint" },
  { value: "cyan", label: "Cyan", bgClass: "bg-cyan" },
  { value: "blue", label: "Blue", bgClass: "bg-blue" },
  { value: "indigo", label: "Indigo", bgClass: "bg-indigo" },
  { value: "violet", label: "Violet", bgClass: "bg-violet" },
  { value: "magenta", label: "Magenta", bgClass: "bg-magenta" },
];

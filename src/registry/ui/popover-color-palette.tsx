"use client";

import { Check } from "iconoir-react";
import { useState } from "react";
import Popover from "./popover";

export default function PopoverColorPalette() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("indigo");

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      triggerVariant="label"
      title="Accent color"
      trigger={
        <>
          <span
            className={`w-4 h-4 br-9999 ${colors.find((c) => c.value === selected)?.bgClass}`}
          />
          <span className="fs-sm fw-500">Accent</span>
        </>
      }
    >
      <div className="d-g gtc-5 g-2">
        {colors.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => {
              setSelected(color.value);
              setOpen(false);
            }}
            aria-label={color.label}
            className={`d-f ai-c jc-c w-8 h-8 br-9999 bw-0 c-p ${color.bgClass}`}
          >
            {selected === color.value && <Check className="w-4 h-4 c-white" />}
          </button>
        ))}
      </div>
    </Popover>
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

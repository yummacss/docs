"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import {
  DotsNineIcon,
  ListBulletsIcon,
  ListIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import * as React from "react";

const toggleItems = [
  { value: "compact-list", label: "Compact list", icon: ListIcon },
  { value: "default-list", label: "Default list", icon: ListBulletsIcon },
  { value: "compact-grid", label: "Compact grid", icon: DotsNineIcon },
  { value: "default-grid", label: "Default grid", icon: SquaresFourIcon },
];

export default function ExampleToggleGroup() {
  const [selected, setSelected] = React.useState(["default-grid"]);

  return (
    <ToggleGroup
      value={selected}
      onValueChange={setSelected}
      className="p-r d-f br-2 bw-1 bc-silver-2 bg-white p-1 g-1"
    >
      {toggleItems.map((item) => {
        const isSelected = selected.includes(item.value);
        const Icon = item.icon;
        return (
          <Toggle
            key={item.value}
            aria-label={item.label}
            value={item.value}
            className={`p-r zi-10 d-f d-9 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 bg-transparent ${
              isSelected ? "c-white" : "c-slate-8 h:c-slate-10"
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="toggle-indicator"
                className="p-a ix-0 iy-0 zi-0 br-1 bg-indigo"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <Icon size={18} weight="bold" className="p-r zi-10" />
          </Toggle>
        );
      })}
    </ToggleGroup>
  );
}

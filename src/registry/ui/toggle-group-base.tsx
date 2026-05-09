"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Bold, Italic, Paperclip, Underline } from "@gravity-ui/icons";
import { useState } from "react";

export default function ToggleGroupBase() {
  const [selected, setSelected] = useState(["high"]);

  return (
    <ToggleGroup
      value={selected}
      onValueChange={setSelected}
      className="d-f p-r g-1 p-1 bg-white bc-silver-2 br-lg bw-1"
    >
      {toggleItems.map((item) => {
        const isSelected = selected.includes(item.value);
        const Icon = item.icon;
        return (
          <Toggle
            key={item.value}
            aria-label={item.label}
            value={item.value}
            className={`d-f w-9 h-9 ai-c jc-c bw-0 br-md us-none c-p fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
              isSelected
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`}
          >
            <Icon className="w-5 h-5" />
          </Toggle>
        );
      })}
    </ToggleGroup>
  );
}

const toggleItems = [
  { value: "high", label: "High priority", icon: Bold },
  { value: "medium", label: "Medium priority", icon: Italic },
  { value: "low", label: "Low priority", icon: Underline },
];

"use client";

import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Bold, Italic, Underline } from "iconoir-react";
import { useState } from "react";
import Toggle from "./toggle";

export default function ToggleGroupBase() {
  const [selected, setSelected] = useState(["high"]);

  return (
    <ToggleGroup
      value={selected}
      onValueChange={setSelected}
      className="d-f p-r g-1 p-1 bg-white bc-silver-2 br-lg bw-1"
    >
      {toggleItems.map((item) => (
        <Toggle
          key={item.value}
          value={item.value}
          aria-label={item.label}
          size="sm"
          shape="square"
          tone="ghost"
          className="br-lg"
          icon={<item.icon className="w-5 h-5" />}
          pressedIcon={<item.icon className="w-5 h-5" />}
        />
      ))}
    </ToggleGroup>
  );
}

const toggleItems = [
  { value: "high", label: "High priority", icon: Bold },
  { value: "medium", label: "Medium priority", icon: Italic },
  { value: "low", label: "Low priority", icon: Underline },
];

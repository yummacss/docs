"use client";

import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Check } from "iconoir-react";
import { useState } from "react";
import Toggle from "./toggle";

export default function ToggleColorPicker() {
  const [selected, setSelected] = useState(["blue"]);

  return (
    <ToggleGroup
      value={selected}
      onValueChange={setSelected}
      className="d-f g-2 p-2 bg-white br-9999 bw-1 bc-silver-2"
    >
      {colors.map((color) => (
        <Toggle
          key={color.value}
          value={color.value}
          aria-label={color.label}
          size="sm"
          swatchClassName={color.bgClass}
          pressedIcon={<Check className="w-4 h-4 c-white" />}
        />
      ))}
    </ToggleGroup>
  );
}

const colors = [
  { value: "red", label: "Red", bgClass: "bg-red" },
  { value: "orange", label: "Orange", bgClass: "bg-orange" },
  { value: "yellow", label: "Yellow", bgClass: "bg-yellow" },
  { value: "lime", label: "Lime", bgClass: "bg-lime" },
  { value: "green", label: "Green", bgClass: "bg-green" },
  { value: "cyan", label: "Cyan", bgClass: "bg-cyan" },
  { value: "blue", label: "Blue", bgClass: "bg-blue" },
  { value: "indigo", label: "Indigo", bgClass: "bg-indigo" },
  { value: "violet", label: "Violet", bgClass: "bg-violet" },
  { value: "coral", label: "Coral", bgClass: "bg-coral" },
];

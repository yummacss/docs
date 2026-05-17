"use client";

import { Tabs } from "@base-ui/react/tabs";
import { useState } from "react";

export default function ExampleTabsUnderline() {
  const [selected, setSelected] = useState("board");

  return (
    <Tabs.Root
      value={selected}
      onValueChange={setSelected}
      className="w-fc"
    >
      <Tabs.List className="d-f p-r g-3 bbw-1 bc-silver-2">
        {tabs.map((tab) => {
          const isSelected = selected === tab.value;
          return (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              className={`p-r zi-10 fg-1 d-f ai-c jc-c py-2 px-1 bg-transparent us-none fv:oo--1 fv:oc-indigo bbw-1 ${
                isSelected
                  ? "c-slate-10 bc-indigo"
                  : "c-slate-8 h:c-slate-10 bc-transparent"
              }`}
            >
              <span className="p-r zi-10 fs-sm fw-500">{tab.label}</span>
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
    </Tabs.Root>
  );
}

const tabs = [
  { value: "board", label: "Board" },
  { value: "timeline", label: "Timeline" },
  { value: "calendar", label: "Calendar" },
];

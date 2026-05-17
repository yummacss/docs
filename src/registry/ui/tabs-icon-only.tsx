"use client";

import { Tabs } from "@base-ui/react/tabs";
import { LayoutCells, LayoutColumns3, LayoutList } from "@gravity-ui/icons";
import { useState } from "react";

export default function ExampleTabsIconOnly() {
  const [selected, setSelected] = useState("grid");

  return (
    <Tabs.Root
      value={selected}
      onValueChange={setSelected}
      className="w-fc bg-silver-1 br-9999 bw-1"
    >
      <Tabs.List className="d-f p-r g-1 p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = selected === tab.value;
          return (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              className={`p-r zi-10 fg-1 d-f ai-c jc-c py-2 px-3 bg-transparent us-none fv:oo--1 fv:oc-indigo br-9999 ${
                isSelected ? "c-slate-10" : "c-slate-8 h:c-slate-10"
              }`}
              aria-label={tab.label}
            >
              <Icon className="p-r zi-10 w-5 h-5" />
            </Tabs.Tab>
          );
        })}
        <Tabs.Indicator
          className="p-a l-0 zi-0 bg-white br-9999 bs-o-xs tp-a tdu-200 ttf-io"
          style={{
            translate: "var(--active-tab-left) 0",
            width: "var(--active-tab-width)",
            top: "var(--active-tab-top)",
            height: "var(--active-tab-height)",
          }}
        />
      </Tabs.List>
    </Tabs.Root>
  );
}

const tabs = [
  { value: "grid", label: "Grid", icon: LayoutCells },
  { value: "list", label: "List", icon: LayoutList },
  { value: "columns", label: "Columns", icon: LayoutColumns3 },
];

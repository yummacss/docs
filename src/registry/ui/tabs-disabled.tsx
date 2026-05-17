"use client";

import { Tabs } from "@base-ui/react/tabs";
import { useState } from "react";

export default function ExampleTabsDisabled() {
  const [selected, setSelected] = useState("active");

  return (
    <Tabs.Root
      value={selected}
      onValueChange={setSelected}
      className="w-fc bg-silver-1 br-9999 bw-1"
    >
      <Tabs.List className="d-f p-r g-1 p-1">
        {tabs.map((tab) => {
          const isSelected = selected === tab.value;
          return (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              className={`p-r zi-10 fg-1 d-f ai-c jc-c py-2 px-3 bg-transparent us-none fv:oo--1 fv:oc-indigo br-9999 ${
                tab.disabled
                  ? "c-slate-5 o-50 c-na"
                  : isSelected
                    ? "c-slate-10"
                    : "c-slate-8 h:c-slate-10"
              }`}
            >
              <span className="p-r zi-10 fs-sm fw-500">{tab.label}</span>
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
  { value: "active", label: "Active" },
  { value: "review", label: "Review", disabled: true },
  { value: "done", label: "Done" },
];

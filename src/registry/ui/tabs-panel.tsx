"use client";

import { Tabs } from "@base-ui/react/tabs";
import { ChartAreaStacked, Globe, Persons } from "@gravity-ui/icons";
import { useState } from "react";

export default function ExampleTabsPanel() {
  const [selected, setSelected] = useState("overview");

  return (
    <Tabs.Root value={selected} onValueChange={setSelected} className="w-fc">
      <Tabs.List className="d-f p-r g-1 p-1 mb-6 bg-silver-1 br-9999 bw-1">
        {tabs.map((tab) => {
          const isSelected = selected === tab.value;
          return (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              className={`p-r zi-10 fg-1 d-f ai-c jc-c py-2 px-3 bg-transparent c-p us-none fv:oo--1 fv:oc-indigo br-9999 ${
                isSelected ? "c-slate-10" : "c-slate-8 h:c-slate-10"
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
      {tabs.map((tab) => (
        <Tabs.Panel
          key={tab.value}
          value={tab.value}
          className="p-6 bg-white br-lg bw-1"
        >
          <div className="d-f ai-c g-3">
            <tab.icon className="w-10 h-10 c-indigo-5" />
            <div>
              <h3 className="mb-1 c-slate-10 fw-600 fs-lg">{tab.panelTitle}</h3>
              <p className="c-slate-7 fs-sm">{tab.panelDesc}</p>
            </div>
          </div>
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}

const tabs = [
  {
    value: "overview",
    label: "Overview",
    icon: Globe,
    panelTitle: "Project Health",
    panelDesc:
      "Current sprint velocity at 85% with 3 blockers requiring attention across the frontend and API teams.",
  },
  {
    value: "activity",
    label: "Activity",
    icon: ChartAreaStacked,
    panelTitle: "Weekly Activity",
    panelDesc:
      "42 commits merged, 12 PRs in review, and 8 issues resolved in the last 7 days across all repositories.",
  },
  {
    value: "members",
    label: "Members",
    icon: Persons,
    panelTitle: "Team Roster",
    panelDesc:
      "8 active members including 4 frontend, 2 backend, 1 designer, and 1 PM assigned to the current milestone.",
  },
];

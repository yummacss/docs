"use client";

import { Tabs } from "@base-ui/react/tabs";
import { useState } from "react";

export default function ExampleTabsPanel() {
  const [selected, setSelected] = useState("statuses");

  return (
    <Tabs.Root
      value={selected}
      onValueChange={setSelected}
      className="w-fc"
    >
      <Tabs.List className="d-f p-r g-1 p-1 bg-silver-1 br-9999 bw-1 mb-6">
        {tabs.map((tab) => {
          const isSelected = selected === tab.value;
          return (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              className={`p-r zi-10 fg-1 d-f ai-c jc-c py-2 px-3 bg-transparent us-none fv:oo--1 fv:oc-indigo br-9999 ${
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
        <Tabs.Panel key={tab.value} value={tab.value} className="p-6 bg-white br-lg bw-1">
          <div>
            <h3 className="fw-600 fs-lg mb-1 c-slate-10">{tab.panelTitle}</h3>
            <p className="fs-sm c-slate-7">{tab.panelDesc}</p>
          </div>
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}

const tabs = [
  {
    value: "statuses",
    label: "Statuses",
    panelTitle: "Task Statuses",
    panelDesc: "Track progress across To Do, In Progress, Review, and Done stages with clear status transitions and blockers highlighted.",
  },
  {
    value: "priorities",
    label: "Priorities",
    panelTitle: "Priority Levels",
    panelDesc: "Assign Critical, High, Medium, or Low priority to tasks based on business impact and delivery deadlines.",
  },
  {
    value: "labels",
    label: "Labels",
    panelTitle: "Label Groups",
    panelDesc: "Organise work across teams with custom labels for feature types, departments, milestones, and release versions.",
  },
];

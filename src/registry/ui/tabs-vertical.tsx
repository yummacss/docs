"use client";

import { Tabs } from "@base-ui/react/tabs";
import { useState } from "react";

export default function ExampleTabsVertical() {
  const [selected, setSelected] = useState("general");

  return (
    <Tabs.Root
      orientation="vertical"
      value={selected}
      onValueChange={setSelected}
      className="d-f ai-s g-4"
    >
      <Tabs.List className="d-f p-r fd-c g-1 p-1 w-fc bg-silver-1 br-md bw-1 bc-silver-2">
        {tabs.map((tab) => {
          const isSelected = selected === tab.value;
          return (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              className={`p-r zi-10 d-f ai-c g-2 py-2 px-3 bg-transparent us-none fv:oo--1 fv:oc-indigo br-md ${
                isSelected ? "c-slate-10" : "c-slate-8 h:c-slate-10"
              }`}
            >
              <span className="p-r zi-10 fs-sm fw-500">{tab.label}</span>
            </Tabs.Tab>
          );
        })}
        <Tabs.Indicator
          className="p-a t-0 l-0 zi-0 bg-white br-md bs-o-xs tp-a tdu-200 ttf-io"
          style={{
            left: "var(--active-tab-left)",
            width: "var(--active-tab-width)",
            top: "var(--active-tab-top)",
            height: "var(--active-tab-height)",
          }}
        />
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Panel key={tab.value} value={tab.value} className="d-f fd-c g-2">
          <span className="c-slate-10 fs-lg fw-600">
            {content[tab.value].title}
          </span>
          <p className="c-slate-8 fs-sm">{content[tab.value].description}</p>
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}

const tabs = [
  { value: "general", label: "General" },
  { value: "notifications", label: "Notifications" },
  { value: "integrations", label: "Integrations" },
  { value: "security", label: "Security" },
];

const content: Record<string, { title: string; description: string }> = {
  general: {
    title: "General Settings",
    description:
      "Manage your workspace name, description, and default preferences for new projects.",
  },
  notifications: {
    title: "Notification Preferences",
    description:
      "Configure email, Slack, and in-app notifications to stay updated on project activity.",
  },
  integrations: {
    title: "Integrations",
    description:
      "Connect your workspace with GitHub, Jira, Figma, and other tools your team uses daily.",
  },
  security: {
    title: "Security",
    description:
      "Manage authentication methods, API tokens, and security policies for your workspace.",
  },
};

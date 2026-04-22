"use client";

import { Tabs } from "@base-ui/react/tabs";
import { BellDot, Gear, Person } from "@gravity-ui/icons";
import { useState } from "react";

export default function TabsBase() {
  const [selected, setSelected] = useState("account");

  return (
    <Tabs.Root
      value={selected}
      onValueChange={setSelected}
      className="w-80 bg-white bc-silver-2 br-md bw-1"
    >
      <Tabs.List className="d-f p-r g-1 p-1 bc-silver-2 bbw-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = selected === tab.value;
          return (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              className={`d-f ai-c jc-c g-2 h-9 bw-0 br-sm c-p us-none fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                isSelected
                  ? "bg-indigo c-white"
                  : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="fs-sm fw-500">{tab.label}</span>
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
      <Tabs.Panel value="account" className="p-4">
        <p className="c-slate-8 fs-sm">
          Manage your account details and preferences.
        </p>
      </Tabs.Panel>
      <Tabs.Panel value="settings" className="p-4">
        <p className="c-slate-8 fs-sm">
          Configure application settings and behavior.
        </p>
      </Tabs.Panel>
      <Tabs.Panel value="notifications" className="p-4">
        <p className="c-slate-8 fs-sm">
          Control how you receive notifications.
        </p>
      </Tabs.Panel>
    </Tabs.Root>
  );
}

const tabs = [
  { value: "account", label: "Account", icon: Person },
  { value: "settings", label: "Settings", icon: Gear },
  { value: "notifications", label: "Notifications", icon: BellDot },
];

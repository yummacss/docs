"use client";

import { Tabs } from "@base-ui/react/tabs";
import { BellDot, Gear, Person } from "@gravity-ui/icons";
import { motion } from "motion/react";
import * as React from "react";

const tabs = [
  { value: "account", label: "Account", icon: Person },
  { value: "settings", label: "Settings", icon: Gear },
  { value: "notifications", label: "Notifications", icon: BellDot },
];

export default function ExampleTabs() {
  const [selected, setSelected] = React.useState("account");

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
              className={`p-r zi-10 fx-1 d-f ai-c jc-c g-2 h-9 bw-0 br-sm bg-transparent c-p us-none fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                isSelected ? "c-white" : "c-slate-8 h:c-slate-10"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="tabs-indicator"
                  className="p-a ix-0 iy-0 zi-0 bg-indigo br-sm"
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
              )}
              <Icon className="w-5 h-5 p-r zi-10" />
              <span className="p-r zi-10 fs-sm fw-500">{tab.label}</span>
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

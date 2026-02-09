"use client";

import { Tabs } from "@base-ui/react/tabs";
import { BellIcon, GearIcon, UserIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import * as React from "react";

const tabs = [
  { value: "account", label: "Account", icon: UserIcon },
  { value: "settings", label: "Settings", icon: GearIcon },
  { value: "notifications", label: "Notifications", icon: BellIcon },
];

export default function ExampleTabs() {
  const [selected, setSelected] = React.useState("account");

  return (
    <Tabs.Root
      value={selected}
      onValueChange={setSelected}
      className="w-80 bg-white br-2 bw-1 bc-silver-2"
    >
      <Tabs.List className="p-r d-f g-1 p-1 bbw-1 bc-silver-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = selected === tab.value;
          return (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              className={`p-r zi-10 fx-1 d-f ai-c jc-c g-2 h-9 bw-0 br-1 bg-transparent c-p us-none fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                isSelected ? "c-white" : "c-slate-8 h:c-slate-10"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="tabs-indicator"
                  className="p-a ix-0 iy-0 zi-0 br-1 bg-indigo"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon size={18} weight="bold" className="p-r zi-10" />
              <span className="p-r zi-10 fs-sm fw-500">{tab.label}</span>
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
      <Tabs.Panel value="account" className="p-4">
        <p className="fs-sm c-slate-8">
          Manage your account details and preferences.
        </p>
      </Tabs.Panel>
      <Tabs.Panel value="settings" className="p-4">
        <p className="fs-sm c-slate-8">
          Configure application settings and behavior.
        </p>
      </Tabs.Panel>
      <Tabs.Panel value="notifications" className="p-4">
        <p className="fs-sm c-slate-8">
          Control how you receive notifications.
        </p>
      </Tabs.Panel>
    </Tabs.Root>
  );
}

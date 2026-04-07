"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronRight, CircleInfo, HardDrive } from "@gravity-ui/icons";
import * as React from "react";

export default function ExampleCollapsible() {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="d-f fd-c w-72 bg-white bc-silver-3 bw-1 br-lg"
    >
      <Collapsible.Trigger className="d-f b-0 ai-c jc-sb g-3 w-full px-4 py-3 bg-transparent ta-l c-p">
        <div className="d-f ai-c g-3">
          <span className="d-f ai-c jc-c w-8 h-8 br-md bg-silver-1 bc-silver-3 bw-1">
            <HardDrive className="w-4 h-4 c-slate-6" />
          </span>
          <div className="d-f fd-c g-0">
            <span className="fs-sm fw-600 c-slate-9">
              {systemRequirements.header.title}
            </span>
            <span className="fs-xs c-slate-5">
              {systemRequirements.header.description}
            </span>
          </div>
        </div>
        <ChevronRight
          className={`w-4 h-4 c-slate-4 ${open ? "ro-90" : "ro-0"}`}
        />
      </Collapsible.Trigger>

      <Collapsible.Panel>
        <div className="d-f fd-c g-0 btw-1 bc-silver-3">
          {systemRequirements.items.map((item) => (
            <div
              key={item.label}
              className="d-f ai-c jc-sb px-4 py-3 bbw-1 bc-silver-2"
            >
              <span className="fs-xs fw-500 c-slate-7">{item.label}</span>
              <span className="fs-xs fw-600 c-slate-8">{item.value}</span>
            </div>
          ))}
          <div className="d-f ai-c g-2 px-4 py-3 bg-silver-1 bbr-lg">
            <CircleInfo className="w-3 h-3 c-slate-6 fs-0" />
            <span className="fs-xs c-slate-7">{systemRequirements.footer}</span>
          </div>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

const systemRequirements = {
  header: {
    title: "System requirements",
    description: "View hardware & OS details",
  },
  items: [
    { label: "Runtime", value: "Node.js 18 or later" },
    { label: "Platform", value: "macOS, Windows, Linux" },
    { label: "RAM", value: "4 GB minimum" },
  ],
  footer: "16 GB RAM recommended for large projects",
};

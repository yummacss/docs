"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { CaretRightIcon, HardDriveIcon, InfoIcon } from "@phosphor-icons/react";
import * as React from "react";

export default function ExampleCollapsible() {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="d-f fd-c w-72 bg-white bc-silver-3 bw-1 br-3"
    >
      <Collapsible.Trigger className="d-f b-0 ai-c jc-sb g-3 w-full px-4 py-3 bg-transparent ta-l c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        <div className="d-f ai-c g-3">
          <span className="d-f ai-c jc-c w-8 h-8 br-2 bg-silver-1 bc-silver-3 bw-1">
            <HardDriveIcon size={16} className="c-slate-6" />
          </span>
          <div className="d-f fd-c g-0">
            <span className="fs-sm fw-600 c-slate-9">System requirements</span>
            <span className="fs-xs c-slate-5">View hardware & OS details</span>
          </div>
        </div>
        <CaretRightIcon
          size={14}
          weight="bold"
          className={`c-slate-4 ${open ? "ro-90" : "ro-0"}`}
        />
      </Collapsible.Trigger>

      <Collapsible.Panel>
        <div className="d-f fd-c g-0 btw-1 bc-silver-3">
          <div className="d-f ai-c jc-sb px-4 py-3 bbw-1 bc-silver-2">
            <span className="fs-xs fw-500 c-slate-7">Runtime</span>
            <span className="fs-xs fw-600 c-slate-8">Node.js 18 or later</span>
          </div>
          <div className="d-f ai-c jc-sb px-4 py-3 bbw-1 bc-silver-2">
            <span className="fs-xs fw-500 c-slate-7">Platform</span>
            <span className="fs-xs fw-600 c-slate-8">
              macOS, Windows, Linux
            </span>
          </div>
          <div className="d-f ai-c jc-sb px-4 py-3 bbw-1 bc-silver-2">
            <span className="fs-xs fw-500 c-slate-7">RAM</span>
            <span className="fs-xs fw-600 c-slate-8">4 GB minimum</span>
          </div>
          <div className="d-f ai-c g-2 px-4 py-3 bg-silver-1 bbr-3">
            <InfoIcon size={13} className="c-slate-6 fs-0" />
            <span className="fs-xs c-slate-7">
              16 GB RAM recommended for large projects
            </span>
          </div>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

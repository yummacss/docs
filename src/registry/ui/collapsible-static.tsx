"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronRight } from "@gravity-ui/icons";
import * as React from "react";

export default function CollapsibleStatic() {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="d-f fd-c w-64 c-slate-10"
    >
      <Collapsible.Trigger className="d-f b-0 ai-c jc-sb w-full px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fs-sm fw-600 c-p h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        <div className="d-f ai-c g-2">
          <ChevronRight
            className={`w-3 h-3 ${open ? "ro-90" : "ro-0"} transition-all`}
          />
          {systemRequirements.title}
        </div>
      </Collapsible.Trigger>

      <Collapsible.Panel className="d-b o-h h-auto opacity-100">
        <div className="d-f fd-c g-2 mt-1 py-3 px-4 bg-white bc-silver-2 br-md bw-1 fs-sm">
          {systemRequirements.items.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

const systemRequirements = {
  title: "System requirements",
  items: ["Node.js 18 or later", "macOS, Windows, or Linux", "4GB RAM minimum"],
};

"use client";

import { Magnifier } from "@gravity-ui/icons";

export default function InputIcon() {
  return (
    <div className="d-f ai-c w-64 bg-white bc-silver-3 bw-1 br-lg bs-o-xs fv:ow-2 fv:oo-2 fv:oc-indigo-6">
      <div className="d-f ai-c jc-c pl-3 c-slate-6">
        <Magnifier className="w-4 h-4" />
      </div>
      <input
        type="text"
        placeholder="Search products..."
        aria-label="Search products"
        className="h-10 f-1 pl-2 pr-4 bg-transparent c-slate-10 fs-md us-none"
      />
    </div>
  );
}

"use client";

import { Magnifier } from "@gravity-ui/icons";

export default function InputIconRight() {
  return (
    <div className="d-f ai-c w-64 bg-white bc-silver-3 bw-1 br-lg bs-o-xs fv:ow-2 fv:oo-2 fv:oc-indigo-6">
      <input
        type="text"
        placeholder="Search in store..."
        aria-label="Search in store"
        className="h-10 f-1 pl-4 pr-2 bg-transparent c-slate-10 fs-md us-none"
      />
      <button
        type="button"
        className="d-f ai-c jc-c pr-3 c-slate-6 c-p us-none"
        aria-label="Search"
      >
        <Magnifier className="w-4 h-4" />
      </button>
    </div>
  );
}
"use client";

import { useState } from "react";

export default function TextareaCharacterCount() {
  const [value, setValue] = useState("");
  const max = 200;
  const remaining = max - value.length;
  const pct = Math.min((value.length / max) * 100, 100);

  return (
    <div className="d-f fd-c g-2 w-64">
      <label
        htmlFor="textarea-count"
        className="c-slate-10 fs-sm fw-500 us-none"
      >
        Task description
      </label>
      <textarea
        id="textarea-count"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Describe the task..."
        className="h-32 w-100% pt-3 pl-3 bg-white bc-silver-3 c-slate-10 br-lg bw-1 fs-md bs-o-xs r-none fv:oo--1 fv:oc-indigo-5"
      />
      <div className="d-f fd-c g-1">
        <div className="d-f jc-sb">
          <span className="c-slate-5 fs-xs">
            {remaining} characters remaining
          </span>
          <span
            className={`fs-xs fw-500 ${remaining <= 20 ? "c-red" : "c-slate-5"}`}
          >
            {value.length} / {max}
          </span>
        </div>
        <div className="w-100% h-1 bg-silver-2 br-9999 o-h">
          <div
            className={`h-100% br-9999 ${remaining <= 20 ? "bg-red" : "bg-indigo"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

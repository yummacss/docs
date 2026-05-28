"use client";

import { Field } from "@base-ui/react/field";
import { Search } from "iconoir-react";

export default function FieldTrailing() {
  return (
    <Field.Root className="d-f fd-c g-2">
      <label htmlFor="icon-right-input" className="c-slate-10 fs-sm fw-500">
        Search tasks
      </label>
      <div className="d-f p-r ai-c">
        <Field.Control
          id="icon-right-input"
          type="text"
          placeholder="Search tasks..."
          aria-label="Search tasks"
          className="h-10 w-64 pl-4 pr-10 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
        />
        <div className="d-f p-a r-3 ai-c jc-c c-slate-6">
          <Search className="w-4 h-4" />
        </div>
      </div>
    </Field.Root>
  );
}

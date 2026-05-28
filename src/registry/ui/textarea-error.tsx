"use client";

import { Field } from "@base-ui/react/field";
import { WarningTriangle } from "iconoir-react";

export default function TextareaError() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">
        Task notes <span className="c-red-5">*</span>
      </Field.Label>
      <div className="d-f p-r ai-s">
        <Field.Control
          render={<textarea />}
          placeholder="Add notes about this task..."
          aria-label="Add notes about this task"
          className="h-24 w-64 pt-3 pl-3 pr-10 bg-white bc-red-5 c-slate-10 bw-1 br-md fs-md bs-o-xs r-none fv:oo--1 fv:oc-red-5"
        />
        <div className="d-f p-a r-3 t-3 ai-c jc-c c-red-5">
          <WarningTriangle className="w-4 h-4" />
        </div>
      </div>
      <Field.Description className="c-red-5 fs-xs">
        Please add notes for this task
      </Field.Description>
    </Field.Root>
  );
}

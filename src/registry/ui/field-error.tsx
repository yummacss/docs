"use client";

import { Field } from "@base-ui/react/field";
import { TriangleAlert } from "lucide-react";

export default function FieldError() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">
        Task description <span className="c-red-5">*</span>
      </Field.Label>
      <div className="d-f p-r ai-c">
        <Field.Control
          type="text"
          placeholder="Add a description..."
          aria-label="Add a description"
          className="h-10 w-64 pl-4 pr-10 bg-white bc-red-5 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-red-5"
        />
        <div className="d-f p-a r-3 ai-c jc-c c-red-5">
          <TriangleAlert className="w-4 h-4" />
        </div>
      </div>
      <Field.Description className="c-red-5 fs-xs">
        Please add a description to your task
      </Field.Description>
    </Field.Root>
  );
}

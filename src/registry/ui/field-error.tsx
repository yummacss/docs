"use client";

import { Field } from "@base-ui/react/field";
import { CircleInfo } from "@gravity-ui/icons";

export default function FieldError() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">
        Post caption <span className="c-red-5">*</span>
      </Field.Label>
      <div className="d-f ai-c p-r">
        <Field.Control
          type="text"
          placeholder="Add a caption..."
          aria-label="Add a caption"
          className="h-10 w-64 pl-4 pr-10 bg-white bc-red-5 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-red-5"
        />
        <div className="d-f ai-c jc-c p-a r-3 c-red-5">
          <CircleInfo className="w-4 h-4" />
        </div>
      </div>
      <Field.Description className="c-red-5 fs-xs">
        Please add a caption to your post
      </Field.Description>
    </Field.Root>
  );
}

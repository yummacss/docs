"use client";

import { Field } from "@base-ui/react/field";
import { Magnifier } from "@gravity-ui/icons";

export default function FieldIcon() {
  return (
    <Field.Root className="d-f ai-c w-64 bg-white bc-silver-3 bw-1 br-lg bs-o-xs">
      <div className="d-f ai-c jc-c pl-3 c-slate-6">
        <Magnifier className="w-4 h-4" />
      </div>
      <Field.Control
        type="text"
        placeholder="Search products..."
        aria-label="Search products"
        className="f-1 h-10 pl-2 pr-4 bg-transparent c-slate-10 bw-1 br-lg fs-md bs-o-xs us-none fv:oo--1 fv:oc-indigo-6"
      />
    </Field.Root>
  );
}

"use client";

import { Field } from "@base-ui/react/field";
import { Magnifier } from "@gravity-ui/icons";

export default function FieldIconRight() {
  return (
    <Field.Root className="d-f ai-c w-64 bg-white bc-silver-3 bw-1 br-lg bs-o-xs">
      <Field.Control
        type="text"
        placeholder="Search in store..."
        aria-label="Search in store"
        className="h-10 f-1 pl-4 pr-2 bg-transparent c-slate-10 bw-1 br-lg fs-md us-none fv:oo--1 fv:oc-indigo-6"
      />
      <button
        type="button"
        className="d-f ai-c jc-c pr-3 c-slate-6 c-p us-none fv:oo-2 fv:oc-indigo-6"
        aria-label="Search"
      >
        <Magnifier className="w-4 h-4" />
      </button>
    </Field.Root>
  );
}

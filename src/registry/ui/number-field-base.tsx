"use client";

import { NumberField } from "@base-ui/react/number-field";
import { Minus, Plus } from "@gravity-ui/icons";
import { useId } from "react";

export default function NumberFieldBase() {
  const id = useId();
  return (
    <NumberField.Root id={id} defaultValue={4} className="d-f fd-c ai-fs g-2">
      <NumberField.ScrubArea className="c-er">
        <label htmlFor={id} className="c-slate-10 fs-sm fw-500 c-er">
          Quantity
        </label>
      </NumberField.ScrubArea>

      <NumberField.Group className="d-f">
        <NumberField.Decrement className="d-f ai-c jc-c w-10 h-10 bg-white bc-silver-3 c-slate-10 blr-lg byw-1 blw-1 us-none c-p h:bg-silver-1/50 a:bg-silver-2 fv:oo--1 fv:oc-indigo-5">
          <Minus className="w-3 h-3" />
        </NumberField.Decrement>
        <NumberField.Input className="h-10 w-32 bg-white bc-silver-3 c-slate-10 byw-1 ta-c fs-md" />
        <NumberField.Increment className="d-f ai-c jc-c w-10 h-10 bg-white bc-silver-3 c-slate-10 brr-lg byw-1 brw-1 us-none c-p h:bg-silver-1/50 a:bg-silver-2 fv:oo--1 fv:oc-indigo-5">
          <Plus className="w-3 h-3" />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

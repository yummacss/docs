"use client";

import { NumberField } from "@base-ui/react/number-field";
import { Minus, Plus } from "iconoir-react";
import { useId } from "react";

export default function NumberFieldLg() {
  const id = useId();
  return (
    <NumberField.Root id={id} defaultValue={4} className="d-f fd-c ai-fs g-2">
      <NumberField.ScrubArea className="c-er">
        <label htmlFor={id} className="c-slate-10 fs-sm fw-500 c-er">
          Quantity
        </label>
      </NumberField.ScrubArea>

      <NumberField.Group className="d-f fw:oo--1 fw:oc-indigo-5">
        <NumberField.Decrement className="d-f ai-c jc-c w-12 h-12 bg-white bc-silver-3 c-slate-10 blr-lg byw-1 blw-1 us-none c-p h:bg-silver-1/50 a:bg-silver-2">
          <Minus className="w-4 h-4" />
        </NumberField.Decrement>
        <NumberField.Input className="h-12 w-36 bg-white bc-silver-3 c-slate-10 byw-1 ta-c fs-lg" />
        <NumberField.Increment className="d-f ai-c jc-c w-12 h-12 bg-white bc-silver-3 c-slate-10 brr-lg byw-1 brw-1 us-none c-p h:bg-silver-1/50 a:bg-silver-2">
          <Plus className="w-4 h-4" />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

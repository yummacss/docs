"use client";

import { NumberField } from "@base-ui/react/number-field";
import { Minus, Plus } from "iconoir-react";
import { useId } from "react";

export default function NumberFieldDisabled() {
  const id = useId();
  return (
    <NumberField.Root
      id={id}
      defaultValue={4}
      disabled
      className="d-f fd-c ai-fs g-2"
    >
      <NumberField.ScrubArea className="c-er">
        <label htmlFor={id} className="c-slate-5 fs-sm fw-500 c-er">
          Quantity
        </label>
      </NumberField.ScrubArea>

      <NumberField.Group className="d-f fw:oo--1 fw:oc-indigo-5">
        <NumberField.Decrement className="d-f ai-c jc-c w-10 h-10 bg-silver-1 bc-silver-3 c-slate-4 blr-lg byw-1 blw-1 us-none">
          <Minus className="w-3 h-3" />
        </NumberField.Decrement>
        <NumberField.Input className="h-10 w-32 bg-silver-1 bc-silver-3 c-slate-4 byw-1 ta-c fs-md" />
        <NumberField.Increment className="d-f ai-c jc-c w-10 h-10 bg-silver-1 bc-silver-3 c-slate-4 brr-lg byw-1 brw-1 us-none">
          <Plus className="w-3 h-3" />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

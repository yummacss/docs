"use client";

import { NumberField } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import * as React from "react";

export default function ExampleNumberField() {
  const id = React.useId();
  return (
    <NumberField.Root id={id} defaultValue={4} className="d-f fd-c ai-fs g-2">
      <NumberField.ScrubArea className="c-er">
        <label htmlFor={id} className="c-slate-10 fs-sm fw-600 c-er">
          Quantity
        </label>
      </NumberField.ScrubArea>

      <NumberField.Group className="d-f">
        <NumberField.Decrement className="d-f ai-c jc-c w-10 h-10 bg-white bc-silver-3 c-slate-10 blr-md bw-1 brw-0 us-none c-p h:bg-silver-1 a:bg-silver-2">
          <MinusIcon size={12} weight="bold" />
        </NumberField.Decrement>
        <NumberField.Input className="p-r zi-10 h-10 w-20 bg-white bc-silver-3 c-slate-10 btw-1 bbw-1 ta-c fs-md fv:z-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
        <NumberField.Increment className="d-f ai-c jc-c w-10 h-10 bg-white bc-silver-3 c-slate-10 brr-md bw-1 blw-0 us-none c-p h:bg-silver-1 a:bg-silver-2">
          <PlusIcon size={12} weight="bold" />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

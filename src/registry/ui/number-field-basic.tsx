"use client";

import { NumberField } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import * as React from "react";

export default function ExampleNumberField() {
  const id = React.useId();
  return (
    <NumberField.Root id={id} defaultValue={4} className="d-f fd-c ai-fs g-2">
      <NumberField.ScrubArea className="c-er">
        <label htmlFor={id} className="c-er fs-sm fw-600 c-slate-10">
          Quantity
        </label>
      </NumberField.ScrubArea>

      <NumberField.Group className="d-f">
        <NumberField.Decrement className="d-f ai-c jc-c d-10 bw-1 brw-0 bc-silver-3 br-l-2 bg-white c-slate-10 us-none c-p h:bg-silver-1 a:bg-silver-2">
          <MinusIcon size={12} weight="bold" />
        </NumberField.Decrement>
        <NumberField.Input className="h-10 w-20 ta-c fs-sm c-slate-10 btw-1 bbw-1 bc-silver-3 bg-white fv:z-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
        <NumberField.Increment className="d-f ai-c jc-c d-10 bw-1 blw-0 bc-silver-3 br-r-2 bg-white c-slate-10 us-none c-p h:bg-silver-1 a:bg-silver-2">
          <PlusIcon size={12} weight="bold" />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

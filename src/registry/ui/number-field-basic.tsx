"use client";

import { NumberField } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import * as React from "react";

export default function ExampleNumberField() {
  const id = React.useId();
  return (
    <NumberField.Root id={id} defaultValue={100} className="d-f fd-c ai-fs g-1">
      <NumberField.ScrubArea className="c-er">
        <label htmlFor={id} className="c-er fs-sm fw-500 c-slate-12">
          Amount
        </label>
      </NumberField.ScrubArea>

      <NumberField.Group className="d-f">
        <NumberField.Decrement className="d-f ai-c jc-c d-10 bw-1 brw-0 bc-silver-4 br-l-1 bg-silver-1 c-slate-12 us-none h:bg-silver-2 a:bg-silver-4">
          <MinusIcon size={10} />
        </NumberField.Decrement>
        <NumberField.Input className="h-10 w-24 ta-c fs-md c-slate-12 btw-1 bbw-1 bc-silver-4 fv:z-1 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8" />
        <NumberField.Increment className="d-f ai-c jc-c d-10 bw-1 blw-0 bc-silver-4 br-r-1 bg-silver-1 c-slate-12 us-none h:bg-silver-2 a:bg-silver-4">
          <PlusIcon size={10} />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

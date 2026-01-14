"use client";

import { NumberField } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import * as React from "react";

export default function ExampleNumberField() {
  const id = React.useId();
  return (
    <NumberField.Root id={id} defaultValue={100} className="d-f fd-c ai-fs g-1">
      <NumberField.ScrubArea className="c-ewr">
        <label htmlFor={id} className="c-ewr fs-sm fw-500 c-slate">
          Amount
        </label>
      </NumberField.ScrubArea>

      <NumberField.Group className="d-f">
        <NumberField.Decrement className="d-f ai-c jc-c d-10 br-l-1 btw-1 bbw-1 blw-1 brw-0 bc-silver-4 bg-silver-1 c-slate us-none h:bg-silver-2">
          <MinusIcon size={10} />
        </NumberField.Decrement>
        <NumberField.Input className="h-10 w-24 ta-c fs-md c-slate number-field-input" />
        <NumberField.Increment className="d-f ai-c jc-c d-10 br-r-1 btw-1 bbw-1 blw-0 brw-1 bc-silver-4 bg-silver-1 c-slate us-none h:bg-silver-2">
          <PlusIcon size={10} />
        </NumberField.Increment>
      </NumberField.Group>

      <style>{`
        .number-field-input {
          border-top: 1px solid var(--silver-4);
          border-bottom: 1px solid var(--silver-4);
          border-left: none;
          border-right: none;
          font-variant-numeric: tabular-nums;
        }
        .number-field-input:focus {
          z-index: 1;
          outline: 2px solid var(--blue-8);
          outline-offset: -1px;
        }
      `}</style>
    </NumberField.Root>
  );
}

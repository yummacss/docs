"use client";

import { Toggle } from "@base-ui/react/toggle";
import { HeartIcon } from "@phosphor-icons/react";

export default function ExampleToggle() {
  return (
    <div className="d-f g-px br-1 bw-1 bc-silver-4 bg-silver-1 p-px">
      <Toggle
        aria-label="Favorite"
        className="d-f d-8 ai-c jc-c b-0 br-1 bg-transparent c-slate-6 us-none h:bg-silver-2 fv:bc-transparent fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 a:bg-silver-3 data-pressed:c-slate-12"
        render={(props, state) => {
          return (
            <button type="button" {...props}>
              <HeartIcon
                className="d-5"
                weight={state.pressed ? "fill" : "regular"}
              />
            </button>
          );
        }}
      />
    </div>
  );
}

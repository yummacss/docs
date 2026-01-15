"use client";

import { Toggle } from "@base-ui/react/toggle";
import { HeartIcon } from "@phosphor-icons/react";
import * as React from "react";

export default function ExampleToggle() {
  const [pressed, setPressed] = React.useState(false);

  return (
    <div className="d-f bw-1 bc-silver-4 br-1 bg-silver-1 g-px p-px">
      <Toggle
        aria-label="Favorite"
        pressed={pressed}
        onPressedChange={setPressed}
        className="d-f ai-c jc-c d-8 br-1 c-slate-6 us-none h:bg-silver-2 a:bg-silver-3 toggle-button"
      >
        <HeartIcon size={20} weight={pressed ? "fill" : "regular"} />
      </Toggle>

      <style>{`
        .toggle-button {
          border: 0;
          background-color: transparent;
        }
        .toggle-button:focus-visible {
          outline: 2px solid var(--blue-8);
          outline-offset: -1px;
        }
        .toggle-button[data-pressed] {
          color: var(--slate);
        }
      `}</style>
    </div>
  );
}

"use client";

import { Button } from "@base-ui/react/button";
import { Toggle } from "@base-ui/react/toggle";
import { Moon, Sun } from "iconoir-react";
import type { ButtonHTMLAttributes } from "react";

export default function ToggleStatic() {
  return (
    <Toggle
      aria-label="Sun task"
      className={(state) =>
        `d-f w-12 h-12 ai-c jc-c bw-1 br-9999 us-none c-p fv:oo-2 fv:oc-indigo-5 ${
          state.pressed
            ? "bg-indigo bc-indigo-6 c-white"
            : "bg-white bc-silver-3 c-indigo h:bg-silver-1"
        }`
      }
      render={(props, state) => (
        <Button {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
          {state.pressed ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>
      )}
    />
  );
}

"use client";

import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { useId } from "react";
import Checkbox from "./checkbox";

export default function CheckboxGroupLabel() {
  const id = useId();

  return (
    <CheckboxGroup
      aria-labelledby={id}
      defaultValue={["email"]}
      className="d-f fd-c g-2 ai-fs c-slate-10"
    >
      <div className="fs-xs fw-600 c-slate-5 us-none" id={id}>
        Task actions
      </div>
      <Checkbox name="notifications" value="email" label="Edit task" />
      <Checkbox name="notifications" value="sms" label="Delete task" />
      <Checkbox name="notifications" value="push" label="Assign member" />
    </CheckboxGroup>
  );
}

"use client";

import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { useId, useState } from "react";
import Checkbox from "./checkbox";

export default function CheckboxParent() {
  const id = useId();
  const [value, setValue] = useState<string[]>([]);

  return (
    <CheckboxGroup
      aria-labelledby={id}
      value={value}
      onValueChange={setValue}
      allValues={permissions}
      className="d-f fd-c g-2 c-slate-10"
    >
      <div id={id}>
        <Checkbox name="permissions" parent label="Project permissions" />
      </div>
      <div className="d-f fd-c g-2 ml-6">
        <Checkbox value="read" label="Read" />
        <Checkbox value="write" label="Write" />
        <Checkbox value="delete" label="Delete" />
      </div>
    </CheckboxGroup>
  );
}

const permissions = ["read", "write", "delete"];

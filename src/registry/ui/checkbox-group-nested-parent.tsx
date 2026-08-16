"use client";

import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { useId, useState } from "react";
import Checkbox from "./checkbox";

export default function CheckboxGroupNestedParent() {
  const analyticsId = useId();
  const moderationId = useId();
  const [analyticsValue, setAnalyticsValue] = useState<string[]>([]);
  const [moderationValue, setModerationValue] = useState<string[]>([]);

  return (
    <div className="d-f fd-c g-3 c-slate-10">
      <CheckboxGroup
        aria-labelledby={analyticsId}
        value={analyticsValue}
        onValueChange={setAnalyticsValue}
        allValues={["view_tasks", "create_tasks"]}
        className="d-f fd-c g-2"
      >
        <div id={analyticsId}>
          <Checkbox name="analytics" parent label="Sprint planning" />
        </div>
        <div className="d-f fd-c g-2 ml-6">
          <Checkbox value="view_tasks" label="View tasks" />
          <Checkbox value="create_tasks" label="Create tasks" />
        </div>
      </CheckboxGroup>

      <CheckboxGroup
        aria-labelledby={moderationId}
        value={moderationValue}
        onValueChange={setModerationValue}
        allValues={["edit_sprint", "delete_sprint"]}
        className="d-f fd-c g-2"
      >
        <div id={moderationId}>
          <Checkbox name="moderation" parent label="Sprint management" />
        </div>
        <div className="d-f fd-c g-2 ml-6">
          <Checkbox value="edit_sprint" label="Edit sprint" />
          <Checkbox value="delete_sprint" label="Delete sprint" />
        </div>
      </CheckboxGroup>
    </div>
  );
}

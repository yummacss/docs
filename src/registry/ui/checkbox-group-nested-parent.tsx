"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { Check, Minus } from "lucide-react";
import { useId, useState } from "react";

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
        <label
          className="d-f ai-c g-2 c-slate-10 fs-sm fw-500"
          id={analyticsId}
        >
          <Checkbox.Root
            name="analytics"
            parent
            className={(state) =>
              `d-f w-4 h-4 ai-c jc-c br-sm fv:oo-2 fv:oc-indigo-5 ${
                state.checked || state.indeterminate
                  ? "bg-indigo"
                  : "bw-1 bc-silver-3 bg-transparent bs-o-xs"
              }`
            }
          >
            <Checkbox.Indicator
              className="d-f c-white"
              render={(props, state) => (
                <span {...props}>
                  {state.indeterminate ? (
                    <Minus className="w-3 h-3" />
                  ) : (
                    <Check className="w-3 h-3" />
                  )}
                </span>
              )}
            />
          </Checkbox.Root>
          Sprint planning
        </label>

        <div className="d-f fd-c g-2 ml-6">
          <label className="d-f ai-c g-2 fs-sm fw-500">
            <Checkbox.Root
              value="view_tasks"
              className={(state) =>
                `d-f w-4 h-4 ai-c jc-c br-sm fv:oo-2 fv:oc-indigo-5 ${
                  state.checked
                    ? "bg-indigo"
                    : "bw-1 bc-silver-3 bg-transparent bs-o-xs"
                }`
              }
            >
              <Checkbox.Indicator className="d-f c-white">
                <Check className="w-3 h-3" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            View tasks
          </label>

          <label className="d-f ai-c g-2 fs-sm fw-500">
            <Checkbox.Root
              value="create_tasks"
              className={(state) =>
                `d-f w-4 h-4 ai-c jc-c br-sm fv:oo-2 fv:oc-indigo-5 ${
                  state.checked
                    ? "bg-indigo"
                    : "bw-1 bc-silver-3 bg-transparent bs-o-xs"
                }`
              }
            >
              <Checkbox.Indicator className="d-f c-white">
                <Check className="w-3 h-3" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Create tasks
          </label>
        </div>
      </CheckboxGroup>

      <CheckboxGroup
        aria-labelledby={moderationId}
        value={moderationValue}
        onValueChange={setModerationValue}
        allValues={["edit_sprint", "delete_sprint"]}
        className="d-f fd-c g-2"
      >
        <label className="d-f ai-c g-2 fs-sm fw-500" id={moderationId}>
          <Checkbox.Root
            name="moderation"
            parent
            className={(state) =>
              `d-f w-4 h-4 ai-c jc-c br-sm fv:oo-2 fv:oc-indigo-5 ${
                state.checked || state.indeterminate
                  ? "bg-indigo"
                  : "bw-1 bc-silver-3 bg-transparent bs-o-xs"
              }`
            }
          >
            <Checkbox.Indicator
              className="d-f c-white"
              render={(props, state) => (
                <span {...props}>
                  {state.indeterminate ? (
                    <Minus className="w-3 h-3" />
                  ) : (
                    <Check className="w-3 h-3" />
                  )}
                </span>
              )}
            />
          </Checkbox.Root>
          Sprint management
        </label>

        <div className="d-f fd-c g-2 ml-6">
          <label className="d-f ai-c g-2 fs-sm fw-500">
            <Checkbox.Root
              value="edit_sprint"
              className={(state) =>
                `d-f w-4 h-4 ai-c jc-c br-sm fv:oo-2 fv:oc-indigo-5 ${
                  state.checked
                    ? "bg-indigo"
                    : "bw-1 bc-silver-3 bg-transparent bs-o-xs"
                }`
              }
            >
              <Checkbox.Indicator className="d-f c-white">
                <Check className="w-3 h-3" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Edit sprint
          </label>

          <label className="d-f ai-c g-2 fs-sm fw-500">
            <Checkbox.Root
              value="delete_sprint"
              className={(state) =>
                `d-f w-4 h-4 ai-c jc-c br-sm fv:oo-2 fv:oc-indigo-5 ${
                  state.checked
                    ? "bg-indigo"
                    : "bw-1 bc-silver-3 bg-transparent bs-o-xs"
                }`
              }
            >
              <Checkbox.Indicator className="d-f c-white">
                <Check className="w-3 h-3" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Delete sprint
          </label>
        </div>
      </CheckboxGroup>
    </div>
  );
}

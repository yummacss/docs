"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { Check, Minus } from "@gravity-ui/icons";
import { useId, useState } from "react";

export default function CheckboxNestedParent() {
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
        allValues={["read_messages", "send_messages"]}
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
              `d-f w-4 h-4 ai-c jc-c br-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
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
          General
        </label>

        <div className="d-f fd-c g-2 ml-6">
          <label className="d-f ai-c g-2 fs-sm fw-500">
            <Checkbox.Root
              value="read_messages"
              className={(state) =>
                `d-f w-4 h-4 ai-c jc-c br-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
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
            Read messages
          </label>

          <label className="d-f ai-c g-2 fs-sm fw-500">
            <Checkbox.Root
              value="send_messages"
              className={(state) =>
                `d-f w-4 h-4 ai-c jc-c br-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
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
            Send messages
          </label>
        </div>
      </CheckboxGroup>

      <CheckboxGroup
        aria-labelledby={moderationId}
        value={moderationValue}
        onValueChange={setModerationValue}
        allValues={["kick_members", "ban_members"]}
        className="d-f fd-c g-2"
      >
        <label className="d-f ai-c g-2 fs-sm fw-500" id={moderationId}>
          <Checkbox.Root
            name="moderation"
            parent
            className={(state) =>
              `d-f w-4 h-4 ai-c jc-c br-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
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
          Moderation
        </label>

        <div className="d-f fd-c g-2 ml-6">
          <label className="d-f ai-c g-2 fs-sm fw-500">
            <Checkbox.Root
              value="kick_members"
              className={(state) =>
                `d-f w-4 h-4 ai-c jc-c br-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
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
            Kick members
          </label>

          <label className="d-f ai-c g-2 fs-sm fw-500">
            <Checkbox.Root
              value="ban_members"
              className={(state) =>
                `d-f w-4 h-4 ai-c jc-c br-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
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
            Ban members
          </label>
        </div>
      </CheckboxGroup>
    </div>
  );
}

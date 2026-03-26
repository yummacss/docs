"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { Check, Minus } from "@gravity-ui/icons";
import { useId, useState } from "react";

const analytics = ["pageviews", "sessions"];
const marketing = ["campaigns", "newsletters"];

export default function ExampleCheckboxGroup() {
  const analyticsId = useId();
  const marketingId = useId();
  const [analyticsValue, setAnalyticsValue] = useState<string[]>([]);
  const [marketingValue, setMarketingValue] = useState<string[]>([]);

  return (
    <div className="d-f fd-c g-3 c-slate-10">
      <CheckboxGroup
        aria-labelledby={analyticsId}
        value={analyticsValue}
        onValueChange={setAnalyticsValue}
        allValues={analytics}
        className="d-f fd-c g-2"
      >
        <label
          className="d-f ai-c g-2 c-slate-10 fs-sm fw-600"
          id={analyticsId}
        >
          <Checkbox.Root
            name="analytics"
            parent
            className={(state) =>
              `d-f w-4 h-4 ai-c jc-c br-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                state.checked || state.indeterminate
                  ? "bg-indigo"
                  : "bw-1 bc-silver-3 bg-transparent"
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
          Analytics
        </label>

        <div className="d-f fd-c g-2 ml-6">
          <label className="d-f ai-c g-2 fs-sm fw-600">
            <Checkbox.Root
              value="pageviews"
              className={(state) =>
                `d-f w-4 h-4 ai-c jc-c br-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                  state.checked
                    ? "bg-indigo"
                    : "bw-1 bc-silver-3 bg-transparent"
                }`
              }
            >
              <Checkbox.Indicator className="d-f c-white">
                <Check className="w-3 h-3" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Page views
          </label>

          <label className="d-f ai-c g-2 fs-sm fw-600">
            <Checkbox.Root
              value="sessions"
              className={(state) =>
                `d-f w-4 h-4 ai-c jc-c br-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                  state.checked
                    ? "bg-indigo"
                    : "bw-1 bc-silver-3 bg-transparent"
                }`
              }
            >
              <Checkbox.Indicator className="d-f c-white">
                <Check className="w-3 h-3" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Sessions
          </label>
        </div>
      </CheckboxGroup>

      {/* Marketing Group */}
      <CheckboxGroup
        aria-labelledby={marketingId}
        value={marketingValue}
        onValueChange={setMarketingValue}
        allValues={marketing}
        className="d-f fd-c g-2"
      >
        {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI handles this */}
        <label className="d-f ai-c g-2 fs-sm fw-600" id={marketingId}>
          <Checkbox.Root
            name="marketing"
            parent
            className={(state) =>
              `d-f w-4 h-4 ai-c jc-c br-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                state.checked || state.indeterminate
                  ? "bg-indigo"
                  : "bw-1 bc-silver-3 bg-transparent"
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
          Marketing
        </label>

        <div className="d-f fd-c g-2 ml-6">
          <label className="d-f ai-c g-2 fs-sm fw-600">
            <Checkbox.Root
              value="campaigns"
              className={(state) =>
                `d-f w-4 h-4 ai-c jc-c br-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                  state.checked
                    ? "bg-indigo"
                    : "bw-1 bc-silver-3 bg-transparent"
                }`
              }
            >
              <Checkbox.Indicator className="d-f c-white">
                <Check className="w-3 h-3" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Campaigns
          </label>

          <label className="d-f ai-c g-2 fs-sm fw-600">
            <Checkbox.Root
              value="newsletters"
              className={(state) =>
                `d-f w-4 h-4 ai-c jc-c br-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                  state.checked
                    ? "bg-indigo"
                    : "bw-1 bc-silver-3 bg-transparent"
                }`
              }
            >
              <Checkbox.Indicator className="d-f c-white">
                <Check className="w-3 h-3" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Newsletters
          </label>
        </div>
      </CheckboxGroup>
    </div>
  );
}

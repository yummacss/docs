"use client";

import { useState } from "react";
import SwitchBase from "@/registry/ui/switch";

/** Rail switch design candidates — square sm, white thumb unless noted. */
const MOCKUPS = [
  {
    id: "1-accent-fill",
    name: "1 · Accent fill (current)",
    note: "bg-border off, bg-accent on — docs tokens",
    trackClass: {
      off: "bc-border bg-border bw-1",
      on: "bc-accent bg-accent bw-1",
      thumbOff: "bg-white",
      thumbOn: "bg-page",
    },
  },
  {
    id: "2-registry",
    name: "2 · Registry default",
    note: "bg-silver-1 / bg-indigo — preview stage colors",
    trackClass: undefined,
  },
  {
    id: "3-segment",
    name: "3 · Segment tint",
    note: "Transparent off, accent-dim tint on",
    trackClass: {
      off: "bc-border bg-transparent bw-1",
      on: "bc-accent-dim bg-accent-dim/15 bw-1",
    },
  },
  {
    id: "4-navbar-chrome",
    name: "4 · Navbar chrome",
    note: "bg-surface / bg-surface-7 — blends with page",
    trackClass: {
      off: "bc-border bg-surface bw-1 bf-b-sm",
      on: "bc-border bg-surface-7 bw-1 bf-b-sm",
    },
  },
  {
    id: "5-accent-dim",
    name: "5 · Accent dim fill",
    note: "border track off, accent-dim on",
    trackClass: {
      off: "bc-border bg-border bw-1",
      on: "bg-accent-dim bw-1 bc-accent-dim",
    },
  },
  {
    id: "6-page-inset",
    name: "6 · Page inset",
    note: "Page fill off, accent-dim ring on",
    trackClass: {
      off: "bc-border bg-page bw-1",
      on: "bc-accent-dim bg-accent-dim/20 bw-1",
    },
  },
  {
    id: "7-border-bold",
    name: "7 · Bold border",
    note: "Thicker border, transparent off",
    trackClass: {
      off: "bc-border bg-transparent bw-2",
      on: "bc-accent-dim bg-accent-dim/25 bw-2",
    },
  },
  {
    id: "8-silver-indigo",
    name: "8 · Silver → indigo",
    note: "Built-in scale, high contrast",
    trackClass: {
      off: "bg-silver-3 bw-1 bc-silver-4",
      on: "bg-indigo bw-1 bc-indigo-4",
    },
  },
  {
    id: "9-white-edge",
    name: "9 · White edge",
    note: "Light border halo on dark track",
    trackClass: {
      off: "bc-white/25 bg-surface bw-1",
      on: "bc-accent bg-accent-dim/30 bw-1",
    },
  },
  {
    id: "10-code-tint",
    name: "10 · Code tint",
    note: "Surface off, code-tinted on",
    trackClass: {
      off: "bc-border bg-surface bw-1",
      on: "bc-code bg-code/20 bw-1",
    },
  },
] as const;

/** Interactive grid of rail switch mockups on docs-dark chrome. */
export default function SwitchMockups() {
  const [states, setStates] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(MOCKUPS.map((m) => [m.id, false])),
  );

  return (
    <div className="my-8 bc-border bw-1">
      <div className="p-4 bc-border bbw-1 bg-surface">
        <h2 className="mb-1 c-white fs-xl fw-400">Component API switch mockups</h2>
        <p className="c-white/70 fs-sm lh-4">
          Square sm switches on dark docs chrome. Toggle each row; compare off/on
          contrast against the page background (#151724).
        </p>
      </div>

      <div className="d-g gtc-1 @md:gtc-2">
        {MOCKUPS.map((mockup) => (
          <div
            key={mockup.id}
            className="p-4 bc-border bbw-1 @md:brw-1 bg-page"
          >
            <div className="d-f ai-c jc-sb g-3 mb-2">
              <div>
                <h3 className="c-white fs-sm fw-600">{mockup.name}</h3>
                <p className="c-white/60 fs-xs">{mockup.note}</p>
              </div>
              <SwitchBase
                checked={states[mockup.id]}
                onCheckedChange={(next) =>
                  setStates((current) => ({ ...current, [mockup.id]: next }))
                }
                ariaLabel={mockup.name}
                shape="square"
                size="sm"
                trackClass={mockup.trackClass}
              />
            </div>
            <code className="d-b c-white/40 fs-xs ff-m ws-pw">
              {mockup.trackClass
                ? `off: ${mockup.trackClass.off}\non: ${mockup.trackClass.on}`
                : "off: bg-silver-1 · on: bg-indigo (registry default)"}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

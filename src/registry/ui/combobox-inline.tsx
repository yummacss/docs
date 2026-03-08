"use client";

import { Combobox } from "@base-ui/react/combobox";
import { CircleIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";

const frameworks = [
  "Next.js",
  "Remix",
  "Astro",
  "Nuxt",
  "SvelteKit",
  "SolidStart",
  "Analog",
  "Gatsby",
];

function ItemIcon({ selected }: { selected: boolean }) {
  return selected ? (
    <CircleIcon size={14} weight="fill" className="c-indigo-6 fs-0" />
  ) : (
    <CircleIcon size={14} className="c-slate-3 fs-0" />
  );
}

export default function ExampleCombobox() {
  return (
    <div className="d-f fd-c g-0 w-64 bg-white bc-silver-3 bw-1 br-2 o-h">
      <Combobox.Root inline items={frameworks}>
        <div className="d-f ai-c g-2 px-3 bbw-1 bc-silver-3">
          <MagnifyingGlassIcon size={14} className="c-slate-4 fs-0" />
          <Combobox.Input
            placeholder="Search frameworks…"
            className="f-1 h-10 bg-transparent b-0 fs-sm c-slate-10"
          />
        </div>
        <Combobox.List className="o-y-auto py-1" style={{ maxHeight: "13rem" }}>
          {(framework: string) => (
            <Combobox.Item
              key={framework}
              value={framework}
              render={(props, state) => (
                <div
                  {...props}
                  className={`d-f ai-c g-2 py-2 px-3 fs-sm c-slate-8 us-none c-d c-p br-1 mx-1 ${
                    state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                  }`}
                >
                  <ItemIcon selected={state.selected} />
                  <span className="fg-1">{framework}</span>
                </div>
              )}
            />
          )}
        </Combobox.List>
      </Combobox.Root>
    </div>
  );
}

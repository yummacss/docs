"use client";

import { Combobox } from "@base-ui/react/combobox";
import { Check, Magnifier } from "@gravity-ui/icons";

function ItemIcon({ selected }: { selected: boolean }) {
  return selected ? (
    <Check className="fs-0 w-4 h-4 c-indigo-6" />
  ) : (
    <Check className="fs-0 w-4 h-4 c-transparent" />
  );
}

export default function ComboboxInline() {
  return (
    <div className="d-f o-h fd-c g-0 w-64 bg-white bc-silver-3 bw-1 br-xl">
      <Combobox.Root inline items={users}>
        <div className="d-f ai-c g-2 px-3 bc-silver-3 bbw-1">
          <Magnifier className="fs-0 w-4 h-4 c-slate-4" />
          <Combobox.Input
            placeholder="Mention user..."
            className="f-1 h-10 bg-transparent c-slate-10 fs-md"
          />
        </div>
        <Combobox.List className="oy-auto py-1 max-h-52">
          {(user: string) => (
            <Combobox.Item
              key={user}
              value={user}
              render={(props, state) => (
                <div
                  {...props}
                  className={`d-f ai-c g-2 py-2 px-3 fs-sm fw-600 c-slate-8 us-none c-d c-p br-lg mx-1 ${
                    state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                  }`}
                >
                  <ItemIcon selected={state.selected} />
                  <span className="fg-1">@{user}</span>
                </div>
              )}
            />
          )}
        </Combobox.List>
      </Combobox.Root>
    </div>
  );
}

const users = [
  "sarahc",
  "averyg",
  "judem",
  "leok",
  "rileyb",
  "adrianm",
  "jessicam",
  "aidenw",
  "liamj",
  "mariav",
];

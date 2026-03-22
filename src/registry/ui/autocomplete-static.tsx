"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

const FRUITS = [
  "Apple",
  "Banana",
  "Blueberry",
  "Cherry",
  "Grape",
  "Lemon",
  "Mango",
  "Orange",
  "Peach",
  "Pear",
  "Strawberry",
  "Watermelon",
];

export default function ExampleAutocomplete() {
  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete.Root items={FRUITS} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="static-input" className="c-slate-10 fs-sm fw-600">
          Fruit
        </label>
        <Autocomplete.Input
          id="static-input"
          placeholder="Search a fruit..."
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-12 bw-1 br-md fs-sm fv:os-s fv:ow-2 fv:oo--1 fv:oc-indigo-6"
        />
      </div>

      <Autocomplete.Portal keepMounted>
        <Autocomplete.Positioner className="ow-0" sideOffset={4}>
          <Autocomplete.Popup className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-lg">
            <Autocomplete.List className="o-y-auto max-h-72 py-1 ow-0">
              {(item: string) => (
                <Autocomplete.Item
                  key={item}
                  value={item}
                  render={(props, state) => (
                    <div
                      {...props}
                      className={`py-2 px-3 fs-sm us-none c-d c-p br-sm mx-1 c-slate-10 ${
                        state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                      }`}
                    >
                      {item}
                    </div>
                  )}
                />
              )}
            </Autocomplete.List>
            <Autocomplete.Empty className="c-slate-6 fs-sm">
              <div className="py-4 px-4">No results found.</div>
            </Autocomplete.Empty>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}

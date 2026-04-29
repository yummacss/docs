"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Separator } from "@base-ui/react/separator";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function AutocompleteGrouped() {
  const [open, setOpen] = useState(false);

  return (
    <Autocomplete.Root
      items={productGroups}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="d-f fd-c g-2">
        <label htmlFor="grouped-input" className="c-slate-10 fs-sm fw-500">
          Search products
        </label>
        <Autocomplete.Input
          id="grouped-input"
          placeholder="iPhone, Macbook, & more"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:ow-2 fv:oo--1 fv:oc-indigo-6"
        />
      </div>

      <AnimatePresence>
        {open && (
          <Autocomplete.Portal keepMounted>
            <Autocomplete.Positioner className="ow-0" sideOffset={4}>
              <Autocomplete.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                }
                className="o-h w-72 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg"
              >
                <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
                  {(group: ProductGroup, groupIndex) => (
                    <Autocomplete.Group key={group.value}>
                      <div className="px-3 py-1 fs-xs fw-500 c-slate-6 tt-u ls-3">
                        {group.value}
                      </div>
                      {group.items.map((item) => (
                        <Autocomplete.Item
                          key={item.name}
                          value={item.name}
                          render={(props, state) => (
                            <div
                              {...props}
                              className={`d-f ai-c g-3 py-2 px-3 fs-sm us-none c-p br-lg mx-1 c-slate-10 ${
                                state.highlighted
                                  ? "bg-silver-1/50"
                                  : "bg-transparent"
                              }`}
                            >
                              <div className="w-8 h-8 bg-silver-2 br-md" />
                              <div className="d-f fd-c">
                                <span className="fw-500">{item.name}</span>
                                <span className="fs-xs c-slate-6">
                                  {item.category}
                                </span>
                              </div>
                            </div>
                          )}
                        />
                      ))}
                      {groupIndex < productGroups.length - 1 && (
                        <Separator className="my-2 w-full h-px bg-silver-2" />
                      )}
                    </Autocomplete.Group>
                  )}
                </Autocomplete.List>
                <Autocomplete.Empty className="c-slate-6 fs-sm">
                  <div className="pt-2 pb-3 px-4 us-none">
                    No products found.
                  </div>
                </Autocomplete.Empty>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}

interface Product {
  name: string;
  category: string;
}

interface ProductGroup {
  value: string;
  items: Product[];
}

const productGroups: ProductGroup[] = [
  {
    value: "MacBook",
    items: [
      { name: 'MacBook Pro 14"', category: "Space Black" },
      { name: 'MacBook Pro 16"', category: "Space Black" },
      { name: 'MacBook Air 13"', category: "Starlight" },
    ],
  },
  {
    value: "iPhone",
    items: [
      { name: "iPhone 15 Pro Max", category: "Natural Titanium" },
      { name: "iPhone 15 Pro", category: "Blue Titanium" },
      { name: "iPhone 15", category: "Pink" },
    ],
  },
  {
    value: "iPad",
    items: [
      { name: 'iPad Pro 12.9"', category: "Space Gray" },
      { name: 'iPad Air 11"', category: "Blue" },
      { name: "iPad mini", category: "Purple" },
    ],
  },
];

"use client";

import { Button, Input } from "@base-ui/react";
import { Accordion } from "@base-ui/react/accordion";
import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { type Category, categoryGetters } from "../utils/yummacss";

interface Props {
  category: Category;
  name: string;
}

const DEFAULT_ACCORDION_VALUE = ["reference-item"];

export default function Reference({ category, name }: Props) {
  const [search, setSearch] = useState("");

  let basePrefix = name;
  const variants: Array<{
    prefix: string;
    properties: readonly string[];
    value: string;
  }> = [];

  try {
    if (!category || !name) {
      throw new Error("Missing props: category and name are required");
    }

    const getter = categoryGetters[category];
    if (!getter) {
      throw new Error(`Unknown category: ${category}`);
    }

    const utils = getter();
    const util = utils[name];

    if (util) {
      basePrefix = util.prefix;
      Object.entries(util.values).forEach(([suffix, value]) => {
        const prefix = suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
        const properties = util.properties;

        variants.push({
          prefix,
          properties,
          value,
        });
      });
    }
  } catch (err) {
    console.error("Failed to get utility:", err);
  }

  if (variants.length === 0) {
    return (
      <div className="p-4 mb-6 bg-surface c-white/60 ta-c">
        Something went wrong while fetching the data.
      </div>
    );
  }

  const filtered = search
    ? variants.filter(
        (v) =>
          v.prefix.toLowerCase().includes(search.toLowerCase()) ||
          v.value.toLowerCase().includes(search.toLowerCase()) ||
          v.properties.some((p) =>
            p.toLowerCase().includes(search.toLowerCase()),
          ),
      )
    : variants;

  const utilityPrefix = basePrefix;

  return (
    <div className="o-h mb-6 bc-border bg-surface bw-1">
      <Accordion.Root
        defaultValue={DEFAULT_ACCORDION_VALUE}
        className="d-f fd-c w-100%"
      >
        <Accordion.Item value="reference-item" className="bw-0">
          <Accordion.Header className="m-0">
            <Accordion.Trigger
              render={(triggerProps, { open }) => (
                <Button
                  {...triggerProps}
                  className="d-f ai-c jc-sb g-4 w-100% py-3 px-4 m-0 bg-transparent c-white bw-0 ta-l fw-600 fs-sm c-p us-none"
                >
                  <span className="d-f ai-c g-2">
                    <code className="c-code ff-m">
                      {utilityPrefix}-(value)
                    </code>
                    <span
                      className="px-2 py-1 bg-border fs-xs fw-600"
                      style={{ color: "#8892c2" }}
                    >
                      {variants.length} utilities
                    </span>
                  </span>
                  <PlusIcon
                    className={`w-4 h-4 fs-0 tp-t tp-c tdu-200 ttf-io ${open ? "ro-45 c-white" : "ro-0 c-white/60"}`}
                  />
                </Button>
              )}
            />
          </Accordion.Header>
          <Accordion.Panel className="o-h c-white/70 fs-sm lh-4">
            <div className="px-4 pb-4">
              <div className="oy-auto max-h-52">
                <div className="d-f ai-c g-2 mb-2 pb-2 bc-border bbw-1">
                  <MagnifyingGlassIcon className="fs-0 w-4 h-4 c-white/30" />
                  <Input
                    type="text"
                    placeholder="Filter..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-100% bg-transparent c-white/70 bw-0 fs-md"
                  />
                  {search && (
                    <span className="fs-0 c-white/30 fs-xs ws-nw">
                      {filtered.length}/{variants.length}
                    </span>
                  )}
                </div>

                <div className="d-f fd-c g-1">
                  {filtered.length > 0 ? (
                    filtered.map((variant, index) => (
                      <div
                        key={variant.prefix}
                        className={`d-f ai-c jc-sb py-2 px-0 ${
                          index < filtered.length - 1 ? "bbw-1 bc-border" : ""
                        }`}
                      >
                        <code className="c-code fs-sm">{variant.prefix}</code>
                        <div className="d-f fd-c ai-fe">
                          {variant.properties.map((prop) => (
                            <code
                              key={prop}
                              className="fs-xs"
                              style={{ color: "#b9bed5" }}
                            >
                              {prop}: {variant.value}
                              {`;`}
                            </code>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-2 c-white/40 fs-xs ta-c">
                      No utilities match "{search}"
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}

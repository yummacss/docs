"use client";

import { Input } from "@base-ui/react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import * as core from "@yummacss/core";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "./accordion";

const categoryGetters = {
  background: core.backgroundUtils,
  border: core.borderUtils,
  boxModel: core.boxModelUtils,
  color: core.colorUtils,
  effect: core.effectUtils,
  flexbox: core.flexboxUtils,
  font: core.fontUtils,
  grid: core.gridUtils,
  interactivity: core.interactivityUtils,
  outline: core.outlineUtils,
  positioning: core.positioningUtils,
  svg: core.svgUtils,
  table: core.tableUtils,
  text: core.textUtils,
  transform: core.transformUtils,
  transition: core.transitionUtils,
} as const;

type Category = keyof typeof categoryGetters;

interface Props {
  category: Category;
  name: string;
}

export default function Reference({ category, name }: Props) {
  const [search, setSearch] = useState("");

  let basePrefix = name;
  const variants: Array<{ prefix: string; property: string; value: string }> =
    [];

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
        const property = util.properties[0];

        variants.push({
          prefix,
          property,
          value,
        });
      });
    }
  } catch (err) {
    console.error("Failed to get utility:", err);
  }

  if (variants.length === 0) {
    return (
      <div
        className="p-4 mb-6 br-1 c-white/60 ta-c"
        style={{ backgroundColor: "#1a1d2e", border: "1px solid #232741" }}
      >
        Something went wrong while fetching the data.
      </div>
    );
  }

  const filtered = search
    ? variants.filter(
        (v) =>
          v.prefix.toLowerCase().includes(search.toLowerCase()) ||
          v.value.toLowerCase().includes(search.toLowerCase()),
      )
    : variants;

  const utilityPrefix = basePrefix;

  return (
    <div
      className="mb-6 o-h"
      style={{ backgroundColor: "#1a1d2e", border: "1px solid #232741" }}
    >
      <Accordion>
        <AccordionItem className="bw-0">
          <AccordionTrigger className="bg-transparent">
            <span className="d-f ai-c g-2">
              <code style={{ color: "#dda2f6" }}>{utilityPrefix}-[value]</code>
              <span
                className="fs-xs px-2 py-1 br-1"
                style={{ backgroundColor: "#232741", color: "#8892c2" }}
              >
                {variants.length} utilities
              </span>
            </span>
          </AccordionTrigger>
          <AccordionPanel>
            {/* Utilities list */}
            <div className="max-h-52 o-y-auto">
              {/* Subtle search input */}
              <div
                className="d-f ai-c g-2 mb-2 pb-2"
                style={{ borderBottom: "1px solid #232741" }}
              >
                <MagnifyingGlassIcon size={12} className="c-white/30 fs-0" />
                <Input
                  type="text"
                  placeholder="Filter..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bw-0 bg-transparent c-white/70 fs-xs w-full"
                  style={{ outline: "none" }}
                />
                {search && (
                  <span className="fs-xs c-white/30 fs-0 ws-nw">
                    {filtered.length}/{variants.length}
                  </span>
                )}
              </div>

              <div className="d-f fd-c g-1">
                {filtered.length > 0 ? (
                  filtered.map((variant, index) => (
                    <div
                      key={`${variant.prefix}-${index}`}
                      className="d-f ai-c jc-sb py-2 px-0"
                      style={{
                        borderBottom:
                          index < filtered.length - 1
                            ? "1px solid #232741"
                            : "none",
                      }}
                    >
                      <code className="fs-sm" style={{ color: "#dda2f6" }}>
                        {variant.prefix}
                      </code>
                      <code className="fs-xs" style={{ color: "#b9bed5" }}>
                        {variant.property}: {variant.value};
                      </code>
                    </div>
                  ))
                ) : (
                  <div className="c-white/40 fs-xs py-2 ta-c">
                    No utilities match "{search}"
                  </div>
                )}
              </div>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

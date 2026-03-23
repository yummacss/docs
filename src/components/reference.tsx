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
  layout: core.layoutUtils,
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
      <div className="c-white/60 p-4 mb-6 bg-midnight br-sm ta-c">
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
    <div className="o-h mb-6 bc-clay bg-midnight bw-1 br-sm">
      <Accordion defaultValue={DEFAULT_ACCORDION_VALUE}>
        <AccordionItem className="bw-0" value="reference-item">
          <AccordionTrigger className="bg-transparent">
            <span className="d-f ai-c g-2">
              <code className="c-mauve">{utilityPrefix}-*</code>
              <span
                className="px-2 py-1 bg-clay br-sm fs-xs"
                style={{ color: "#8892c2" }}
              >
                {variants.length} utilities
              </span>
            </span>
          </AccordionTrigger>
          <AccordionPanel>
            {/* Utilities list */}
            <div className="o-y-auto max-h-52">
              {/* Subtle search input */}
              <div className="d-f ai-c g-2 mb-2 pb-2 bc-clay bbw-1">
                <MagnifyingGlassIcon size={18} className="c-white/30 fs-0" />
                <Input
                  type="text"
                  placeholder="Filter..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="c-white/70 w-full bg-transparent bw-0 fs-md"
                  style={{ outline: "none" }}
                />
                {search && (
                  <span className="c-white/30 fs-0 fs-xs ws-nw">
                    {filtered.length}/{variants.length}
                  </span>
                )}
              </div>

              <div className="d-f fd-c g-1">
                {filtered.length > 0 ? (
                  filtered.map((variant, index) => (
                    <div
                      key={variant.prefix}
                      className="d-f ai-c jc-sb py-2 px-0"
                      style={{
                        borderBottom:
                          index < filtered.length - 1
                            ? "1px solid #232741"
                            : "none",
                      }}
                    >
                      <code className="c-mauve fs-sm">{variant.prefix}</code>
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
                  <div className="c-white/40 py-2 fs-xs ta-c">
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

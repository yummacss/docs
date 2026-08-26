"use client";

import { Button, Input } from "@base-ui/react";
import { Accordion } from "@base-ui/react/accordion";
import { Plus, Search } from "iconoir-react";
import { useMemo, useState } from "react";
import {
  type Category,
  getReferenceData,
  type ReferenceVariant,
} from "../utils/yummacss";

interface Props {
  category: Category;
  name: string;
  /** Reference row set; omitted lists the utility's own classes. */
  variant?: ReferenceVariant;
}

/** Utility classes open by default; variant tables start collapsed. */
const OPEN = ["reference-item"];
const CLOSED: string[] = [];

export default function Reference({ category, name, variant }: Props) {
  const [search, setSearch] = useState("");

  const data = useMemo(
    () => getReferenceData(category, name, variant),
    [category, name, variant],
  );

  if (!data) {
    return (
      <div className="p-4 mb-6 bg-surface c-foreground/60 ta-c">
        Something went wrong while fetching the data.
      </div>
    );
  }

  const query = search.trim().toLowerCase();
  const filtered = query
    ? data.rows.filter(
        (row) =>
          row.className.toLowerCase().includes(query) ||
          row.details.some((d) => d.toLowerCase().includes(query)),
      )
    : data.rows;

  return (
    <div className="o-h mb-6 bc-border bg-surface bw-1">
      <Accordion.Root
        defaultValue={variant ? CLOSED : OPEN}
        className="d-f fd-c w-100%"
      >
        <Accordion.Item value="reference-item" className="bw-0">
          <Accordion.Header className="m-0">
            <Accordion.Trigger
              render={(triggerProps, { open }) => (
                <Button
                  {...triggerProps}
                  className="d-f ai-c jc-sb g-4 w-100% py-3 px-4 m-0 bg-transparent c-foreground bw-0 ta-l fw-600 fs-sm c-p us-none"
                >
                  <span className="d-f ai-c g-2 fw-w">
                    {/* Summary shows scale spans, not a misleading sample. */}
                    <code className="c-code ff-m">
                      {data.summary.map((token) => (
                        <span
                          key={token.id}
                          className={token.punctuation ? "c-foreground/40" : ""}
                        >
                          {token.text}
                        </span>
                      ))}
                    </code>
                    <span
                      className="px-2 py-1 bg-border fs-xs fw-600"
                      style={{ color: "#8892c2" }}
                    >
                      {data.rows.length} {data.noun}
                    </span>
                  </span>
                  <Plus
                    className={`fs-0 w-4 h-4 tp-c tdu-200 ttf-io ${open ? "ro-9 c-foreground" : "ro-0 c-foreground/60"}`}
                  />
                </Button>
              )}
            />
          </Accordion.Header>
          <Accordion.Panel className="o-h c-foreground/70 fs-sm lh-4">
            <div className="px-4 pb-4">
              <div className="oy-auto max-h-52">
                {/* Sticky filter while scrolling long utility lists. */}
                <div className="d-f p-st t-0 zi-10 ai-c g-2 mb-2 pt-1 pb-2 bc-border bbw-1 bg-surface">
                  <Search className="fs-0 w-4 h-4 c-foreground/30" />
                  <Input
                    type="text"
                    placeholder="Filter..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-100% bg-transparent c-foreground/70 bw-0 fs-md"
                  />
                  {search && (
                    <span className="fs-0 c-foreground/30 fs-xs ws-nw">
                      {filtered.length}/{data.rows.length}
                    </span>
                  )}
                </div>

                <div className="d-f fd-c g-1">
                  {filtered.length > 0 ? (
                    filtered.map((row, index) => (
                      <div
                        key={row.className}
                        className={`d-f ai-c jc-sb g-4 py-2 px-0 ${
                          index < filtered.length - 1 ? "bbw-1 bc-border" : ""
                        }`}
                      >
                        <code className="c-code fs-sm ws-nw">
                          {row.className}
                        </code>
                        <div className="d-f fd-c ai-fe">
                          {row.details.map((detail) => (
                            <code
                              key={detail}
                              className="fs-xs ta-r"
                              style={{ color: "#b9bed5" }}
                            >
                              {detail}
                            </code>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-2 c-foreground/40 fs-xs ta-c">
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

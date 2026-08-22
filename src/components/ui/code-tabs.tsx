"use client";

import { Button } from "@base-ui/react";

/**
 * The tab strip above a code block.
 *
 * Extracted so `CodeGroup` (authored fences in MDX) and the install command
 * under every component preview are the same strip rather than two that look
 * alike. The trailing filler div is what carries the bottom border across the
 * rest of the row, and it is load-bearing: without it the underline stops at
 * the last tab.
 */
export default function CodeTabs<T extends string>({
  tabs,
  active,
  onSelect,
  idPrefix,
}: {
  tabs: { id: T; label: string }[];
  active: T;
  onSelect: (id: T) => void;
  idPrefix: string;
}) {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="d-f bc-border bg-page ox-auto"
    >
      {tabs.map((tab, index) => {
        const selected = tab.id === active;
        return (
          <Button
            key={tab.id}
            role="tab"
            id={`${idPrefix}-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(tab.id)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                onSelect(tabs[(index + 1) % tabs.length].id);
              } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                onSelect(tabs[(index - 1 + tabs.length) % tabs.length].id);
              }
            }}
            className={`d-f ai-c px-6 py-2 brw-1 bc-border fs-sm ff-m ws-nw c-p a-none ${
              selected
                ? "c-accent bg-surface"
                : "c-accent-dim bg-transparent bbw-1"
            }`}
          >
            {tab.label}
          </Button>
        );
      })}
      <div className="f-1 bbw-1 bc-border" />
    </div>
  );
}

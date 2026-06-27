"use client";

import { Button } from "@base-ui/react/button";
import { useState } from "react";

const initialFilters = [
  "Status: In Progress",
  "Priority: High",
  "Assignee: You",
];

export default function EmptyStateFiltered() {
  const [filters, setFilters] = useState(initialFilters);

  const clearFilters = () => setFilters([]);

  if (filters.length === 0) {
    return (
      <div className="d-f fd-c ai-c jc-c g-4 p-8">
        <div className="d-f fd-c ai-c g-1 ta-c">
          <span className="c-slate-10 fs-md fw-500">All filters cleared</span>
          <span className="c-slate-6 fs-sm">Showing all available items.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-f fd-c ai-c jc-c g-4 p-8">
      <div className="d-f fd-c ai-c g-2 ta-c">
        <span className="c-slate-10 fs-md fw-500">No matching items</span>
        <span className="c-slate-6 fs-sm">
          No items match your current filter selection.
        </span>
        <div className="d-f fw-w jc-c g-2">
          {filters.map((filter) => (
            <span
              key={filter}
              className="d-if ai-c g-1 px-2 py-1 bg-silver-1 c-slate-8 br-lg fs-xs fw-500"
            >
              {filter}
            </span>
          ))}
        </div>
      </div>
      <Button
        onClick={clearFilters}
        className="d-if ai-c px-3 py-2 bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5"
      >
        Clear filters
      </Button>
    </div>
  );
}

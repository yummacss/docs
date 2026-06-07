"use client";

import { Button } from "@base-ui/react/button";
import { Search } from "iconoir-react";
import { useState } from "react";

export default function EmptyStateSearch() {
  const [query, setQuery] = useState("dashboard");

  const clearSearch = () => setQuery("");

  if (!query) {
    return (
      <div className="d-f fd-c ai-c jc-c g-4 p-8">
        <div className="d-f fd-c ai-c g-1 ta-c">
          <span className="c-slate-10 fs-md fw-500">Search your projects</span>
          <span className="c-slate-6 fs-sm">
            Type in the search bar to find projects and tasks.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-f fd-c ai-c jc-c g-4 p-8">
      <div className="d-f ai-c jc-c w-10 h-10 bc-silver-3 c-slate-5 br-md bw-1 bs-o-xs">
        <Search className="w-5 h-5" />
      </div>
      <div className="d-f fd-c ai-c g-1 ta-c">
        <span className="c-slate-10 fs-md fw-500">
          No results for {"\u201C"}
          {query}
          {"\u201D"}
        </span>
        <span className="c-slate-6 fs-sm">
          Try different keywords or check your spelling.
        </span>
      </div>
      <Button
        onClick={clearSearch}
        className="d-if ai-c px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5"
      >
        Clear search
      </Button>
    </div>
  );
}

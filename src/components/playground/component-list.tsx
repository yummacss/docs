"use client";

import { PLAYGROUND_GROUPS } from "@/config/playground";
import { titleCase } from "@/utils/title-case";

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ComponentList({ selectedId, onSelect }: Props) {
  return (
    <nav
      aria-label="Playground components"
      className="w-60 oy-auto ob-c bg-page brw-1 bc-border"
    >
      <div className="d-f fd-c g-6 py-6">
        {PLAYGROUND_GROUPS.map((group) => (
          <div key={group.title} className="d-f fd-c g-1">
            <h3 className="px-4 c-silver-8 fs-xs ls-2 tt-u">{group.title}</h3>
            <ul className="d-f fd-c">
              {group.ids.map((id) => {
                const isActive = id === selectedId;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => onSelect(id)}
                      aria-current={isActive || undefined}
                      className={`d-b w-100% pl-4 pr-4 py-2 blw-2 ta-l fs-sm us-none c-p fv:oc-white fv:ow-2 ${
                        isActive
                          ? "c-accent bg-accent/8 blc-accent"
                          : "c-white/65 h:c-white h:bg-white/3 blc-transparent"
                      }`}
                    >
                      {titleCase(id)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

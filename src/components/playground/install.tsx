"use client";

import { Menu } from "@base-ui/react/menu";
import { Check, NavArrowDown } from "iconoir-react";
import { useState } from "react";
import { NPM, Pnpm } from "@/components/icons/icons";

const MANAGERS = {
  pnpm: { command: (id: string) => `pnpm dlx yummaui add ${id}`, Mark: Pnpm },
  npm: { command: (id: string) => `npx yummaui add ${id}`, Mark: NPM },
} as const;

type Manager = keyof typeof MANAGERS;

/** Copies a `yummaui add` command; menu picks the package manager. */
export default function Install({
  id,
  prominent = false,
}: {
  id: string;
  /** Framed like a page control, for the header beside the pagination arrows. */
  prominent?: boolean;
}) {
  const [copied, setCopied] = useState<Manager | null>(null);

  const copy = async (manager: Manager) => {
    try {
      await navigator.clipboard.writeText(MANAGERS[manager].command(id));
    } catch {
      return;
    }
    setCopied(manager);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Menu.Root>
      <Menu.Trigger
        className={
          prominent
            ? "d-f ai-c g-2 pl-3 pr-2 h-8 bc-border bg-surface a:bg-surface-7 c-accent bw-1 fs-sm c-p us-none fv:oc-white fv:oo-2"
            : "d-f ai-c g-1 px-2 py-1 bg-transparent bw-0 c-accent fs-xs c-p h:c-accent-4 fv:oc-accent fv:ow-2"
        }
        aria-label="Install command"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" aria-hidden />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <span>Install</span>
            <NavArrowDown className="w-3 h-3" aria-hidden />
          </>
        )}
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={4} className="zi-50">
          <Menu.Popup className="p-1 min-w-28 bc-border bg-surface bw-1">
            {(Object.keys(MANAGERS) as Manager[]).map((manager) => (
              <Menu.Item
                key={manager}
                onClick={() => copy(manager)}
                className={(state) =>
                  `d-f ai-c g-2 px-2 py-1 ff-m fs-xs c-p us-none ${
                    state.highlighted ? "bg-border c-accent" : "c-accent-dim"
                  }`
                }
              >
                {(() => {
                  const { Mark } = MANAGERS[manager];
                  return <Mark className="fs-0 w-4 h-4" />;
                })()}
                {manager}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

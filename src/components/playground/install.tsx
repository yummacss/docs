"use client";

import { Menu } from "@base-ui/react/menu";
import { Check, NavArrowDown } from "iconoir-react";
import { useState } from "react";

const MANAGERS = {
  pnpm: (id: string) => `pnpm dlx yummaui add ${id}`,
  npm: (id: string) => `npx yummaui add ${id}`,
} as const;

type Manager = keyof typeof MANAGERS;

/** Copies a `yummaui add` command; menu picks the package manager. */
export default function Install({ id }: { id: string }) {
  const [copied, setCopied] = useState<Manager | null>(null);

  const copy = async (manager: Manager) => {
    try {
      await navigator.clipboard.writeText(MANAGERS[manager](id));
    } catch {
      return;
    }
    setCopied(manager);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Menu.Root>
      <Menu.Trigger
        className="d-f ai-c g-1 px-2 py-1 bg-transparent bw-0 c-accent fs-xs c-p h:c-accent-4 fv:oc-accent fv:ow-2"
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
          <Menu.Popup className="cs-d p-1 min-w-28 bc-border bg-surface bw-1">
            {(Object.keys(MANAGERS) as Manager[]).map((manager) => (
              <Menu.Item
                key={manager}
                onClick={() => copy(manager)}
                className={(state) =>
                  `d-b px-2 py-1 ff-m fs-xs c-p us-none ${
                    state.highlighted ? "bg-border c-accent" : "c-accent-dim"
                  }`
                }
              >
                {manager}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

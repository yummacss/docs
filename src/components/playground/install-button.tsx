"use client";

import { Menu } from "@base-ui/react/menu";
import { Check, Download } from "iconoir-react";
import { useState } from "react";

/**
 * The install command, next to the pagination arrows.
 *
 * Installing is the one thing a reader does on a component page that is not
 * looking, and the CLI is what does it: the snippet below the preview is what
 * the component looks like afterwards, not a thing to paste first. So this is
 * the page's only copy button, and it sits with the other page-level controls
 * rather than taking a block of the rail.
 */
const MANAGERS = {
  pnpm: (id: string) => `pnpm dlx yummaui add ${id}`,
  npm: (id: string) => `npx yummaui add ${id}`,
};

type Manager = keyof typeof MANAGERS;

export default function InstallButton({ id }: { id: string }) {
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
      <Menu.Trigger className="d-f ai-c g-2 px-3 h-8 bc-border bg-surface a:bg-surface-7 c-accent bw-1 fs-sm c-p us-none fv:oc-white fv:oo-2">
        {copied ? (
          <Check className="fs-0 w-4 h-4" aria-hidden />
        ) : (
          <Download className="fs-0 w-4 h-4" aria-hidden />
        )}
        {copied ? "Copied" : "Install"}
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={6} align="end" className="zi-50">
          <Menu.Popup className="p-1 bc-border bg-surface bw-1">
            {(Object.keys(MANAGERS) as Manager[]).map((manager) => (
              <Menu.Item
                key={manager}
                onClick={() => copy(manager)}
                className={(state) =>
                  `d-b px-3 py-2 ff-m fs-xs c-p us-none ws-nw ${
                    state.highlighted ? "bg-border c-white" : "c-white/70"
                  }`
                }
              >
                {MANAGERS[manager](id)}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

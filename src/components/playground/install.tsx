"use client";

import { Menu } from "@base-ui/react/menu";
import { useState } from "react";
import { Bun, NPM, Pnpm, Yarn } from "@/components/icons/icons";
import { usePlayground } from "@/components/playground/context";
import HintTooltip from "@/components/ui/hint-tooltip";
import { Check, Copy } from "@/icons";
import { addCommand } from "@/utils/install.mjs";
import { styleFlags } from "@/utils/styles.mjs";

const MANAGERS = {
  pnpm: { runner: "pnpm dlx", Mark: Pnpm },
  npm: { runner: "npx", Mark: NPM },
  yarn: { runner: "yarn dlx", Mark: Yarn },
  bun: { runner: "bunx", Mark: Bun },
} as const;

type Manager = keyof typeof MANAGERS;

export default function Install({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<Manager | null>(null);
  const playground = usePlayground();
  const flags = playground
    ? styleFlags(playground.style, playground.radius)
    : "";

  const copy = async (manager: Manager) => {
    try {
      await navigator.clipboard.writeText(
        addCommand(MANAGERS[manager].runner, id, flags),
      );
    } catch {
      return;
    }
    setCopied(manager);
    setTimeout(() => setCopied(null), 2000);
  };

  const popup = (
    <Menu.Popup className="tp:a tdu:200 ttf:eo opening:o:0 opening:s:90 closing:o:0 closing:s:90 @prm:tp:none p:1 oy:auto w:fc max-w:32 max-h:40 bc:border bg:surface bw:1">
      {(Object.keys(MANAGERS) as Manager[]).map((manager) => (
        <Menu.Item
          key={manager}
          onClick={() => copy(manager)}
          className={(state) =>
            `d:f ai:c g:2 px:2 py:1 ff:m fs:xs c:p us:none ${
              state.highlighted ? "bg:border c:accent" : "c:accent-dim"
            }`
          }
        >
          {(() => {
            const { Mark } = MANAGERS[manager];
            return <Mark className="fs:0 w:4 h:4" />;
          })()}
          {manager}
        </Menu.Item>
      ))}
    </Menu.Popup>
  );

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <HintTooltip label="Copy install command">
        <Menu.Trigger
          className="d:f ai:c jc:c fs:0 w:8 h:8 bc:border bg:surface h:bg:surface-8 a:bg:surface-7 c:ink bw:1 c:p fv:oc:ink fv:oo:2"
          aria-label="Copy install command"
        >
          {copied ? (
            <Check className="w:4 h:4" aria-hidden />
          ) : (
            <Copy className="w:4 h:4" aria-hidden />
          )}
        </Menu.Trigger>
      </HintTooltip>
      <Menu.Portal>
        <Menu.Positioner
          data-chrome
          side="bottom"
          align="end"
          sideOffset={4}
          collisionAvoidance={{ side: "none", fallbackAxisSide: "none" }}
          className="zi:50"
        >
          {popup}
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

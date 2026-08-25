"use client";

import { useState } from "react";
import { CopyButton } from "@/components/ui/code";
import { useCodeFrame } from "@/lib/use-code-frame";

/**
 * The install command, in the rail rather than in the page.
 *
 * It was a `## Installation` section with a tab strip, which is a lot of the
 * article's width for one line you copy once and never read again. The
 * component is what the page is for.
 */
const MANAGERS = {
  pnpm: (id: string) => `pnpm dlx yummaui add ${id}`,
  npm: (id: string) => `npx yummaui add ${id}`,
};

type Manager = keyof typeof MANAGERS;

export default function Install({ id }: { id: string }) {
  const [manager, setManager] = useState<Manager>("pnpm");
  const [copied, setCopied] = useState(false);
  const frame = useCodeFrame();
  const command = MANAGERS[manager](id);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-8">
      <div className="d-f ai-c jc-sb g-2 mb-2">
        <h3 className="c-silver-8 fs-xs fw-600 ls-2 tt-u">Install</h3>
        <div className="d-f g-1">
          {(Object.keys(MANAGERS) as Manager[]).map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setManager(name)}
              aria-pressed={manager === name}
              className={`px-2 py-1 bg-transparent bw-1 ff-m fs-xs c-p tp-c tdu-150 fv:oo--1 fv:oc-accent ${
                manager === name
                  ? "bc-accent-dim c-accent"
                  : "bc-border c-accent-dim h:c-accent-dim"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* The copy control sits under the command rather than beside it. The
          rail is narrower than `pnpm dlx yummaui add button`, so anything
          sharing that line lands on top of the last word. */}
      <div className={`p-2 bc-border bg-page bw-1 ${frame.isLight ? "" : "cs-d bg-surface"}`}>
        <code className="d-b c-accent-dim fs-xs ff-m ws-pw">{command}</code>
        <div className="d-f jc-fe mt-1">
          <CopyButton copied={copied} onCopy={copy} />
        </div>
      </div>
    </div>
  );
}

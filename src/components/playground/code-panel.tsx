"use client";

import { useState } from "react";
import { CopyButton, TitleBar } from "@/components/ui/code";
import type { RegistryMeta } from "@/registry";
import { buildUsage, TOKEN_COLORS, tokensToText } from "@/utils/snippet";

interface Props {
  id: string;
  meta: RegistryMeta | null;
  values: Record<string, unknown>;
}

/**
 * Only props that differ from their default reach `buildUsage`, so a control
 * left at its schema default never shows up in the snippet - the same rule
 * `<ComponentPreview>`'s "Show code" panel follows.
 */
export default function CodePanel({ id, meta, values }: Props) {
  const [copied, setCopied] = useState(false);

  if (!meta) return null;

  const tokens = buildUsage(id, meta, values);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tokensToText(tokens));
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="btw-1 bc-border bg-surface">
      <TitleBar title="page.tsx" />
      <div className="p-r">
        <div className="p-a t-2 r-2">
          <CopyButton copied={copied} onCopy={copy} />
        </div>
        <pre className="ox-auto oy-auto max-h-48 px-4 py-3 ff-m fs-sm lh-5">
          <code>
            {tokens.map((token) => (
              <span key={token.id} style={{ color: TOKEN_COLORS[token.kind] }}>
                {token.text}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

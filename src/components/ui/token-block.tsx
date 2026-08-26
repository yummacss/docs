"use client";

import { Button } from "@base-ui/react";
import { useState } from "react";
import { CopyButton, TitleBar } from "@/components/ui/code";
import { TOKEN_COLORS, type Token, tokensToText } from "@/utils/snippet";

/** Hand-highlighted usage snippet; shared by static preview and playground. */
export default function TokenBlock({
  tokens,
  className = "bc-border btw-1",
  expanded = false,
  title,
}: {
  tokens: Token[];
  /** Caller supplies frame classes (e.g. no top border under tabs). */
  className?: string;
  expanded?: boolean;
  /** File label in the title bar, like `Code`. */
  title?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    // Clipboard denial should not break the copied state UI.
    try {
      await navigator.clipboard.writeText(tokensToText(tokens));
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`cs-d bg-surface ${className}`}>
      <TitleBar
        title={title}
        action={<CopyButton copied={copied} onCopy={copy} />}
      />
      <pre className="ox-auto px-4 py-3 ff-m lh-5 ws-pw">
        <code>
          <Folded tokens={tokens} expanded={expanded} />
        </code>
      </pre>
    </div>
  );
}

/** Collapsible token regions; copy still takes the full snippet. */
function Folded({
  tokens,
  expanded = false,
}: {
  tokens: Token[];
  expanded?: boolean;
}) {
  const [open, setOpen] = useState<string[]>(() =>
    expanded
      ? [
          ...new Set(
            tokens.flatMap((token) => (token.fold ? [token.fold] : [])),
          ),
        ]
      : [],
  );
  const output: React.ReactNode[] = [];

  const toggle = (region: string) =>
    setOpen((current) =>
      current.includes(region)
        ? current.filter((name) => name !== region)
        : [...current, region],
    );

  const write = (token: Token) => (
    <span key={token.id} style={{ color: TOKEN_COLORS[token.kind] }}>
      {token.text}
    </span>
  );

  for (let i = 0; i < tokens.length; i++) {
    const region = tokens[i].fold;

    if (!region) {
      output.push(write(tokens[i]));
      continue;
    }

    // Consume the whole fold region in one pass.
    const body: Token[] = [];
    while (i < tokens.length && tokens[i].fold === region)
      body.push(tokens[i++]);
    i--;

    const isOpen = open.includes(region);

    // Control stays at the fold origin in both states.
    output.push(
      <Button
        key={`${region}-fold`}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Collapse" : "Expand"} ${region}`}
        onClick={() => toggle(region)}
        // Inherit monospace from parent `<code>`.
        style={{ font: "inherit" }}
        className={`d-if p-0 bg-transparent bw-0 va-b c-p a-none fv:oo-2 fv:oc-accent ${
          isOpen ? "c-foreground/25 h:c-foreground/60" : "c-foreground/40 h:c-foreground"
        }`}
      >
        ...
      </Button>,
    );

    if (isOpen) for (const token of body) output.push(write(token));
  }

  return <>{output}</>;
}

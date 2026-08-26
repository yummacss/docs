"use client";

import { Button } from "@base-ui/react";
import { Check, Copy } from "iconoir-react";
import { type ReactNode, useRef, useState } from "react";

/** Code blocks always render in dark scheme. */
const FRAME = "cs-d o-h my-4 bc-border bg-surface bw-1";
const FRAME_PREVIEW = "cs-d bg-surface";

interface Props {
  title?: string;
  lang?: string;
  preview?: boolean;
  grouped?: boolean;
  /** Highlighted <pre> markup, produced on the server by code-block.tsx. */
  html?: string;
  /** Original source, used for copying so no markup can leak into it. */
  raw?: string;
  children?: React.ReactNode;
}

export default function Code({
  title,
  preview,
  grouped,
  html,
  raw,
  children,
}: Props) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    // Prefer raw source; fall back to rendered pre text.
    const text = raw ?? ref.current?.querySelector("pre")?.innerText ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyAction = <CopyButton copied={copied} onCopy={handleCopy} />;

  const body = html ? (
    <div
      // Wrapper is a div, not `<pre>`; apply monospace explicitly.
      className="ox-auto px-4 py-4 ff-m lh-5"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: server-generated Shiki output from repo-local source, never user input
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : null;

  if (preview) {
    return (
      <div ref={ref} className={FRAME_PREVIEW}>
        <TitleBar title={title} action={copyAction} />
        <div className="oy-auto max-h-80">
          {body ?? (
            <pre className="ox-auto px-4 py-4 ff-m lh-5">{children}</pre>
          )}
        </div>
      </div>
    );
  }

  // Inside CodeGroup: frame and copy live on the group.
  if (grouped) {
    return (
      <div ref={ref}>
        {body ?? <pre className="ox-auto px-4 py-4 lh-5">{children}</pre>}
      </div>
    );
  }

  return (
    <div ref={ref} className={FRAME}>
      <TitleBar title={title} action={copyAction} />
      {body ?? <pre className="ox-auto px-4 py-4 lh-5">{children}</pre>}
    </div>
  );
}

/** File title bar with optional copy action; shared with TokenBlock. */
export function TitleBar({
  title,
  action,
}: {
  title?: string | null;
  action?: ReactNode;
}) {
  if (!title && !action) return null;

  // Zero-width anchor matches titled bar height when copy-only.
  const heightAnchor = (
    <div
      className="d-f ai-c py-2 w-0 o-h pe-none invisible"
      aria-hidden="true"
    >
      <span className="fs-xs ff-m">{"\u200b"}</span>
    </div>
  );

  return (
    <div className="d-f bc-border bg-page">
      {title ? (
        <div className="d-f ai-c px-6 py-2 brw-1 bc-border bg-surface">
          <span className="c-accent fs-xs ff-m">{title}</span>
        </div>
      ) : (
        heightAnchor
      )}
      <div className="f-1 bbw-1 bc-border" />
      {action ? (
        <div className="d-f ai-c px-2 bbw-1 bc-border">{action}</div>
      ) : null}
    </div>
  );
}

/** Shared copy button for code panels. */
export function CopyButton({
  copied,
  onCopy,
}: {
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <Button
      onClick={onCopy}
      className="d-f ai-c g-1 px-2 py-1 c-accent h:c-accent-4 fv:oc-accent fv:ow-2"
      aria-label="Copy code"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      <span className="fs-xs">{copied ? "Copied!" : "Copy"}</span>
    </Button>
  );
}

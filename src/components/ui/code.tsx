"use client";

import { Button } from "@base-ui/react";
import { Check, Copy } from "iconoir-react";
import { type ReactNode, useRef, useState } from "react";

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
    const text = raw ?? ref.current?.querySelector("pre")?.innerText ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyAction = <CopyButton copied={copied} onCopy={handleCopy} />;

  const body = html ? (
    <div
      // ff-m because this wrapper is a div: the old markup was a <pre>, which
      // carried monospace implicitly.
      className="ox-auto px-4 py-4 ff-m lh-5"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: server-generated Shiki output from repo-local source, never user input
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : null;

  if (preview) {
    return (
      <div ref={ref} className="bg-surface">
        <TitleBar title={title} action={copyAction} />
        <div className="oy-auto max-h-80">
          {body ?? (
            <pre className="ox-auto px-4 py-4 ff-m lh-5">{children}</pre>
          )}
        </div>
      </div>
    );
  }

  // Rendered inside a <CodeGroup>: the group supplies the frame, the tab
  // strip, and the copy control, so drop the outer chrome here.
  if (grouped) {
    return (
      <div ref={ref}>
        {body ?? <pre className="ox-auto px-4 py-4 lh-5">{children}</pre>}
      </div>
    );
  }

  return (
    <div ref={ref} className="o-h my-4 bc-border bg-surface bw-1">
      <TitleBar title={title} action={copyAction} />
      {body ?? <pre className="ox-auto px-4 py-4 lh-5">{children}</pre>}
    </div>
  );
}

/**
 * The bar naming the file a block belongs to, with the copy control on the
 * right so it never sits on top of the source.
 *
 * Exported for the same reason as `CopyButton`: `ComponentPreview` renders its
 * usage snippet from a token stream rather than through this component, and a
 * second hand-written copy of this markup is a second thing to keep in step.
 * Renders nothing without a title or action, so callers need no conditional.
 */
export function TitleBar({
  title,
  action,
}: {
  title?: string | null;
  action?: ReactNode;
}) {
  if (!title && !action) return null;

  return (
    <div className="d-f bc-border bg-page">
      {title ? (
        <div className="d-f ai-c px-6 py-2 brw-1 bc-border bg-surface">
          <span className="c-accent fs-xs ff-m">{title}</span>
        </div>
      ) : null}
      <div className="f-1 bbw-1 bc-border" />
      {action ? (
        <div className="d-f ai-c px-2 bbw-1 bc-border">{action}</div>
      ) : null}
    </div>
  );
}

/**
 * Exported so the /ui playground's code panel is the same button, not a lookalike.
 */
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
      className="d-f ai-c g-1 px-2 py-1 c-accent h:c-accent-4 fv:oc-white fv:ow-2"
      aria-label="Copy code"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      <span className="fs-xs">{copied ? "Copied!" : "Copy"}</span>
    </Button>
  );
}

"use client";

import { Button } from "@base-ui/react";
import { Check, Copy } from "iconoir-react";
import { useRef, useState } from "react";

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
    // Prefer the original source. innerText is the fallback for the few
    // blocks still rendered from children; it reflects rendered line breaks
    // from block-level line spans and <br> elements, unlike textContent.
    const text = raw ?? ref.current?.querySelector("pre")?.innerText ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      // The title sits outside the scroll box on purpose: which file you are
      // reading has to stay put while the source scrolls under it, and these
      // blocks are capped at max-h-80 precisely because they are long.
      <div ref={ref} className="bg-surface">
        <TitleBar title={title} />
        <div className="p-r oy-auto max-h-80">
          <div className="p-a t-2 r-2">
            <CopyButton copied={copied} onCopy={handleCopy} />
          </div>
          {body ?? (
            <pre className="ox-auto px-4 py-4 ff-m lh-5">{children}</pre>
          )}
        </div>
      </div>
    );
  }

  // Rendered inside a <CodeGroup>: the group supplies the frame and the tab
  // (from this block's title), so drop the outer chrome and title bar here.
  if (grouped) {
    return (
      <div ref={ref} className="p-r">
        <div className="p-a t-2 r-2">
          <CopyButton copied={copied} onCopy={handleCopy} />
        </div>
        {body ?? <pre className="ox-auto px-4 py-4 lh-5">{children}</pre>}
      </div>
    );
  }

  return (
    <div ref={ref} className="p-r o-h my-4 bc-border bg-surface bw-1">
      <TitleBar title={title} />
      <div className="p-r">
        <div className="p-a t-2 r-2">
          <CopyButton copied={copied} onCopy={handleCopy} />
        </div>
        {body ?? <pre className="ox-auto px-4 py-4 lh-5">{children}</pre>}
      </div>
    </div>
  );
}

/**
 * The bar naming the file a block belongs to.
 *
 * Exported for the same reason as `CopyButton`: `ComponentPreview` renders its
 * usage snippet from a token stream rather than through this component, and a
 * second hand-written copy of this markup is a second thing to keep in step.
 * Renders nothing without a title, so callers need no conditional.
 */
export function TitleBar({ title }: { title?: string | null }) {
  if (!title) return null;

  return (
    <div className="d-f bc-border bg-page">
      <div className="d-f ai-c px-6 py-2 brw-1 bc-border bg-surface">
        <span className="c-accent fs-xs ff-m">{title}</span>
      </div>
      <div className="f-1 bbw-1 bc-border" />
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

"use client";

import { Button } from "@base-ui/react";
import { Check, Copy } from "iconoir-react";
import { useRef, useState } from "react";

interface Props {
  title?: string;
  lang?: string;
  preview?: boolean;
  grouped?: boolean;
  children?: React.ReactNode;
}

export default function Code({ title, preview, grouped, children }: Props) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    // innerText reflects rendered line breaks from block-level line spans
    // and <br> elements, unlike textContent (used for highlighted blocks).
    const text = ref.current?.querySelector("pre")?.innerText ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (preview) {
    return (
      <div ref={ref} className="p-r oy-auto max-h-80 bg-surface">
        <div className="p-a t-2 r-2">
          <CopyButton copied={copied} onCopy={handleCopy} />
        </div>
        <pre className="ox-auto px-4 py-4 ff-m lh-5">{children}</pre>
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
        <pre className="ox-auto px-4 py-4 lh-5">{children}</pre>
      </div>
    );
  }

  return (
    <div ref={ref} className="p-r o-h my-4 bc-border bg-surface bw-1">
      {title ? (
        <div className="d-f bc-border bg-page">
          <div className="d-f ai-c px-6 py-2 brw-1 bc-border bg-surface">
            <span className="c-accent fs-xs ff-m">{title}</span>
          </div>
          <div className="f-1 bbw-1 bc-border" />
        </div>
      ) : null}
      <div className="p-r">
        <div className="p-a t-2 r-2">
          <CopyButton copied={copied} onCopy={handleCopy} />
        </div>
        <pre className="ox-auto px-4 py-4 lh-5">{children}</pre>
      </div>
    </div>
  );
}

function CopyButton({
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

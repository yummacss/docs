"use client";

import { Button } from "@base-ui/react";
import { Check, Copy } from "iconoir-react";
import { useRef, useState } from "react";

interface Props {
  title?: string;
  lang?: string;
  preview?: boolean;
  children?: React.ReactNode;
}

export default function Code({ title, preview, children }: Props) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    const text = ref.current?.querySelector("pre")?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (preview) {
    return (
      <div className="oy-auto max-h-80 bg-surface">
        <pre className="ox-auto px-4 py-4 ff-m lh-5">{children}</pre>
      </div>
    );
  }

  return (
    <div ref={ref} className="p-r o-h my-4 bc-border bg-surface bw-1">
      {title ? (
        <div className="d-f ai-c jc-sb px-4 py-2 bc-border bg-surface bbw-1">
          <span className="c-white/60 fs-xs ff-m">{title}</span>
          <CopyButton copied={copied} onCopy={handleCopy} />
        </div>
      ) : (
        <div className="p-a t-2 r-2">
          <CopyButton copied={copied} onCopy={handleCopy} />
        </div>
      )}
      <pre className="ox-auto px-4 py-4 lh-5">{children}</pre>
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

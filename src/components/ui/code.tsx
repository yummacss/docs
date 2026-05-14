"use client";

import { Button } from "@base-ui/react";
import { Check, Copy } from "@gravity-ui/icons";
import { useRef, useState } from "react";

interface Props {
  title?: string;
  lang?: string;
  children?: React.ReactNode;
}

export default function Code({ title, children }: Props) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    const text = ref.current?.querySelector("pre")?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={ref} className="p-r o-h my-4 bc-navy bg-charcoal bw-1">
      {title ? (
        <div className="d-f ai-c jc-sb px-4 py-2 bc-navy bg-charcoal bbw-1">
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
      className="d-f ai-c g-1 px-2 py-1 c-white/50 h:c-white h:bg-white/10 fv:oc-white fv:ow-2"
      aria-label="Copy code"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      <span className="fs-xs">{copied ? "Copied!" : "Copy"}</span>
    </Button>
  );
}

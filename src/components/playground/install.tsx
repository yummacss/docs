"use client";

import { Button } from "@base-ui/react";
import { useState } from "react";
import { usePlayground } from "@/components/playground/context";
import { Check, Copy } from "@/icons";

// the tabs' own type and spacing, with their surface box on hover
const BUTTON =
  "d:f fs:0 ai:c g:1 h:6 px:2 bw:1 bc:transparent bg:transparent c:ink/80 fs:sm fw:500 us:none ws:nw c:p h:bg:surface h:bc:border fv:oc:accent fv:ow:2 fv:oo:-1";

// the styled file, as `yummaui add` would write it
async function componentSource(id: string, style: string, radius: string) {
  const response = await fetch(`/ui/r/${style}-${radius}/${id}.json`);
  const item: { files: { content: string }[] } = await response.json();
  return item.files.map((file) => file.content).join("\n");
}

/** Copies the component's file, styled as the rail sets it. */
export default function Install({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const playground = usePlayground();
  const style = playground?.style ?? "";
  const radius = playground?.radius ?? "";

  const done = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // a ClipboardItem holds the promise, so the copy keeps the click's permission while the file loads
  const copy = async () => {
    const text = componentSource(id, style, radius);
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": text.then(
            (source) => new Blob([source], { type: "text/plain" }),
          ),
        }),
      ]);
      done();
    } catch {
      try {
        await navigator.clipboard.writeText(await text);
        done();
      } catch {}
    }
  };

  // only the icon changes, so the label never moves; the name says it copied
  return (
    <Button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copy component, copied" : undefined}
      className={BUTTON}
    >
      {copied ? (
        <Check className="w:4 h:4" aria-hidden />
      ) : (
        <Copy className="w:4 h:4" aria-hidden />
      )}
      Copy component
    </Button>
  );
}

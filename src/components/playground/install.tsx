"use client";

import { Button } from "@base-ui/react";
import { useState } from "react";
import { usePlayground } from "@/components/playground/context";
import { Check, Copy } from "@/icons";
import { addCommand } from "@/utils/install.mjs";
import { styleFlags } from "@/utils/styles.mjs";

type Copied = "command" | "code" | null;

const BUTTON =
  "d:f fs:0 ai:c g:2 h:7 px:3 bc:border bg:surface bw:1 c:ink fs:xs us:none c:p h:bg:surface-8 a:bg:surface-7 fv:oc:ink fv:ow:2 fv:oo:-2";

// the styled file, as `yummaui add` would write it
async function componentSource(id: string, style: string, radius: string) {
  const response = await fetch(`/ui/r/${style}-${radius}/${id}.json`);
  const item: { files: { content: string }[] } = await response.json();
  return item.files.map((file) => file.content).join("\n");
}

/** Copies the CLI command, or the component's file itself. */
export default function Install({ id }: { id: string }) {
  const [copied, setCopied] = useState<Copied>(null);
  const playground = usePlayground();
  const style = playground?.style ?? "";
  const radius = playground?.radius ?? "";

  const done = (which: Copied) => {
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(
        addCommand(id, styleFlags(style, radius)),
      );
      done("command");
    } catch {}
  };

  // a ClipboardItem holds the promise, so the copy keeps the click's permission while the file loads
  const copyCode = async () => {
    const text = componentSource(id, style, radius);
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": text.then(
            (source) => new Blob([source], { type: "text/plain" }),
          ),
        }),
      ]);
      done("code");
    } catch {
      try {
        await navigator.clipboard.writeText(await text);
        done("code");
      } catch {}
    }
  };

  const icon = (which: Copied) =>
    copied === which ? (
      <Check className="w:4 h:4" aria-hidden />
    ) : (
      <Copy className="w:4 h:4" aria-hidden />
    );

  // the short label keeps both buttons beside the tabs on a phone
  const label = (which: Copied, short: string, full: string) =>
    copied === which ? (
      "Copied"
    ) : (
      <>
        <span className="@sm:d:none">{short}</span>
        <span className="d:none @sm:d:i">{full}</span>
      </>
    );

  return (
    <div className="d:f fs:0">
      <Button type="button" onClick={copyCommand} className={BUTTON}>
        {icon("command")}
        {label("command", "Command", "Copy command")}
      </Button>
      <Button type="button" onClick={copyCode} className={`${BUTTON} blw:0`}>
        {icon("code")}
        {label("code", "Code", "Copy code")}
      </Button>
    </div>
  );
}

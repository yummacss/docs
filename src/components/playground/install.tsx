"use client";

import { Button } from "@base-ui/react";
import { useState } from "react";
import { usePlayground } from "@/components/playground/context";
import { Check, Copy } from "@/icons";
import { addCommand } from "@/utils/install.mjs";
import { styleFlags } from "@/utils/styles.mjs";

type Copied = "command" | "code" | null;

// the tabs' own type and spacing, with their surface box on hover
const BUTTON =
  "d:f fs:0 ai:c g:1 h:6 px:2 bw:1 bc:transparent bg:transparent c:ink/80 fs:sm fw:500 us:none ws:nw c:p h:bg:surface h:bc:border fv:oc:accent fv:ow:2 fv:oo:-1";

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
      <Check className="w:3 h:3" aria-hidden />
    ) : (
      <Copy className="w:3 h:3" aria-hidden />
    );

  return (
    <div className="d:f fs:0 ai:c cg:1">
      <Button
        type="button"
        onClick={copyCommand}
        aria-label={copied === "command" ? "Copied" : "Copy the CLI command"}
        className={BUTTON}
      >
        {icon("command")}
        {copied === "command" ? "Copied" : "CLI"}
      </Button>
      <Button
        type="button"
        onClick={copyCode}
        aria-label={copied === "code" ? "Copied" : "Copy the component file"}
        className={BUTTON}
      >
        {icon("code")}
        {copied === "code" ? "Copied" : "File"}
      </Button>
    </div>
  );
}

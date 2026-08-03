"use client";

import { Toggle } from "@base-ui/react/toggle";
import { Check, Copy } from "iconoir-react";
import {
  type ComponentType,
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePlayground } from "@/components/ui/playground-context";
import { getRegistryImport } from "@/registry";
import {
  buildInstall,
  buildSnippet,
  TOKEN_COLORS,
  type Token,
  tokensToText,
} from "@/utils/snippet";

interface Props {
  registryId: string;
  /** Children handed to the component, when it takes them. */
  label?: string;
}

type Tab = "usage" | "install";

/**
 * The stage: one live component filling the page, with its usage beneath it.
 *
 * The controls & the props table are not here. They render into the column the
 * table of contents used to occupy, from the same schema, via
 * `PlaygroundProvider`. Splitting them is what lets the preview have the width.
 */
export default function ComponentPlayground({ registryId, label }: Props) {
  const { meta, values, register, dark, setDark } = usePlayground();
  const [Component, setComponent] = useState<ComponentType<
    Record<string, unknown>
  > | null>(null);
  const [tab, setTab] = useState<Tab>("usage");

  useEffect(() => {
    const importComponent = getRegistryImport(registryId);
    if (importComponent) setComponent(() => lazy(importComponent));
  }, [registryId]);

  // Telling the panel which component it is describing, and clearing it again
  // on the way out so a page without a stage cannot inherit a stale panel.
  useEffect(() => {
    register(registryId);
    return () => register(null);
  }, [registryId, register]);

  // A component that declares no children slot renders, and is written, without
  // any: `label ?? meta.children` is undefined for both at once.
  const text = label ?? meta?.children;

  const tokens = useMemo(() => {
    if (tab === "install") return buildInstall(registryId);
    if (!meta) return [];
    return buildSnippet(registryId, meta, values, text);
  }, [tab, meta, values, registryId, text]);

  if (!Component) return null;

  return (
    <div className="mb-12 bc-border bw-1">
      <div className="d-f ai-c jc-sb px-4 py-2 bc-border bbw-1">
        <label
          className="d-f ai-c g-3 c-white/70 fs-sm us-none c-p"
          htmlFor="playground-dark"
        >
          <Switch
            id="playground-dark"
            pressed={dark}
            onPressedChange={setDark}
          />
          Dark surface
        </label>
      </div>

      <div
        data-preview
        data-scheme={dark ? "dark" : "light"}
        className={`d-f p-r ox-auto ai-c jc-c p-12 ${dark ? "bg-slate-11" : "bg-white"}`}
        style={{ height: "clamp(20rem, 58dvh, 40rem)" }}
      >
        <Suspense fallback={null}>
          <Component {...values}>{text}</Component>
        </Suspense>
      </div>

      <CodePanel
        registryId={registryId}
        tab={tab}
        onTabChange={setTab}
        tokens={tokens}
      />
    </div>
  );
}

function CodePanel({
  registryId,
  tab,
  onTabChange,
  tokens,
}: {
  registryId: string;
  tab: Tab;
  onTabChange: (tab: Tab) => void;
  tokens: Token[];
}) {
  const [copied, setCopied] = useState(false);
  const text = tokensToText(tokens);

  const copy = async () => {
    // A denied clipboard permission rejects, and an unhandled rejection here
    // would take the confirmation down with it rather than just the copy.
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "usage", label: `${registryId}.tsx` },
    { id: "install", label: "Install" },
  ];

  return (
    <div className="bg-surface bc-border btw-1">
      <div className="d-f ai-c jc-sb px-2 bc-border bbw-1">
        <div className="d-f">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`px-3 py-2 bg-transparent bw-0 fs-sm us-none c-p fv:oo-2 fv:oc-accent ${
                tab === item.id ? "c-white" : "c-white/40 h:c-white/70"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={copy}
          className="d-f ai-c g-2 px-3 py-2 bg-transparent c-white/70 bw-0 fs-sm us-none c-p h:c-white fv:oo-2 fv:oc-accent"
        >
          {copied ? (
            <Check className="fs-0 w-4 h-4 c-accent" />
          ) : (
            <Copy className="fs-0 w-4 h-4" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="ox-auto px-4 py-3 fs-sm ff-m lh-5">
        <code>
          {tokens.map((token) => (
            <span key={token.id} style={{ color: TOKEN_COLORS[token.kind] }}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

/**
 * Sharp, because the site is. Every other surface here is a rectangle, so a
 * pill switch would be the only rounded thing on the page.
 */
export function Switch({
  id,
  pressed,
  onPressedChange,
}: {
  id?: string;
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
}) {
  return (
    <Toggle
      id={id}
      pressed={pressed}
      onPressedChange={onPressedChange}
      className={`d-f p-r ai-c fs-0 w-9 h-5 px-1 bc-border bw-1 c-p tp-c tdu-150 ttf-io fv:oo-2 fv:oc-accent ${
        pressed ? "bg-accent" : "bg-surface"
      }`}
    >
      <span
        className={`d-b w-3 h-3 tp-a tdu-150 ttf-io ${pressed ? "bg-page" : "bg-white/40"}`}
        style={{ transform: pressed ? "translateX(0.875rem)" : "none" }}
      />
    </Toggle>
  );
}

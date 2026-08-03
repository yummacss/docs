"use client";

import {
  type ComponentType,
  lazy,
  Suspense,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { CopyButton } from "@/components/ui/code";
import { usePlayground } from "@/components/ui/playground-context";
import { getRegistryImport } from "@/registry";
import {
  buildInstall,
  buildSnippet,
  TOKEN_COLORS,
  tokensToText,
} from "@/utils/snippet";

interface Props {
  registryId: string;
  /** Children handed to the component, when it takes them. */
  label?: string;
}

const TABS = ["usage", "terminal"] as const;
type Tab = (typeof TABS)[number];

/**
 * The stage: one live component, with its usage beneath it.
 *
 * The controls & the props table are not here. They render into the column the
 * table of contents used to occupy, from the same schema, via
 * `PlaygroundProvider`.
 */
export default function ComponentPlayground({ registryId, label }: Props) {
  const { meta, values, register } = usePlayground();
  const [Component, setComponent] = useState<ComponentType<
    Record<string, unknown>
  > | null>(null);

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

  if (!Component) return null;

  return (
    <div className="mb-12">
      <div
        data-preview
        className="d-f p-r ox-auto ai-c jc-c p-12 bc-border bg-white bw-1"
        style={{ height: "clamp(18rem, 46dvh, 34rem)" }}
      >
        <Suspense fallback={null}>
          <Component {...values}>{text}</Component>
        </Suspense>
      </div>

      <CodePanel
        registryId={registryId}
        meta={meta}
        values={values}
        text={text}
      />
    </div>
  );
}

/**
 * Chrome borrowed wholesale from `CodeGroup` & `Code`, down to the filler div
 * that carries the tab strip's bottom border. Two tabbed panels that look
 * different on the same site would just be a bug you have to look at twice.
 */
function CodePanel({
  registryId,
  meta,
  values,
  text,
}: {
  registryId: string;
  meta: ReturnType<typeof usePlayground>["meta"];
  values: ReturnType<typeof usePlayground>["values"];
  text: string | undefined;
}) {
  const [active, setActive] = useState<Tab>("usage");
  const [copied, setCopied] = useState(false);
  const groupId = useId();

  const tokens = useMemo(() => {
    if (active === "terminal") return buildInstall(registryId);
    if (!meta) return [];
    return buildSnippet(registryId, meta, values, text);
  }, [active, meta, values, registryId, text]);

  const copy = async () => {
    // A denied clipboard permission rejects, and an unhandled rejection here
    // would take the confirmation down with it rather than just the copy.
    try {
      await navigator.clipboard.writeText(tokensToText(tokens));
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labelFor = (tab: Tab) =>
    tab === "usage" ? `${registryId}.tsx` : "Terminal";

  return (
    <div className="p-r o-h bc-border bg-surface bw-1 btw-0">
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="d-f bc-border bg-page ox-auto"
      >
        {TABS.map((tab, index) => {
          const selected = tab === active;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`${groupId}-tab-${tab}`}
              aria-selected={selected}
              aria-controls={`${groupId}-panel-${tab}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  setActive(TABS[(index + 1) % TABS.length]);
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  setActive(TABS[(index - 1 + TABS.length) % TABS.length]);
                }
              }}
              className={`d-f ai-c px-6 py-2 brw-1 bc-border fs-sm ff-m ws-nw c-p a-none ${
                selected
                  ? "c-accent bg-surface"
                  : "c-accent-dim bg-transparent bbw-1"
              }`}
            >
              {labelFor(tab)}
            </button>
          );
        })}
        <div className="f-1 bbw-1 bc-border" />
      </div>

      <div
        role="tabpanel"
        id={`${groupId}-panel-${active}`}
        aria-labelledby={`${groupId}-tab-${active}`}
        className="p-r"
      >
        <div className="p-a t-2 r-2">
          <CopyButton copied={copied} onCopy={copy} />
        </div>
        <pre className="ox-auto px-4 py-4 ff-m lh-5">
          <code>
            {tokens.map((token) => (
              <span key={token.id} style={{ color: TOKEN_COLORS[token.kind] }}>
                {token.text}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

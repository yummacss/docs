"use client";
import { Toggle } from "@base-ui/react/toggle";
import type { ComponentType } from "react";
import { lazy, type ReactNode, Suspense, useEffect, useState } from "react";
import { CopyButton } from "@/components/ui/code";
import {
  getRegistryImport,
  getRegistryMeta,
  getRegistryTarget,
} from "@/registry";
import {
  buildInstall,
  buildUsage,
  TOKEN_COLORS,
  type Token,
  tokensToText,
} from "@/utils/snippet";

interface Props {
  registryId?: string;
  id?: string;
  className?: string;
  children?: ReactNode;
}

type DemoProps = Record<string, string | boolean | number | undefined>;

export default function ComponentPreview({
  registryId,
  id,
  className,
  children,
}: Props) {
  const [showCode, setShowCode] = useState(false);
  const [RegistryComponent, setRegistryComponent] =
    useState<ComponentType<DemoProps> | null>(null);
  // A prop-driven component rendered with no props at all is an empty shell:
  // <Button /> has no label, <Avatar /> has no image. Its own schema already
  // says what a representative instance looks like, so the preview uses that.
  // A component with no schema gets nothing extra, exactly as before.
  const [demo, setDemo] = useState<{ props: DemoProps; children?: string }>({
    props: {},
  });
  // The base entry of a migrated component *is* the implementation, so showing
  // its source here answers a question nobody asked under `### Base`. Usage is
  // the answer; the implementation stays in the registry JSON & the `.md` route.
  const [usage, setUsage] = useState<Token[] | null>(null);
  const actualId = registryId || id;

  useEffect(() => {
    if (!actualId) return;

    const importFn = getRegistryImport(actualId);
    if (importFn) {
      setRegistryComponent(() => lazy(importFn));
    }

    const importMeta = getRegistryMeta(actualId);
    if (!importMeta) return;

    const target = getRegistryTarget(actualId);

    importMeta().then((module) => {
      const meta = module.default;
      const props: DemoProps = {};
      for (const prop of meta.props) {
        const value = prop.example ?? prop.default;
        if (value !== undefined) props[prop.name] = value;
      }
      setDemo({ props, children: meta.children });
      if (target.variant === "base") {
        setUsage(buildUsage(target.component, meta, props));
      }
    });
  }, [actualId]);

  return (
    <div className={`mb-6 bc-border bw-1 ${className || ""}`}>
      <Suspense fallback={null}>
        {RegistryComponent ? (
          <div data-preview className="d-f p-r ox-auto ai-c jc-c p-10 bg-white">
            <RegistryComponent {...demo.props}>
              {demo.children}
            </RegistryComponent>
          </div>
        ) : null}
      </Suspense>

      {actualId && <InstallCommand registryId={actualId} />}

      <Toggle
        pressed={showCode}
        onPressedChange={setShowCode}
        className="d-f ai-c jc-c w-100% h-8 bc-border bg-surface c-accent bw-0 btw-1 fs-sm fw-500 tp-c tdu-150 ttf-io us-none fv:oc-white fv:ow-2"
      >
        {showCode ? "Hide code" : "Show code"}
      </Toggle>

      {showCode && (usage ? <TokenBlock tokens={usage} /> : children)}
    </div>
  );
}

/** How you actually get this variant, directly under the thing it draws. */
function InstallCommand({ registryId }: { registryId: string }) {
  const { component, variant } = getRegistryTarget(registryId);
  return <TokenBlock tokens={buildInstall(component, variant)} />;
}

/**
 * A hand-highlighted block, framed like `Code` down to the copy button's
 * position, because a second style of code block on the same page would only be
 * a thing to look at twice.
 */
function TokenBlock({ tokens }: { tokens: Token[] }) {
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="p-r bc-border bg-surface btw-1">
      <div className="p-a t-2 r-2">
        <CopyButton copied={copied} onCopy={copy} />
      </div>
      <pre className="ox-auto px-4 py-3 ff-m lh-5">
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

"use client";
import { Toggle } from "@base-ui/react/toggle";
import type { ComponentType } from "react";
import {
  lazy,
  type ReactNode,
  Suspense,
  useEffect,
  useId,
  useState,
} from "react";
import { CopyButton } from "@/components/ui/code";
import CodeTabs from "@/components/ui/code-tabs";
import {
  getRegistryImport,
  getRegistryMeta,
  getRegistryTarget,
} from "@/registry";
import {
  buildInstall,
  buildUsage,
  PACKAGE_MANAGERS,
  type PackageManager,
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

type DemoProps = Record<string, unknown>;

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

/**
 * How you actually get this variant, directly under the thing it draws.
 *
 * Two tabs, pnpm then npm, because that is the convention for every install
 * command on the site. Generated rather than authored: a hand-written
 * `<CodeGroup>` under each of 431 previews is the same two lines 431 times, and
 * the component id is already here.
 */
function InstallCommand({ registryId }: { registryId: string }) {
  const { component, variant } = getRegistryTarget(registryId);
  const [manager, setManager] = useState<PackageManager>("pnpm");
  const groupId = useId();

  return (
    <div className="bc-border btw-1">
      <CodeTabs
        idPrefix={groupId}
        active={manager}
        onSelect={setManager}
        tabs={PACKAGE_MANAGERS.map((id) => ({ id, label: id }))}
      />
      <div
        role="tabpanel"
        id={`${groupId}-panel-${manager}`}
        aria-labelledby={`${groupId}-tab-${manager}`}
      >
        <TokenBlock
          tokens={buildInstall(component, variant, manager)}
          className=""
        />
      </div>
    </div>
  );
}

/**
 * A hand-highlighted block, framed like `Code` down to the copy button's
 * position, because a second style of code block on the same page would only be
 * a thing to look at twice.
 */
function TokenBlock({
  tokens,
  className = "bc-border btw-1",
}: {
  tokens: Token[];
  /** The frame is the caller's, so a block under a tab strip adds no second rule. */
  className?: string;
}) {
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
    <div className={`p-r bg-surface ${className}`}>
      <div className="p-a t-2 r-2">
        <CopyButton copied={copied} onCopy={copy} />
      </div>
      <pre className="ox-auto px-4 py-3 ff-m lh-5">
        <code>
          <Folded tokens={tokens} />
        </code>
      </pre>
    </div>
  );
}

/**
 * Renders the token stream with collapsible regions, the way an editor's gutter
 * arrow collapses a block.
 *
 * Folding hides nothing: every token is still in the stream & the copy button
 * takes the whole snippet regardless of what is open. It only keeps the shape of
 * the code readable, so a four-item fixture does not push the element it feeds
 * off the screen.
 */
function Folded({ tokens }: { tokens: Token[] }) {
  const [open, setOpen] = useState<string[]>([]);
  const output: React.ReactNode[] = [];

  const toggle = (region: string) =>
    setOpen((current) =>
      current.includes(region)
        ? current.filter((name) => name !== region)
        : [...current, region],
    );

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const region = token.fold;

    if (!region) {
      output.push(
        <span key={token.id} style={{ color: TOKEN_COLORS[token.kind] }}>
          {token.text}
        </span>,
      );
      continue;
    }

    const expanded = open.includes(region);

    // The control sits at the region's origin in both states, so whatever you
    // clicked to open is what you click to close. No frame and no fill: it is
    // punctuation that happens to be interactive.
    output.push(
      <button
        key={`${token.id}-fold`}
        type="button"
        aria-expanded={expanded}
        aria-label={`${expanded ? "Collapse" : "Expand"} ${region}`}
        onClick={() => toggle(region)}
        // A button does not inherit type, and `<code>` sets its own size, so
        // without this the ellipsis is a slightly different monospace at a
        // slightly different size from the code it sits inside.
        style={{ font: "inherit" }}
        className={`d-if p-0 bg-transparent bw-0 va-b c-p a-none fv:oo-2 fv:oc-accent ${
          expanded ? "c-white/25 h:c-white/60" : "c-white/40 h:c-white"
        }`}
      >
        ...
      </button>,
    );

    // Closed: skip the body the control stands in for. Open: fall through and
    // let it render, with the control left in place as the way back.
    if (!expanded) {
      while (i + 1 < tokens.length && tokens[i + 1].fold === region) i++;
    }
  }

  return <>{output}</>;
}

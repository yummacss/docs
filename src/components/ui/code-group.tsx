"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useId,
  useState,
} from "react";
import { CopyButton } from "@/components/ui/code";
import CodeTabs from "@/components/ui/code-tabs";

interface CodeChildProps {
  title?: string;
  lang?: string;
  /** Raw source from rehype-code; used for the tab-bar copy control. */
  code?: string;
  grouped?: boolean;
  children?: ReactNode;
}

interface Props {
  children?: ReactNode;
}

/**
 * Groups consecutive fenced code blocks into a tabbed panel.
 *
 * Each child is a `<Code>` produced by the rehype-code plugin; its `title`
 * meta becomes the tab label (falling back to `lang`, then a positional name).
 * Blank lines around the fences inside the wrapper are required so MDX parses
 * them as code rather than JSX text.
 *
 * Usage:
 *   <CodeGroup>
 *
 *   ```ts title="vite.config.ts"
 *   ...
 *   ```
 *
 *   ```js title="astro.config.mjs"
 *   ...
 *   ```
 *
 *   </CodeGroup>
 */
export default function CodeGroup({ children }: Props) {
  const panels = Children.toArray(children).filter(
    (child): child is ReactElement<CodeChildProps> => isValidElement(child),
  );
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const groupId = useId();

  if (panels.length === 0) return null;

  const labelFor = (child: ReactElement<CodeChildProps>, i: number) =>
    child.props.title ?? child.props.lang ?? `Tab ${i + 1}`;

  const current = Math.min(active, panels.length - 1);

  const handleCopy = async () => {
    const text = panels[current].props.code ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const select = (id: string) => {
    setActive(Number(id));
    setCopied(false);
  };

  return (
    <div className="cs-d o-h my-4 bc-border bg-surface bw-1">
      <CodeTabs
        idPrefix={groupId}
        active={String(current)}
        onSelect={select}
        tabs={panels.map((child, i) => ({
          id: String(i),
          label: labelFor(child, i),
        }))}
        action={<CopyButton copied={copied} onCopy={handleCopy} />}
      />
      <div
        role="tabpanel"
        id={`${groupId}-panel-${current}`}
        aria-labelledby={`${groupId}-tab-${current}`}
      >
        {cloneElement(panels[current], { grouped: true })}
      </div>
    </div>
  );
}

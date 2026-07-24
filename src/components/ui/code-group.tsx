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

interface CodeChildProps {
  title?: string;
  lang?: string;
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
  const groupId = useId();

  if (panels.length === 0) return null;

  const labelFor = (child: ReactElement<CodeChildProps>, i: number) =>
    child.props.title ?? child.props.lang ?? `Tab ${i + 1}`;

  const current = Math.min(active, panels.length - 1);

  return (
    <div className="p-r o-h my-4 bc-border bg-surface bw-1">
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="d-f bc-border bg-page ox-auto"
      >
        {panels.map((child, i) => {
          const selected = i === current;
          return (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: authored code blocks are static and never reorder
              key={`${groupId}-tab-${i}`}
              type="button"
              role="tab"
              id={`${groupId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${groupId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  setActive((i + 1) % panels.length);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  setActive((i - 1 + panels.length) % panels.length);
                }
              }}
              className={`d-f ai-c px-6 py-2 brw-1 bc-border fs-xs ff-m ws-nw c-p a-none ${
                selected
                  ? "c-accent bg-surface"
                  : "c-accent-dim bg-transparent bbw-1"
              }`}
            >
              {labelFor(child, i)}
            </button>
          );
        })}
        <div className="f-1 bbw-1 bc-border" />
      </div>
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

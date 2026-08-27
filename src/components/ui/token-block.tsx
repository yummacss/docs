"use client";

import { Button } from "@base-ui/react";
import { useState } from "react";
import { TitleBar } from "@/components/ui/code";
import { TOKEN_COLORS, type Token } from "@/utils/snippet";

/**
 * A hand-highlighted block, framed like `Code` down to the copy button's
 * position, because a second style of code block on the same page would only be
 * a thing to look at twice.
 *
 * Lives here rather than beside one caller: the static preview and the
 * playground both render `buildUsage` output, and two copies of this would
 * drift the moment one of them gained a feature.
 */
export default function TokenBlock({
  tokens,
  className = "bc-border btw-1",
  expanded = false,
  title,
}: {
  tokens: Token[];
  /** The frame is the caller's, so a block under a tab strip adds no second rule. */
  className?: string;
  expanded?: boolean;
  /** Which file this belongs in. Same bar `Code` renders, for the same reason. */
  title?: string;
}) {
  return (
    <div className={`bg-surface ${className}`}>
      <TitleBar title={title} />
      {/* No copy button. This snippet is what the component looks like once it
          is in your project, and the thing that puts it there is the install
          command: pasting this first only buys an import of a file that does
          not exist yet. Install is one action, at the top of the page. */}
      <div>
        {/* Attributes sit on the element's own line now, so a component with
            several changed props makes a long one. Wrapping keeps all of it
            visible; a horizontal scrollbar would hide the closing tag. */}
        <pre className="ox-auto px-4 py-3 ff-m lh-5 ws-pw">
          <code>
            <Folded tokens={tokens} expanded={expanded} />
          </code>
        </pre>
      </div>
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
function Folded({
  tokens,
  expanded = false,
}: {
  tokens: Token[];
  expanded?: boolean;
}) {
  const [open, setOpen] = useState<string[]>(() =>
    expanded
      ? [
          ...new Set(
            tokens.flatMap((token) => (token.fold ? [token.fold] : [])),
          ),
        ]
      : [],
  );
  const output: React.ReactNode[] = [];

  const toggle = (region: string) =>
    setOpen((current) =>
      current.includes(region)
        ? current.filter((name) => name !== region)
        : [...current, region],
    );

  const write = (token: Token) => (
    <span key={token.id} style={{ color: TOKEN_COLORS[token.kind] }}>
      {token.text}
    </span>
  );

  for (let i = 0; i < tokens.length; i++) {
    const region = tokens[i].fold;

    if (!region) {
      output.push(write(tokens[i]));
      continue;
    }

    // Take the whole region in one go. Emitting the control per token is how it
    // turned into a row of ellipses, and it left no path that rendered the body.
    const body: Token[] = [];
    while (i < tokens.length && tokens[i].fold === region)
      body.push(tokens[i++]);
    i--;

    const isOpen = open.includes(region);

    // The control sits at the region's origin in both states, so whatever you
    // clicked to open is what you click to close. No frame and no fill: it is
    // punctuation that happens to be interactive.
    output.push(
      <Button
        key={`${region}-fold`}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Collapse" : "Expand"} ${region}`}
        onClick={() => toggle(region)}
        // A button does not inherit type, and `<code>` sets its own size, so
        // without this the ellipsis is a slightly different monospace at a
        // slightly different size from the code it sits inside.
        style={{ font: "inherit" }}
        className={`d-if p-0 bg-transparent bw-0 va-b c-p a-none fv:oo-2 fv:oc-accent ${
          isOpen ? "c-white/25 h:c-white/60" : "c-white/40 h:c-white"
        }`}
      >
        ...
      </Button>,
    );

    if (isOpen) for (const token of body) output.push(write(token));
  }

  return <>{output}</>;
}

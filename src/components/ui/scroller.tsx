"use client";

import { ScrollArea } from "@base-ui/react/scroll-area";
import type { CSSProperties, ReactNode, RefObject } from "react";

/**
 * A scrolling column with a scrollbar the site draws itself. The thumb fades
 * in on hover or while scrolling, so a sidebar at rest is the list rather than
 * the list plus a platform scrollbar.
 *
 * Two things this layout is working around. `className` styles a wrapper
 * rather than the scroll area's own root, because that root sets
 * `position: relative` inline and an inline style beats the `p-st` a sticky
 * sidebar needs. And every box down to the viewport is `f-1 min-h-0`, because
 * a viewport on `h-100%` under a parent that only has `max-height` resolves to
 * auto: it grows to its content and nothing ever scrolls.
 */
export default function Scroller({
  className = "",
  viewportClassName = "",
  style,
  viewportRef,
  children,
}: {
  className?: string;
  viewportClassName?: string;
  style?: CSSProperties;
  viewportRef?: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  return (
    <div className={`d-f fd-c ${className}`} style={style}>
      <ScrollArea.Root className="d-f f-1 fd-c min-h-0">
        <ScrollArea.Viewport
          ref={viewportRef}
          className={`f-1 min-h-0 ob-c fv:oc-accent fv:os-s fv:ow-2 fv:oo--2 ${viewportClassName}`}
        >
          {children}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="yui-scrollbar d-f w-1 py-1 jc-c"
        >
          <ScrollArea.Thumb className="w-100% br-9999 bg-white/20" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}

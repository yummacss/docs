"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { createPortal } from "react-dom";

const PlaygroundRailContext = createContext<HTMLElement | null>(null);
const SetPlaygroundRailContext = createContext<
  ((node: HTMLElement | null) => void) | null
>(null);

/**
 * Holds the right-rail mount node the docs shell renders for schema pages, so
 * `<ComponentPlayground>` can portal its props panel into the same column the
 * TOC used to occupy - rather than nesting a second sidebar inside the article.
 */
export function PlaygroundRailProvider({ children }: { children: ReactNode }) {
  const [rail, setRail] = useState<HTMLElement | null>(null);

  return (
    <SetPlaygroundRailContext.Provider value={setRail}>
      <PlaygroundRailContext.Provider value={rail}>
        {children}
      </PlaygroundRailContext.Provider>
    </SetPlaygroundRailContext.Provider>
  );
}

export function useSetPlaygroundRail() {
  return useContext(SetPlaygroundRailContext);
}

export function usePlaygroundRail() {
  return useContext(PlaygroundRailContext);
}

export function PlaygroundRailPortal({ children }: { children: ReactNode }) {
  const rail = usePlaygroundRail();
  if (!rail) return null;
  return createPortal(children, rail);
}

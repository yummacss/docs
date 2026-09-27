"use client";

import { useSyncExternalStore } from "react";

// Yumma's `@lg:` breakpoint.
const WIDE = "(min-width: 64rem)";

function subscribe(notify: () => void) {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

/** Whether the page is at `@lg:` or wider. The server renders the wide layout. */
export function useWide(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(WIDE).matches,
    () => true,
  );
}

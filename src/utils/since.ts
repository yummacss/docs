import { ver } from "./version";

// the minor the site is built against: a page is new while its `since` matches it
const MINOR = ver.split(".").slice(0, 2).join(".");

export function newIn(since?: string): string | undefined {
  return since === MINOR ? since : undefined;
}

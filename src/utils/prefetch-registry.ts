import type { ComponentType } from "react";
import { getRegistryImport, getRegistryMeta } from "@/registry";

type RegistryComponent = ComponentType<Record<string, unknown>>;

const resolved = new Map<string, RegistryComponent>();
const pending = new Map<string, Promise<RegistryComponent | null>>();

/** Resolved module if it has already been loaded (sync hot path after prefetch). */
export function getCachedRegistryComponent(
  id: string,
): RegistryComponent | null {
  return resolved.get(id) ?? null;
}

/** Load a registry component, caching the promise and the resolved export. */
export function loadRegistryComponent(
  id: string,
): Promise<RegistryComponent | null> {
  const cached = resolved.get(id);
  if (cached) return Promise.resolve(cached);

  const inFlight = pending.get(id);
  if (inFlight) return inFlight;

  const importFn = getRegistryImport(id);
  if (!importFn) return Promise.resolve(null);

  const request = importFn()
    .then((module) => {
      const component = module.default as RegistryComponent;
      resolved.set(id, component);
      pending.delete(id);
      return component;
    })
    .catch((error) => {
      pending.delete(id);
      throw error;
    });

  pending.set(id, request);
  return request;
}

/** Warm the registry chunk and meta JSON without waiting. */
export function prefetchRegistry(id: string) {
  void loadRegistryComponent(id);
  void getRegistryMeta(id)?.();
}

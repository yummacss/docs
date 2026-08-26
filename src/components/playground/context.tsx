"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getRegistryMeta, type RegistryMeta } from "@/registry";
import { type DemoProps, seedValues } from "@/utils/demo";
import { prefetchRegistry } from "@/utils/prefetch-registry";

/** Playground state shared between stage (MDX) and rail (layout column). */
interface Playground {
  id: string;
  meta: RegistryMeta | null;
  values: DemoProps;
  setValue: (name: string, value: unknown) => void;
  reset: () => void;
  /** Whether anything has been touched, so the reset control can say so. */
    dirty: boolean;
}

const PlaygroundContext = createContext<Playground | null>(null);

/** Null on a page that has no playground, which the rail treats as its cue. */
export function usePlayground(): Playground | null {
  return useContext(PlaygroundContext);
}

interface Seed {
  meta: RegistryMeta | null;
  values: DemoProps;
}

const EMPTY: Seed = { meta: null, values: {} };

export function PlaygroundProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  // Meta and values stay in one state so the stage never sees a schema
  // without its seeded fixtures (options/items/steps).
  const [seed, setSeed] = useState<Seed>(EMPTY);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const importMeta = getRegistryMeta(id);
    if (!importMeta) {
      setSeed(EMPTY);
      setDirty(false);
      return;
    }

    // Drop the outgoing schema; the stage keeps its last visual frame.
    setSeed(EMPTY);
    setDirty(false);
    prefetchRegistry(id);

    let live = true;
    importMeta().then((module) => {
      if (!live) return;
      const meta = module.default;
      setSeed({ meta, values: seedValues(meta) });
      setDirty(false);
    });

    return () => {
      live = false;
    };
  }, [id]);

  const setValue = useCallback((name: string, value: unknown) => {
    setSeed((current) => ({
      ...current,
      values: { ...current.values, [name]: value },
    }));
    setDirty(true);
  }, []);

  const reset = useCallback(() => {
    setSeed((current) => {
      if (!current.meta) return current;
      return { meta: current.meta, values: seedValues(current.meta) };
    });
    setDirty(false);
  }, []);

  const playground = useMemo(
    () => ({
      id,
      meta: seed.meta,
      values: seed.values,
      setValue,
      reset,
      dirty,
    }),
    [id, seed.meta, seed.values, setValue, reset, dirty],
  );

  return <PlaygroundContext value={playground}>{children}</PlaygroundContext>;
}

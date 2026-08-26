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

export function PlaygroundProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const [meta, setMeta] = useState<RegistryMeta | null>(null);
  const [values, setValues] = useState<DemoProps>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const importMeta = getRegistryMeta(id);
    if (!importMeta) {
      setMeta(null);
      setValues({});
      setDirty(false);
      return;
    }

    // Clear controls for the outgoing id; the stage keeps the last visual frame.
    setMeta(null);
    setValues({});
    setDirty(false);
    prefetchRegistry(id);

    let live = true;
    importMeta().then((module) => {
      if (!live) return;
      setMeta(module.default);
      setValues(seedValues(module.default));
      setDirty(false);
    });

    return () => {
      live = false;
    };
  }, [id]);

  const setValue = useCallback((name: string, value: unknown) => {
    setValues((current) => ({ ...current, [name]: value }));
    setDirty(true);
  }, []);

  const reset = useCallback(() => {
    if (!meta) return;
    setValues(seedValues(meta));
    setDirty(false);
  }, [meta]);

  const playground = useMemo(
    () => ({ id, meta, values, setValue, reset, dirty }),
    [id, meta, values, setValue, reset, dirty],
  );

  return <PlaygroundContext value={playground}>{children}</PlaygroundContext>;
}

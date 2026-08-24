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

/**
 * One playground per page, owned by the route.
 *
 * The stage sits inside the MDX and the controls sit in the page's third
 * column, which are different subtrees, so the state that joins them lives
 * above both. Driving it from the slug rather than from a prop on the stage
 * means the two can never disagree about which component is on the page.
 */
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
    if (!importMeta) return;

    let live = true;
    importMeta().then((module) => {
      if (!live) return;
      setMeta(module.default);
      setValues(seedValues(module.default));
      setDirty(false);
    });

    // A navigation between two component pages resolves both imports, and
    // without this the slower one would overwrite the page you are now on.
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

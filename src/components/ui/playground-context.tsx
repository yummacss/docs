"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getRegistryMeta, type RegistryMeta } from "@/registry";

export type PropValue = string | boolean | number;
export type PropValues = Record<string, PropValue>;

interface Playground {
  registryId: string | null;
  meta: RegistryMeta | null;
  values: PropValues;
  setValue: (name: string, value: PropValue) => void;
  /** Called by the stage to say which component the panel is describing. */
  register: (registryId: string | null) => void;
}

const PlaygroundContext = createContext<Playground | null>(null);

/**
 * One state, two subtrees.
 *
 * The stage renders inside the page's MDX & the props panel renders in the
 * column the table of contents used to hold, so they are siblings in the layout
 * with no component between them to lift state into. The provider sits above
 * both instead. Loading the schema here rather than in the stage is what lets
 * the panel render before, or without, a preview.
 */
export function PlaygroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [registryId, setRegistryId] = useState<string | null>(null);
  const [meta, setMeta] = useState<RegistryMeta | null>(null);
  const [values, setValues] = useState<PropValues>({});

  useEffect(() => {
    if (!registryId) {
      setMeta(null);
      setValues({});
      return;
    }

    const importMeta = getRegistryMeta(registryId);
    if (!importMeta) {
      setMeta(null);
      setValues({});
      return;
    }

    // A route change can resolve the outgoing page's schema after the incoming
    // one, which would leave the panel describing the component you just left.
    let current = true;
    importMeta().then((module) => {
      if (!current) return;
      const loaded = module.default;

      // Start from the component's own defaults so the first render is the
      // component as it ships, not an arbitrary configuration. `example` covers
      // the props it cannot default, like the image an Avatar has to be given.
      const initial: PropValues = {};
      for (const prop of loaded.props) {
        const start = prop.example ?? prop.default;
        if (start !== undefined) initial[prop.name] = start;
      }

      setMeta(loaded);
      setValues(initial);
    });

    return () => {
      current = false;
    };
  }, [registryId]);

  const setValue = useCallback((name: string, value: PropValue) => {
    setValues((current) => ({ ...current, [name]: value }));
  }, []);

  const register = useCallback((next: string | null) => {
    setRegistryId(next);
  }, []);

  const value = useMemo(
    () => ({ registryId, meta, values, setValue, register }),
    [registryId, meta, values, setValue, register],
  );

  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground(): Playground {
  const context = useContext(PlaygroundContext);
  if (!context) {
    throw new Error("usePlayground must be used inside a PlaygroundProvider");
  }
  return context;
}

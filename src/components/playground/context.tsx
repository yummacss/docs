"use client";

import { useQueryStates } from "nuqs";
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
import { DEFAULT_ACCENT, readAccent, writeAccent } from "@/utils/accent";
import { type DemoProps, exampleIcon, seedValues } from "@/utils/demo";
import { applyQuery, keyMapFor, queryFor } from "@/utils/playground-url";
import { prefetchRegistry } from "@/utils/prefetch-registry";
import { isInert } from "@/utils/props";
import {
  carriedFor,
  clearCarried,
  readCarried,
  writeCarried,
} from "@/utils/sticky";

interface Playground {
  id: string;
  meta: RegistryMeta | null;
  values: DemoProps;
  setValue: (name: string, value: unknown) => void;
  carried: boolean;
  reset: () => void;
  accent: string;
  setAccent: (family: string) => void;
}

const PlaygroundContext = createContext<Playground | null>(null);

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
  const [seed, setSeed] = useState<Seed>(EMPTY);
  const [carried, setCarried] = useState(false);
  const [accent, setAccentState] = useState(DEFAULT_ACCENT);

  useEffect(() => setAccentState(readAccent()), []);

  const setAccent = useCallback((family: string) => {
    setAccentState(family);
    writeAccent(family);
  }, []);

  useEffect(() => {
    const importMeta = getRegistryMeta(id);
    if (!importMeta) {
      setSeed(EMPTY);
      return;
    }

    setSeed(EMPTY);
    prefetchRegistry(id);

    let live = true;
    importMeta().then((module) => {
      if (!live) return;
      setSeed({ meta: module.default, values: seedValues(module.default) });
    });

    return () => {
      live = false;
    };
  }, [id]);

  const keyMap = useMemo(
    () => (seed.meta ? keyMapFor(seed.meta, seed.values) : {}),
    [seed.meta, seed.values],
  );

  const [query, setQuery] = useQueryStates(keyMap, {
    history: "replace",
    clearOnDefault: true,
    shallow: true,
  });

  const values = useMemo(
    () =>
      seed.meta
        ? applyQuery(seed.meta, query, seed.values, exampleIcon)
        : seed.values,
    [seed.meta, seed.values, query],
  );

  useEffect(() => {
    if (!seed.meta) return;
    const named = new URLSearchParams(window.location.search);
    const pending = carriedFor(seed.meta, readCarried(), (name) =>
      named.has(name),
    );
    if (Object.keys(pending).length > 0) {
      setCarried(true);
      setQuery(pending);
    }
  }, [seed.meta, setQuery]);

  const setValue = useCallback(
    (name: string, value: unknown) => {
      const meta = seed.meta;
      if (!meta) return;

      const next = { ...values, [name]: value };

      const prop = meta.props.find((entry) => entry.name === name);
      const needs = prop?.dependsOn
        ? meta.props.find((entry) => entry.name === prop.dependsOn)
        : undefined;

      if (needs?.exampleIcon && !values[needs.name]) {
        next[needs.name] = exampleIcon(needs.exampleIcon);
      }

      for (const entry of meta.props) {
        if (entry.name === name) continue;
        if (!isInert(entry, next, meta.props)) continue;
        if (entry.type === "boolean") next[entry.name] = false;
        else if (entry.default !== undefined) next[entry.name] = entry.default;
      }

      writeCarried(next);
      setQuery(queryFor(meta, next));
    },
    [seed.meta, values, setQuery],
  );

  const reset = useCallback(() => {
    clearCarried();
    setCarried(false);
    if (seed.meta) setQuery(queryFor(seed.meta, seed.values));
  }, [seed.meta, seed.values, setQuery]);

  const playground = useMemo(
    () => ({
      id,
      meta: seed.meta,
      values,
      setValue,
      carried,
      reset,
      accent,
      setAccent,
    }),
    [id, seed.meta, values, setValue, carried, reset, accent, setAccent],
  );

  return <PlaygroundContext value={playground}>{children}</PlaygroundContext>;
}

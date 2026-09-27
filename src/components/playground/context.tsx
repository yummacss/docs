"use client";

import { parseAsStringLiteral, useQueryStates } from "nuqs";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getRegistryMeta, type RegistryMeta } from "@/registry";
import { DEFAULT_ACCENT, readAccent, writeAccent } from "@/utils/accent";
import { type DemoProps, exampleIcon, seedValues } from "@/utils/demo";
import { applyQuery, keyMapFor, queryFor } from "@/utils/playground-url";
import { prefetchRegistry } from "@/utils/prefetch-registry";
import { isInert } from "@/utils/props";
import { carriedFor, readCarried, writeCarried } from "@/utils/sticky";
import {
  DEFAULT_STYLE,
  nearestRadius,
  RADIUS,
  STYLES,
} from "@/utils/styles.mjs";

const SPECS: Record<string, { radius: string }> = STYLES;
const STYLE_IDS = Object.keys(STYLES) as [string, ...string[]];
const STYLE_KEYS = {
  style: parseAsStringLiteral(STYLE_IDS).withDefault(DEFAULT_STYLE),
  radius: parseAsStringLiteral(RADIUS as [string, ...string[]]),
};
const STYLE_STORE = "yui:style";
const PANEL_STORE = "yui:panel";

function readStyle(): { style?: string; radius?: string } {
  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem(STYLE_STORE) ?? "null",
    );
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

interface Playground {
  id: string;
  meta: RegistryMeta | null;
  values: DemoProps;
  setValue: (name: string, value: unknown) => void;
  accent: string;
  setAccent: (family: string) => void;
  style: string;
  radius: string;
  setStyle: (style: string) => void;
  setRadius: (radius: string) => void;
  panel: boolean;
  setPanel: (open: boolean) => void;
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
  const [accent, setAccentState] = useState(DEFAULT_ACCENT);

  useEffect(() => setAccentState(readAccent()), []);

  const [panel, setPanelState] = useState(true);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(PANEL_STORE) === "closed") {
        setPanelState(false);
      }
    } catch {}
  }, []);

  const setPanel = useCallback((open: boolean) => {
    setPanelState(open);
    try {
      window.localStorage.setItem(PANEL_STORE, open ? "open" : "closed");
    } catch {}
  }, []);

  const setAccent = useCallback((family: string) => {
    setAccentState(family);
    writeAccent(family);
  }, []);

  const [styleQuery, setStyleQuery] = useQueryStates(STYLE_KEYS, {
    history: "replace",
    clearOnDefault: true,
    shallow: true,
  });
  const style = styleQuery.style;
  const radius = nearestRadius(style, styleQuery.radius ?? SPECS[style].radius);

  const commitStyle = useCallback(
    (next: string, step: string) => {
      const resolved = nearestRadius(next, step);
      const radiusParam = resolved === SPECS[next].radius ? null : resolved;
      setStyleQuery({ style: next, radius: radiusParam });
      try {
        window.localStorage.setItem(
          STYLE_STORE,
          JSON.stringify({ style: next, radius: resolved }),
        );
      } catch {}
    },
    [setStyleQuery],
  );

  // the address wins; otherwise the style carried from the last page
  const arrived = useRef(false);
  useEffect(() => {
    if (arrived.current) return;
    arrived.current = true;
    const named = new URLSearchParams(window.location.search);
    if (named.has("style") || named.has("radius")) {
      if (styleQuery.radius && styleQuery.radius !== radius) {
        commitStyle(style, radius);
      }
      return;
    }
    const stored = readStyle();
    if (stored.style && stored.style in SPECS) {
      commitStyle(stored.style, stored.radius ?? SPECS[stored.style].radius);
    }
  }, [commitStyle, style, radius, styleQuery.radius]);

  const setStyle = useCallback(
    (next: string) => commitStyle(next, SPECS[next].radius),
    [commitStyle],
  );
  const setRadius = useCallback(
    (step: string) => commitStyle(style, step),
    [commitStyle, style],
  );

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
    if (Object.keys(pending).length > 0) setQuery(pending);
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

  const playground = useMemo(
    () => ({
      id,
      meta: seed.meta,
      values,
      setValue,
      accent,
      setAccent,
      style,
      radius,
      setStyle,
      setRadius,
      panel,
      setPanel,
    }),
    [
      id,
      seed.meta,
      values,
      setValue,
      accent,
      setAccent,
      style,
      radius,
      setStyle,
      setRadius,
      panel,
      setPanel,
    ],
  );

  return <PlaygroundContext value={playground}>{children}</PlaygroundContext>;
}

"use client";

import { Button } from "@base-ui/react";
import { Field } from "@base-ui/react/field";
import { NumberField } from "@base-ui/react/number-field";
import { Select } from "@base-ui/react/select";
import { Switch } from "@base-ui/react/switch";
import {
  BellNotification,
  Bookmark,
  Check,
  Folder,
  HalfMoon,
  Mail,
  NavArrowDown,
  Page,
  PagePlus,
  PageSearch,
  Refresh,
  Star,
  StatUp,
  SunLight,
  Trash,
  User,
  Wrench,
} from "iconoir-react";
import type { ComponentType } from "react";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { TokenBlock } from "@/components/token-block";
import {
  getRegistryImport,
  getRegistryMeta,
  getRegistryTarget,
  type RegistryMeta,
  type RegistryProp,
} from "@/registry";
import { describe } from "@/utils/describe";
import { buildUsage, iconMarker, type Token } from "@/utils/snippet";

type DemoProps = Record<string, unknown>;

const EXAMPLE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  BellNotification,
  Bookmark,
  Check,
  Folder,
  HalfMoon,
  Mail,
  Page,
  PagePlus,
  PageSearch,
  Star,
  StatUp,
  SunLight,
  Trash,
  User,
  Wrench,
};

function resolveIcons(value: unknown): unknown {
  const marker = iconMarker(value);
  if (marker) {
    const Icon = EXAMPLE_ICONS[marker.name];
    return Icon ? <Icon className={marker.size ?? "w-6 h-6"} /> : undefined;
  }
  if (Array.isArray(value)) return value.map(resolveIcons);
  if (typeof value === "object" && value !== null) {
    if ("$$typeof" in value) return value;
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveIcons(item)]),
    );
  }
  return value;
}

function isPlayable(prop: RegistryProp): boolean {
  return (
    prop.type === "enum" ||
    prop.type === "boolean" ||
    prop.type === "string" ||
    prop.type === "number"
  );
}

/**
 * Seeds the playground the same way `<ComponentPreview>` seeds its demo:
 * `example` wins over `default`, icons resolve from `exampleIcon`.
 */
function seedFromMeta(meta: RegistryMeta): {
  playable: DemoProps;
  fixedRaw: DemoProps;
  fixedResolved: DemoProps;
} {
  const playable: DemoProps = {};
  const fixedRaw: DemoProps = {};
  const fixedResolved: DemoProps = {};

  for (const prop of meta.props) {
    if (isPlayable(prop)) {
      if (prop.type === "boolean") {
        playable[prop.name] = prop.default ?? prop.example ?? false;
      } else if (prop.type === "number") {
        playable[prop.name] = prop.default ?? prop.example ?? 0;
      } else if (prop.type === "string") {
        playable[prop.name] = prop.default ?? prop.example ?? "";
      } else {
        const value = prop.example ?? prop.default;
        if (value !== undefined) playable[prop.name] = value;
      }
      continue;
    }

    if (prop.exampleIcon) {
      const Icon = EXAMPLE_ICONS[prop.exampleIcon];
      if (Icon) {
        const element = <Icon className="w-5 h-5" />;
        fixedRaw[prop.name] = element;
        fixedResolved[prop.name] = element;
      }
      continue;
    }

    const value = prop.example ?? prop.default;
    if (value !== undefined) {
      fixedRaw[prop.name] = value;
      fixedResolved[prop.name] = resolveIcons(value);
    }
  }

  return { playable, fixedRaw, fixedResolved };
}

export default function ComponentPlayground({
  registryId,
}: {
  registryId: string;
}) {
  const [RegistryComponent, setRegistryComponent] =
    useState<ComponentType<DemoProps> | null>(null);
  const [meta, setMeta] = useState<RegistryMeta | null>(null);
  const [seed, setSeed] = useState<DemoProps>({});
  const [values, setValues] = useState<DemoProps>({});
  const [fixedRaw, setFixedRaw] = useState<DemoProps>({});
  const [fixedResolved, setFixedResolved] = useState<DemoProps>({});
  const [openDesc, setOpenDesc] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMeta(null);
    setRegistryComponent(null);
    setSeed({});
    setValues({});
    setFixedRaw({});
    setFixedResolved({});
    setOpenDesc(new Set());

    const importFn = getRegistryImport(registryId);
    if (importFn) setRegistryComponent(() => lazy(importFn));

    const importMeta = getRegistryMeta(registryId);
    if (!importMeta) return;

    importMeta().then((module) => {
      const next = module.default;
      const {
        playable,
        fixedRaw: raw,
        fixedResolved: resolved,
      } = seedFromMeta(next);
      setMeta(next);
      setSeed(playable);
      setValues(playable);
      setFixedRaw(raw);
      setFixedResolved(resolved);
    });
  }, [registryId]);

  const setProp = useCallback((name: string, value: unknown) => {
    setValues((current) => ({ ...current, [name]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(seed);
  }, [seed]);

  const toggleDesc = useCallback((name: string) => {
    setOpenDesc((current) => {
      const next = new Set(current);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const demoProps = useMemo(
    () => ({ ...fixedResolved, ...values }),
    [fixedResolved, values],
  );

  const usage: Token[] | null = useMemo(() => {
    if (!meta) return null;
    const target = getRegistryTarget(registryId);
    return buildUsage(target.component, meta, { ...fixedRaw, ...values });
  }, [registryId, meta, fixedRaw, values]);

  const playableProps = meta?.props.filter(isPlayable) ?? [];
  const fixedProps = meta?.props.filter((prop) => !isPlayable(prop)) ?? [];

  return (
    <div className="d-f fd-c @lg:fd-r g-8 mb-6">
      <div className="f-1 min-w-0">
        <div className="bc-border bw-1">
          <Suspense fallback={null}>
            {RegistryComponent ? (
              <div
                data-preview
                className="d-f p-r ox-auto ai-c jc-c p-10 bg-white"
              >
                <RegistryComponent {...demoProps}>
                  {meta?.children}
                </RegistryComponent>
              </div>
            ) : null}
          </Suspense>
          {usage && <TokenBlock tokens={usage} title="page.tsx" />}
        </div>
      </div>

      <aside className="w-100% @lg:w-72 fs-0">
        <div
          className="d-f fd-c g-0 bc-border bw-1 bg-page @lg:p-st @lg:t-20"
          style={{ maxHeight: "calc(100dvh - 5rem)" }}
        >
          <div className="d-f ai-c jc-sb g-3 px-4 py-3 bbw-1 bc-border">
            <h2 className="m-0 c-white fs-sm fw-500 ls-1 tt-u">Props</h2>
            <Button
              type="button"
              onClick={reset}
              aria-label="Reset props"
              className="d-f ai-c g-1 px-2 py-1 bg-transparent bw-0 c-accent fs-xs us-none h:c-accent-4 fv:oc-white fv:ow-2"
            >
              <Refresh className="w-3 h-3" />
              Reset
            </Button>
          </div>

          <div className="oy-auto ob-c px-4 py-3">
            <ul className="d-f fd-c g-4 m-0 p-0">
              {playableProps.map((prop) => (
                <li key={prop.name} className="d-f fd-c g-2">
                  <PropRow
                    prop={prop}
                    value={values[prop.name]}
                    open={openDesc.has(prop.name)}
                    onToggle={() => toggleDesc(prop.name)}
                    onChange={(value) => setProp(prop.name, value)}
                  />
                </li>
              ))}
            </ul>

            {fixedProps.length > 0 && (
              <>
                <div className="d-f ai-c g-3 mt-6 mb-4">
                  <div className="f-1 bbw-1 bc-border" />
                  <span className="c-silver-8 fs-xs ls-2 tt-u ws-nw">
                    Not controllable
                  </span>
                  <div className="f-1 bbw-1 bc-border" />
                </div>
                <ul className="d-f fd-c g-4 m-0 p-0">
                  {fixedProps.map((prop) => (
                    <li key={prop.name} className="d-f fd-c g-2">
                      <PropRow
                        prop={prop}
                        value={undefined}
                        open={openDesc.has(prop.name)}
                        onToggle={() => toggleDesc(prop.name)}
                        onChange={() => {}}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

function PropRow({
  prop,
  value,
  open,
  onToggle,
  onChange,
}: {
  prop: RegistryProp;
  value: unknown;
  open: boolean;
  onToggle: () => void;
  onChange: (value: unknown) => void;
}) {
  const hasDescription = Boolean(prop.description);

  return (
    <>
      <div className="d-f ai-c jc-sb g-3">
        {hasDescription ? (
          <Button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            className="d-f ai-c g-1 p-0 bg-transparent bw-0 c-p ta-l fv:oc-white fv:ow-2"
          >
            <NavArrowDown
              className={`fs-0 w-3 h-3 c-white/40 tp-c tdu-150 ${open ? "ro-36" : ""}`}
              aria-hidden
            />
            <code className="c-code fs-sm ff-m">{prop.name}</code>
          </Button>
        ) : (
          <code className="c-code fs-sm ff-m">{prop.name}</code>
        )}
        <PropWidget prop={prop} value={value} onChange={onChange} />
      </div>
      {open && prop.description && (
        <div className="pl-4 c-white/70 fs-sm lh-5">
          {describe(prop.description)}
        </div>
      )}
    </>
  );
}

function PropWidget({
  prop,
  value,
  onChange,
}: {
  prop: RegistryProp;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const id = useId();

  if (prop.type === "none") {
    return (
      <code className="c-white/30 fs-xs ff-m ws-nw">
        {prop.typeName ?? "none"}
      </code>
    );
  }

  if (prop.type === "boolean") {
    const checked = Boolean(value);
    return (
      <Switch.Root
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className={`p-r d-f ai-c fs-0 w-8 h-4 px-1 br-9999 bw-0 tp-c tdu-150 ttf-io c-p fv:oc-white fv:ow-2 ${
          checked ? "bg-accent-dim" : "bg-border"
        }`}
      >
        <Switch.Thumb
          className={`w-3 h-3 br-9999 bg-white tp-t tdu-150 ttf-io ${
            checked ? "ml-3" : "ml-0"
          }`}
        />
      </Switch.Root>
    );
  }

  if (prop.type === "enum" && prop.values) {
    if (prop.values.length <= 3) {
      return (
        <div className="d-f ai-c g-0 bc-border bw-1 br-md o-h">
          {prop.values.map((option) => {
            const active = value === option;
            return (
              <Button
                key={option}
                type="button"
                onClick={() => onChange(option)}
                aria-pressed={active}
                className={`px-2 py-1 bw-0 fs-xs ff-m us-none fv:oc-white fv:ow-2 ${
                  active
                    ? "bg-surface c-accent"
                    : "bg-transparent c-white/60 h:c-white"
                }`}
              >
                {option}
              </Button>
            );
          })}
        </div>
      );
    }

    return (
      <Select.Root
        value={typeof value === "string" ? value : null}
        onValueChange={(next) => {
          if (typeof next === "string") onChange(next);
        }}
      >
        <Select.Trigger
          id={id}
          className="d-f ai-c jc-sb g-2 pl-2 pr-2 py-1 bg-surface bc-border c-white bw-1 br-md fs-xs ff-m us-none c-p fv:oc-white fv:ow-2"
        >
          <Select.Value />
          <Select.Icon className="d-f c-white/40">
            <NavArrowDown className="w-3 h-3" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner sideOffset={4} className="zi-10">
            <Select.Popup className="o-h py-1 bg-surface bc-border bw-1 br-md">
              <Select.List>
                {prop.values.map((option) => (
                  <Select.Item
                    key={option}
                    value={option}
                    className={(state) =>
                      `d-f ai-c g-2 px-3 py-1 mx-1 br-md fs-xs ff-m us-none c-p ${
                        state.highlighted
                          ? "bg-white/8 c-white"
                          : "bg-transparent c-white/70"
                      }`
                    }
                  >
                    <Select.ItemText>{option}</Select.ItemText>
                    <Select.ItemIndicator className="d-f c-accent">
                      <Check className="w-3 h-3" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    );
  }

  if (prop.type === "number") {
    return (
      <NumberField.Root
        id={id}
        value={typeof value === "number" ? value : null}
        onValueChange={(next) => {
          if (typeof next === "number") onChange(next);
        }}
        className="d-f ai-c"
      >
        <NumberField.Input className="w-16 px-2 py-1 bg-surface bc-border c-white bw-1 br-md fs-xs ff-m fv:oc-white fv:ow-2" />
      </NumberField.Root>
    );
  }

  return (
    <Field.Root className="d-f">
      <Field.Control
        id={id}
        value={typeof value === "string" ? value : ""}
        onValueChange={onChange}
        placeholder={prop.name === "className" ? "e.g. mt-4" : undefined}
        className="w-28 px-2 py-1 bg-surface bc-border c-white bw-1 br-md fs-xs ff-m fv:oc-white fv:ow-2"
      />
    </Field.Root>
  );
}

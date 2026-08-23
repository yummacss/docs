"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type ComponentType,
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_PLAYGROUND_ID, PLAYGROUND_IDS } from "@/config/playground";
import {
  getRegistryImport,
  getRegistryMeta,
  type RegistryMeta,
} from "@/registry";
import { EXAMPLE_ICONS, resolveIcons } from "@/utils/example-icons";
import CodePanel from "./code-panel";
import ComponentList from "./component-list";
import ControlPanel from "./control-panel";

type DemoProps = Record<string, unknown>;

function resolveInitialId(param: string | null): string {
  if (param && PLAYGROUND_IDS.includes(param)) return param;
  return DEFAULT_PLAYGROUND_ID;
}

/**
 * Every prop, split into what a control drives and what stays fixed at the
 * schema's example, exactly the split `<ComponentPreview>` makes - only here
 * the flat half is live state instead of a one-time fixture.
 */
function splitProps(meta: RegistryMeta): {
  editable: DemoProps;
  fixed: DemoProps;
} {
  const editable: DemoProps = {};
  const fixed: DemoProps = {};

  for (const prop of meta.props) {
    if (
      prop.type === "enum" ||
      prop.type === "boolean" ||
      prop.type === "string" ||
      prop.type === "number"
    ) {
      const fallback = prop.type === "boolean" ? false : "";
      editable[prop.name] = prop.default ?? prop.example ?? fallback;
      continue;
    }

    if (prop.exampleIcon) {
      const Icon = EXAMPLE_ICONS[prop.exampleIcon];
      if (Icon) fixed[prop.name] = <Icon className="w-4 h-4" />;
      continue;
    }

    if (prop.example !== undefined) {
      fixed[prop.name] = resolveIcons(prop.example);
    }
  }

  return { editable, fixed };
}

export default function Playground() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedId, setSelectedId] = useState(() =>
    resolveInitialId(searchParams.get("component")),
  );
  const [meta, setMeta] = useState<RegistryMeta | null>(null);
  const [RegistryComponent, setRegistryComponent] =
    useState<ComponentType<DemoProps> | null>(null);
  const [fixedProps, setFixedProps] = useState<DemoProps>({});
  const [values, setValues] = useState<DemoProps>({});

  useEffect(() => {
    setMeta(null);
    setRegistryComponent(null);
    setFixedProps({});
    setValues({});

    const importComponent = getRegistryImport(selectedId);
    if (importComponent) setRegistryComponent(() => lazy(importComponent));

    const importMeta = getRegistryMeta(selectedId);
    if (!importMeta) return;

    importMeta().then((module) => {
      const nextMeta = module.default;
      const { editable, fixed } = splitProps(nextMeta);
      setMeta(nextMeta);
      setValues(editable);
      setFixedProps(fixed);
    });
  }, [selectedId]);

  const select = (id: string) => {
    setSelectedId(id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("component", id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const mergedProps = useMemo(
    () => ({ ...fixedProps, ...values }),
    [fixedProps, values],
  );

  return (
    <div className="d-f fd-c @lg:fd-r bw-1 bc-border h-auto @lg:h-160">
      <ComponentList selectedId={selectedId} onSelect={select} />

      <div className="d-f fd-c f-1 min-w-0">
        <div className="d-f f-1 ai-c jc-c ox-auto oy-auto p-10 bg-white">
          <Suspense fallback={null}>
            {RegistryComponent && (
              <RegistryComponent {...mergedProps}>
                {meta?.children}
              </RegistryComponent>
            )}
          </Suspense>
        </div>

        <CodePanel id={selectedId} meta={meta} values={mergedProps} />
      </div>

      <ControlPanel
        id={selectedId}
        meta={meta}
        values={values}
        onChange={(name, value) =>
          setValues((current) => ({ ...current, [name]: value }))
        }
      />
    </div>
  );
}

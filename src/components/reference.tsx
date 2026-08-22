"use client";

import { Button, Input } from "@base-ui/react";
import { Accordion } from "@base-ui/react/accordion";
import { Plus, Search } from "iconoir-react";
import { useMemo, useState } from "react";
import {
  type Category,
  categoryGetters,
  describeValues,
  getVariants,
  resolveScale,
  type Scale,
  summarizeClasses,
  type VariantEntry,
} from "../utils/yummacss";
import { Tabs, TabsList, TabsPanel, TabsTab } from "./tabs";

interface Props {
  category: Category;
  name: string;
  /**
   * Whether the utility takes negative values. Not derivable: `@yummacss/core`
   * carries no negative keys, so this stays authored per slot until v4 moves
   * it into the definitions.
   */
  negative?: boolean;
}

const DEFAULT_ACCORDION_VALUE = ["reference-item"];
const DIM = { color: "#b9bed5" } as const;

interface Row {
  className: string;
  declarations: string[];
}

function Rows({ rows, empty }: { rows: Row[]; empty?: string }) {
  if (rows.length === 0) {
    return <div className="py-2 c-white/40 fs-xs ta-c">{empty}</div>;
  }

  return (
    <div className="d-f fd-c g-1">
      {rows.map((row, index) => (
        <div
          key={row.className}
          className={`d-f ai-c jc-sb g-4 py-2 px-0 ${
            index < rows.length - 1 ? "bbw-1 bc-border" : ""
          }`}
        >
          <code className="c-code fs-sm ws-nw">{row.className}</code>
          <div className="d-f fd-c ai-fe">
            {row.declarations.map((declaration) => (
              <code key={declaration} className="fs-xs ta-r" style={DIM}>
                {declaration}
              </code>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * A contiguous scale stated as its rule, with a box to resolve any point on it.
 *
 * 385 rows of `m-0` through `m-384` is a multiplication table, and the reader
 * who wants to know whether `m-23` exists will not scroll to find out. The
 * rule answers that in one line & the box proves it.
 */
function ScaleRule({
  prefix,
  scale,
  properties,
}: {
  prefix: string;
  scale: Scale;
  properties: readonly string[];
}) {
  const [probe, setProbe] = useState("");
  const parsed = Number(probe);
  const resolved =
    probe.trim() === "" || !Number.isFinite(parsed)
      ? null
      : resolveScale(scale, parsed);

  return (
    <div className="mb-3 p-3 bc-border bg-page bw-1">
      <div className="d-f ai-c jc-sb g-4 fw-w">
        <code className="c-code fs-sm">
          {prefix}-&lt;{scale.min}…{scale.max}&gt;
        </code>
        <code className="fs-xs" style={DIM}>
          {properties.join(", ")}: n × {scale.step}
          {";"}
        </code>
      </div>

      <div className="d-f ai-c g-2 mt-3 pt-3 btw-1 bc-border fw-w">
        <span className="c-white/50 fs-xs">Any value:</span>
        <Input
          type="number"
          min={scale.min}
          max={scale.max}
          value={probe}
          placeholder="23"
          onChange={(e) => setProbe(e.target.value)}
          className="w-16 px-2 py-1 bc-border bg-surface c-white bw-1 fs-sm"
        />
        {resolved ? (
          <>
            <code className="c-code fs-sm">
              {prefix}-{probe}
            </code>
            <code className="fs-xs" style={DIM}>
              {properties.map((p) => `${p}: ${resolved};`).join(" ")}
            </code>
          </>
        ) : (
          <span className="c-white/40 fs-xs">
            {probe.trim() === ""
              ? `Every whole number from ${scale.min} to ${scale.max}.`
              : `Outside ${scale.min}–${scale.max}.`}
          </span>
        )}
      </div>
    </div>
  );
}

function VariantRows({
  entries,
  className,
  wrap,
}: {
  entries: VariantEntry[];
  className: string;
  wrap: (prefix: string) => string;
}) {
  return (
    <Rows
      rows={entries.map((entry) => ({
        className: wrap(entry.prefix),
        declarations: [entry.value],
      }))}
      empty={`No variants apply to ${className}.`}
    />
  );
}

export default function Reference({ category, name, negative }: Props) {
  const [search, setSearch] = useState("");

  const util = useMemo(() => {
    try {
      if (!category || !name) return null;
      const getter = categoryGetters[category];
      if (!getter) return null;
      return getter()[name] ?? null;
    } catch (err) {
      console.error("Failed to get utility:", err);
      return null;
    }
  }, [category, name]);

  const shape = useMemo(() => describeValues(category, name), [category, name]);
  const variants = useMemo(() => getVariants(category, name), [category, name]);
  const summary = useMemo(
    () => summarizeClasses(category, name),
    [category, name],
  );

  if (!util) {
    return (
      <div className="p-4 mb-6 bg-surface c-white/60 ta-c">
        Something went wrong while fetching the data.
      </div>
    );
  }

  const prefix = util.prefix;
  const properties = util.properties;
  const cls = (value: string) => (value === "" ? prefix : `${prefix}-${value}`);
  const declare = (value: string) => properties.map((p) => `${p}: ${value};`);

  // The scale is a rule rather than rows, so only what is left gets listed.
  const listed = [...shape.sparse, ...shape.named].map((value) => ({
    className: cls(value),
    declarations: declare(util.values[value] as string),
  }));

  const total = Object.keys(util.values).length;
  const query = search.trim().toLowerCase();
  const filtered = query
    ? listed.filter(
        (row) =>
          row.className.toLowerCase().includes(query) ||
          row.declarations.some((d) => d.toLowerCase().includes(query)),
      )
    : listed;

  // Searching a point on the scale resolves it instead of coming up empty,
  // which is the difference between "m-23 is not a class" and "m-23 is 5.75rem".
  const hit = shape.scale
    ? resolveScale(shape.scale, Number(query.replace(`${prefix}-`, "")))
    : null;
  const scaleHit: Row[] =
    query && hit
      ? [
          {
            className: cls(query.replace(`${prefix}-`, "")),
            declarations: declare(hit),
          },
        ]
      : [];

  const sample =
    shape.named[0] ??
    shape.sparse[0] ??
    (shape.scale ? String(Math.min(4, shape.scale.max)) : "");
  const example = cls(sample);

  const pseudo = [
    ...(variants.pseudoClasses ?? []),
    ...(variants.pseudoElements ?? []),
  ];

  return (
    <div className="o-h mb-6 bc-border bg-surface bw-1">
      <Accordion.Root
        defaultValue={DEFAULT_ACCORDION_VALUE}
        className="d-f fd-c w-100%"
      >
        <Accordion.Item value="reference-item" className="bw-0">
          <Accordion.Header className="m-0">
            <Accordion.Trigger
              render={(triggerProps, { open }) => (
                <Button
                  {...triggerProps}
                  className="d-f ai-c jc-sb g-4 w-100% py-3 px-4 m-0 bg-transparent c-white bw-0 ta-l fw-600 fs-sm c-p us-none"
                >
                  <span className="d-f ai-c g-2 fw-w">
                    {/* The header is all you see while the group is collapsed,
                        so it states the whole range rather than a few
                        examples: `m-4 m-8 m-12` would suggest m-23 is not a
                        class, when the scale runs to 384. */}
                    <code className="c-code ff-m">{summary.join("  ")}</code>
                    <span
                      className="px-2 py-1 bg-border fs-xs fw-600"
                      style={{ color: "#8892c2" }}
                    >
                      {total} utilities
                    </span>
                  </span>
                  <Plus
                    className={`fs-0 w-4 h-4 tp-c tdu-200 ttf-io ${open ? "ro-45 c-white" : "ro-0 c-white/60"}`}
                  />
                </Button>
              )}
            />
          </Accordion.Header>
          <Accordion.Panel className="o-h c-white/70 fs-sm lh-4">
            {/* Responsive, state & negative coverage lives on the utility it
                describes rather than in prose sections at the foot of the
                page, where only the first of a page's utilities ever got it. */}
            <Tabs defaultValue="classes" className="bw-0">
              <TabsList className="px-3">
                <TabsTab value="classes">Classes</TabsTab>
                {variants.mediaQueries && (
                  <TabsTab value="responsive">Responsive</TabsTab>
                )}
                {pseudo.length > 0 && <TabsTab value="states">States</TabsTab>}
                {variants.opacity && <TabsTab value="opacity">Opacity</TabsTab>}
                {negative && <TabsTab value="negative">Negative</TabsTab>}
              </TabsList>

              <TabsPanel value="classes" className="pt-3">
                {shape.scale && (
                  <ScaleRule
                    prefix={prefix}
                    scale={shape.scale}
                    properties={properties}
                  />
                )}

                {listed.length > 0 && (
                  <div className="oy-auto max-h-52">
                    <div className="d-f ai-c g-2 mb-2 pb-2 bc-border bbw-1">
                      <Search className="fs-0 w-4 h-4 c-white/30" />
                      <Input
                        type="text"
                        placeholder="Filter..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-100% bg-transparent c-white/70 bw-0 fs-md"
                      />
                      {search && (
                        <span className="fs-0 c-white/30 fs-xs ws-nw">
                          {filtered.length + scaleHit.length}/{total}
                        </span>
                      )}
                    </div>

                    <Rows
                      rows={[...scaleHit, ...filtered]}
                      empty={`No utilities match "${search}"`}
                    />
                  </div>
                )}
              </TabsPanel>

              {variants.mediaQueries && (
                <TabsPanel value="responsive" className="pt-3">
                  <p className="mb-3 c-white/60 fs-xs">
                    Breakpoint prefixes apply from that width & up.
                  </p>
                  <VariantRows
                    entries={variants.mediaQueries}
                    className={example}
                    wrap={(p) => `@${p}:${example}`}
                  />
                </TabsPanel>
              )}

              {pseudo.length > 0 && (
                <TabsPanel value="states" className="pt-3">
                  <p className="mb-3 c-white/60 fs-xs">
                    State prefixes apply the utility only while the selector
                    matches.
                  </p>
                  <div className="oy-auto max-h-52">
                    <VariantRows
                      entries={pseudo}
                      className={example}
                      wrap={(p) => `${p}:${example}`}
                    />
                  </div>
                </TabsPanel>
              )}

              {variants.opacity && (
                <TabsPanel value="opacity" className="pt-3">
                  <p className="mb-3 c-white/60 fs-xs">
                    Append <code className="c-code">/</code> & an opacity step
                    to any value.
                  </p>
                  <div className="oy-auto max-h-52">
                    <VariantRows
                      entries={variants.opacity}
                      className={example}
                      wrap={(p) => `${example}/${p}`}
                    />
                  </div>
                </TabsPanel>
              )}

              {negative && (
                <TabsPanel value="negative" className="pt-3">
                  <p className="mb-3 c-white/60 fs-xs">
                    Double the hyphen to negate a numeric value.
                  </p>
                  <Rows
                    rows={[4, 8, 12]
                      .filter(
                        (n) => !shape.scale || n <= (shape.scale?.max ?? 0),
                      )
                      .map((n) => {
                        const value = shape.scale
                          ? resolveScale(shape.scale, n)
                          : (util.values[String(n)] as string | undefined);
                        return {
                          className: `${prefix}--${n}`,
                          declarations: properties.map(
                            (p) => `${p}: -${value ?? ""};`,
                          ),
                        };
                      })}
                  />
                </TabsPanel>
              )}
            </Tabs>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}

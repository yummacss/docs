"use client";

import { Button } from "@base-ui/react";
import { Collapsible } from "@base-ui/react/collapsible";
import Link from "next/link";
import { useState } from "react";
import { BaseUI } from "@/components/icons/icons";
import { usePlayground } from "@/components/playground/context";
import Control, {
  EnumSelect,
  StepSelect,
  SwatchSelect,
} from "@/components/playground/control";
import PropDescription from "@/components/prop-description";
import HintTooltip from "@/components/ui/hint-tooltip";
import Scroller from "@/components/ui/scroller";
import { NavArrowDown } from "@/icons";
import { getRegistryTarget, type RegistryProp } from "@/registry";
import { ACCENTS, accentBars } from "@/utils/accent";
import { type Primitives, primitiveSlug } from "@/utils/primitive";
import { isControllable, isInert, STYLE_OWNED, typeOf } from "@/utils/props";
import { RADIUS, STYLES } from "@/utils/styles.mjs";

export default function PlaygroundRail({
  primitives,
}: {
  primitives: Primitives;
}) {
  const playground = usePlayground();
  const [open, setOpen] = useState<string | null>(null);

  const props = playground?.meta?.props ?? [];

  const target = playground ? getRegistryTarget(playground.id) : null;
  const primitive = target
    ? primitiveSlug(primitives, target.component, target.install)
    : null;

  const [more, setMore] = useState(false);

  const toggle = (name: string) =>
    setOpen((current) => (current === name ? null : name));

  const settable = props.filter(isControllable);
  const inCode = props.filter(
    (prop) => !isControllable(prop) && !STYLE_OWNED.includes(prop.name),
  );

  const row = (prop: RegistryProp) => {
    const inert = isInert(prop, playground?.values ?? {}, props);
    return (
      <Row
        key={prop.name}
        prop={prop}
        inert={inert}
        open={open === prop.name}
        onToggle={() => toggle(prop.name)}
      >
        {isControllable(prop) ? (
          <Control
            prop={prop}
            inert={Boolean(inert)}
            value={playground?.values[prop.name]}
            onChange={(value) => playground?.setValue(prop.name, value)}
          />
        ) : (
          <code className="fs:0 c:ink/70 fs:xs ff:m">{typeOf(prop)}</code>
        )}
      </Row>
    );
  };

  return (
    <aside className="bc:border btw:1 @lg:btw:0 @lg:blw:1 @lg:gc-s:3">
      <Scroller className="@lg:p:st @lg:t:20 @lg:max-h:calc(100dvh-5rem)">
        <div className="pt:8 pb:12 @lg:pt:0 @lg:px:8">
          {playground && <Look />}

          <div className="d:f ai:c jc:sb g:2 mb:3">
            <h3 className="c:silver-8 fs:xs ls:2 tt:u">Component API</h3>
            {primitive && (
              <HintTooltip label="Base UI reference">
                <Link
                  href={`https://base-ui.com/react/components/${primitive}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Base UI reference"
                  className="d:f ai:c jc:c fs:0 c:ink/70 td:none h:c:ink fv:oc:accent fv:ow:2"
                >
                  <BaseUI className="w:4 h:4" />
                </Link>
              </HintTooltip>
            )}
          </div>

          {settable.map((prop) => row(prop))}

          {inCode.length > 0 && (
            <Collapsible.Root open={more} onOpenChange={setMore}>
              <Collapsible.Trigger className="d:f ai:c jc:sb w:100% px:0 py:3 bg:transparent bw:0 bc:border bbw:1 ta:l c:silver-8 fs:xs c:p h:c:ink fv:oo:-1 fv:oc:accent">
                {more
                  ? `Hide the ${inCode.length} set in code`
                  : `${inCode.length} more, set in code`}
                <NavArrowDown
                  aria-hidden
                  className={`fs:0 w:3 h:3 tp:t tdu:150 ${more ? "ro:36" : ""}`}
                />
              </Collapsible.Trigger>
              <Collapsible.Panel>
                {inCode.map((prop) => row(prop))}
              </Collapsible.Panel>
            </Collapsible.Root>
          )}
        </div>
      </Scroller>
    </aside>
  );
}

function Row({
  prop,
  inert,
  open,
  onToggle,
  children,
}: {
  prop: RegistryProp;
  inert?: string | null;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const name = <code className="c:code fs:xs ff:m">{prop.name}</code>;
  const [attempted, setAttempted] = useState(false);

  return (
    <div className="py:2 bc:border bbw:1">
      <div className="d:f ai:c jc:sb g:2 fw:w">
        {prop.description ? (
          <Button
            onClick={onToggle}
            aria-expanded={open}
            className="d:f ai:c g:1 p:0 bg:transparent bw:0 ta:l c:p fv:oo:-1 fv:oc:accent"
          >
            {name}
            <NavArrowDown
              aria-hidden
              className={`fs:0 w:3 h:3 tp:c tdu:150 ${
                open ? "ro:36 c:accent" : "c:ink/25"
              }`}
            />
          </Button>
        ) : (
          name
        )}
        <span
          onPointerDownCapture={() => inert && setAttempted(true)}
          onFocusCapture={() => inert && setAttempted(true)}
        >
          {children}
        </span>
      </div>

      {inert && attempted && (
        <div className="mt:1 c:diff-remove fs:xs">
          Does nothing while <code className="ff:m">{inert}</code>.
        </div>
      )}

      {open && (
        <div className="mt:2 c:ink/60 fs:sm lh:4">
          <PropDescription text={prop.description} />
        </div>
      )}
    </div>
  );
}

const SPECS: Record<string, { allow: string[] }> = STYLES;

const SWATCHES = ACCENTS.map((family) => ({
  value: family,
  colors: accentBars(family),
}));

/** Style, Radius and Accent, as rows like the Component API's. */
function Look() {
  const playground = usePlayground();
  if (!playground) return null;
  const spec = SPECS[playground.style];
  const allowed = RADIUS.map((step) => spec.allow.includes(step));
  const line = (name: string, hint: string, control: React.ReactNode) => (
    <div className="d:f ai:c jc:sb g:2 py:2 bc:border bbw:1">
      <HintTooltip label={hint}>
        <code className="c:code fs:xs ff:m">{name}</code>
      </HintTooltip>
      {control}
    </div>
  );

  return (
    <div className="d:f fd:c pb:4 mb:4">
      <h3 className="mb:1 c:silver-8 fs:xs ls:2 tt:u">Look</h3>
      {line(
        "style",
        "The style of the code you copy.",
        <EnumSelect
          name="style"
          values={Object.keys(STYLES)}
          value={playground.style}
          onChange={(value) => playground.setStyle(String(value))}
        />,
      )}
      {line(
        "radius",
        "The radius of the code you copy.",
        <StepSelect
          name="radius"
          values={RADIUS}
          value={playground.radius}
          min={allowed.indexOf(true)}
          max={allowed.lastIndexOf(true)}
          onChange={playground.setRadius}
        />,
      )}
      {line(
        "accent",
        "Preview only. The code you copy is unchanged.",
        <SwatchSelect
          name="accent"
          options={SWATCHES}
          value={playground.accent}
          onChange={playground.setAccent}
        />,
      )}
    </div>
  );
}

"use client";

import { Button } from "@base-ui/react";
import Link from "next/link";
import { useState } from "react";
import { BaseUI } from "@/components/icons/icons";
import { usePlayground } from "@/components/playground/context";
import Control, { EnumSelect } from "@/components/playground/control";
import PropDescription from "@/components/prop-description";
import HintTooltip from "@/components/ui/hint-tooltip";
import Scroller from "@/components/ui/scroller";
import { NavArrowDown, Undo } from "@/icons";
import { getRegistryTarget, type RegistryProp } from "@/registry";
import { ACCENTS } from "@/utils/accent";
import { primitiveSlug } from "@/utils/primitive";
import { isControllable, isInert, typeOf } from "@/utils/props";

export default function PlaygroundRail() {
  const playground = usePlayground();
  const [open, setOpen] = useState<string | null>(null);

  const props = playground?.meta?.props ?? [];

  const target = playground ? getRegistryTarget(playground.id) : null;
  const primitive = target
    ? primitiveSlug(target.component, target.install)
    : null;

  const toggle = (name: string) =>
    setOpen((current) => (current === name ? null : name));

  return (
    <aside className="bc:border btw:1 @lg:btw:0 @lg:blw:1 @lg:gc-s:3">
      <Scroller className="playground-rail">
        <div className="pt:8 pb:12 @lg:pt:0 @lg:px:8">
          {playground && (
            <div className="d:f ai:c jc:sb g:2 pb:4 mb:4 bc:border bbw:1">
              <HintTooltip label="Preview only. The code you copy is unchanged.">
                <span className="d:f ai:c g:1 c:silver-8 fs:xs">Accent</span>
              </HintTooltip>
              <EnumSelect
                name="accent"
                values={ACCENTS}
                value={playground.accent}
                onChange={(value) => playground.setAccent(String(value))}
              />
            </div>
          )}

          <div className="d:f ai:c jc:sb g:2 mb:3">
            <h3 className="c:silver-8 fs:xs ls:2 tt:u">Component API</h3>
            {playground?.carried && (
              <HintTooltip label="Reset the styles carried from the last page">
                <Button
                  type="button"
                  onClick={playground.reset}
                  className="d:f ai:c g:1 p:0 bg:transparent bw:0 c:silver-8 fs:xs c:p h:c:white fv:oc:accent fv:ow:2"
                >
                  <Undo className="w:3 h:3" />
                  Reset
                </Button>
              </HintTooltip>
            )}
            {primitive && (
              <HintTooltip label="Base UI reference">
                <Link
                  href={`https://base-ui.com/react/components/${primitive}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Base UI reference"
                  className="d:f ai:c jc:c fs:0 c:accent td:none h:c:accent-4 fv:oc:accent fv:ow:2"
                >
                  <BaseUI className="w:4 h:4" />
                </Link>
              </HintTooltip>
            )}
          </div>

          {props.map((prop) => {
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
                  <code className="fs:0 c:white/70 fs:xs ff:m">
                    {typeOf(prop)}
                  </code>
                )}
              </Row>
            );
          })}
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
                open ? "ro:36 c:accent" : "c:white/25"
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
        <div className="mt:2 c:white/60 fs:sm lh:4">
          <PropDescription text={prop.description} />
        </div>
      )}
    </div>
  );
}

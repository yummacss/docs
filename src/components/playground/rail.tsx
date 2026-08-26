"use client";

import { NavArrowDown } from "iconoir-react";
import { useState } from "react";
import { usePlayground } from "@/components/playground/context";
import Control from "@/components/playground/control";
import PropDescription from "@/components/prop-description";
import type { RegistryProp } from "@/registry";
import { isControllable, typeOf } from "@/utils/props";

/** Playground rail: all props as controls or type labels. */
export default function PlaygroundRail() {
  const playground = usePlayground();
  const [open, setOpen] = useState<string | null>(null);

  const meta = playground?.meta;
  const controllable = meta?.props.filter(isControllable) ?? [];
  const fixed = meta?.props.filter((prop) => !isControllable(prop)) ?? [];

  const toggle = (name: string) =>
    setOpen((current) => (current === name ? null : name));

  return (
    // No extra horizontal pad on small screens: main already has `px-6`.
    <aside className="bc-border btw-1 @lg:btw-0 @lg:blw-1 @lg:gc-s-3">
      <div className="playground-rail">
        <div className="pt-8 pb-12 @lg:pt-0 @lg:px-8">
          <div className="d-f ai-c jc-sb g-2 mb-3">
            <h3 className="c-silver-8 fs-xs fw-600 ls-2 tt-u">Component API</h3>
            {playground?.dirty && (
              <button
                type="button"
                onClick={playground.reset}
                className="p-0 bg-transparent c-accent-dim bw-0 fs-xs c-p h:c-accent fv:oc-accent fv:ow-2"
              >
                Reset
              </button>
            )}
          </div>

          {controllable.map((prop) => (
            <Row
              key={prop.name}
              prop={prop}
              open={open === prop.name}
              onToggle={() => toggle(prop.name)}
            >
              <Control
                prop={prop}
                value={playground?.values[prop.name]}
                onChange={(value) => playground?.setValue(prop.name, value)}
              />
            </Row>
          ))}

          {fixed.length > 0 && (
            <>
              <h3 className="mt-6 mb-3 c-silver-8 fs-xs fw-600 ls-2 tt-u">
                Not Controllable
              </h3>
              {fixed.map((prop) => (
                <Row
                  key={prop.name}
                  prop={prop}
                  open={open === prop.name}
                  onToggle={() => toggle(prop.name)}
                >
                  <code className="fs-0 c-foreground/50 fs-xs ff-m">
                    {typeOf(prop)}
                  </code>
                </Row>
              ))}
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

/** Prop row: name, control, optional description on click. */
function Row({
  prop,
  open,
  onToggle,
  children,
}: {
  prop: RegistryProp;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const name = <code className="c-foreground fs-xs ff-m">{prop.name}</code>;

  return (
    <div className="py-2 bc-border bbw-1">
      <div className="d-f ai-c jc-sb g-2 fw-w">
        {prop.description ? (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            className="d-f ai-c g-1 p-0 bg-transparent bw-0 ta-l c-p fv:oo--1 fv:oc-accent"
          >
            {name}
            <NavArrowDown
              aria-hidden
              className={`fs-0 w-3 h-3 tp-c tdu-150 ${
                open ? "ro-36 c-accent" : "c-foreground/40"
              }`}
            />
          </button>
        ) : (
          name
        )}
        {children}
      </div>

      {open && (
        <div className="mt-2 c-foreground/80 fs-sm lh-4">
          <PropDescription text={prop.description} />
        </div>
      )}
    </div>
  );
}

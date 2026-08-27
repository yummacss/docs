"use client";

import { NavArrowDown } from "iconoir-react";
import { useState } from "react";
import { usePlayground } from "@/components/playground/context";
import Control from "@/components/playground/control";
import PropDescription from "@/components/prop-description";
import type { RegistryProp } from "@/registry";
import { isControllable, typeOf } from "@/utils/props";

/**
 * The component's props, as controls.
 *
 * This is the page's API reference. A control already carries the prop's name,
 * its type, its default and every value it accepts, so a table beside it would
 * be the same information twice. Only the description is left over, and it
 * opens on the row rather than in a second column.
 *
 * One list, in the order the schema declares. Every prop gets a row; the ones
 * no control can represent - a callback, a slot, a string - show their type
 * where the widget would be and are read only. Splitting those into a second
 * section described the tooling rather than the component, and put `icon` and
 * `label` in different halves of the rail for no reason a reader would
 * recognize.
 */
export default function PlaygroundRail() {
  const playground = usePlayground();
  const [open, setOpen] = useState<string | null>(null);

  const props = playground?.meta?.props ?? [];

  const toggle = (name: string) =>
    setOpen((current) => (current === name ? null : name));

  return (
    // Unlike the table of contents this replaced, the rail is not optional
    // furniture: it is the page's API reference. Hiding it below `@lg` the way
    // a contents list can be hidden would leave a phone with no props at all,
    // so it stacks under the article there instead.
    <aside className="bc-border btw-1 @lg:btw-0 @lg:blw-1 @lg:gc-s-3">
      <div className="playground-rail">
        <div className="pt-8 px-6 pb-12 @lg:pt-0">
          <h3 className="mb-3 c-silver-8 fs-xs fw-600 ls-2 tt-u">
            Component API
          </h3>

          {props.map((prop) => (
            <Row
              key={prop.name}
              prop={prop}
              open={open === prop.name}
              onToggle={() => toggle(prop.name)}
            >
              {isControllable(prop) ? (
                <Control
                  prop={prop}
                  value={playground?.values[prop.name]}
                  onChange={(value) => playground?.setValue(prop.name, value)}
                />
              ) : (
                // The type stands where the widget would. A callback or a
                // string has no value a reader could usefully pick here.
                <code className="fs-0 c-white/25 fs-xs ff-m">
                  {typeOf(prop)}
                </code>
              )}
            </Row>
          ))}
        </div>
      </div>
    </aside>
  );
}

/**
 * Name on the left, control on the right, description underneath on click.
 *
 * The row wraps rather than squeezing the control: the rail is three of the
 * page's twelve columns, and a long prop name beside a select does not fit
 * that on a laptop.
 */
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
  const name = <code className="c-code fs-xs ff-m">{prop.name}</code>;

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
                open ? "ro-36 c-accent" : "c-white/25"
              }`}
            />
          </button>
        ) : (
          name
        )}
        {children}
      </div>

      {open && (
        <div className="mt-2 c-white/60 fs-sm lh-4">
          <PropDescription text={prop.description} />
        </div>
      )}
    </div>
  );
}

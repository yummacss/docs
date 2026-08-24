"use client";

import { Separator } from "@base-ui/react";
import { allUis } from "content-collections";
import { NavArrowDown } from "iconoir-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Control from "@/components/playground/control";
import { usePlayground } from "@/components/playground/context";
import PropDescription from "@/components/prop-description";
import ApiReference from "@/components/ui/api-reference";
import EditPage from "@/components/ui/edit-page";
import ViewMarkdown from "@/components/ui/view-markdown";
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
 * Every prop gets a row, including the ones no control can represent: a
 * callback or a `ReactNode` slot is still part of the API, and listing only
 * what happens to be controllable would quietly undocument 80 of the library's
 * 406 props.
 */
export default function PlaygroundRail() {
  const playground = usePlayground();
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);

  const slug = (pathname || "")
    .replace(/^\/ui\/components\//, "")
    .replace(/\/$/, "");
  const currentUI = allUis.find((ui) => ui._meta.path === slug);

  const meta = playground?.meta;
  const controllable = meta?.props.filter(isControllable) ?? [];
  const fixed = meta?.props.filter((prop) => !isControllable(prop)) ?? [];

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
          <div className="d-f ai-c jc-sb g-2 mb-3">
            <h3 className="c-silver-8 fs-xs fw-600 ls-2 tt-u">Props</h3>
            {playground?.dirty && (
              <button
                type="button"
                onClick={playground.reset}
                className="p-0 bg-transparent c-white/40 bw-0 fs-xs c-p h:c-white fv:oc-white fv:ow-2"
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
                  {/* The type stands where the widget would. A slot or a
                      callback has no value a reader could pick. */}
                  <code className="fs-0 c-white/25 fs-xs ff-m">
                    {typeOf(prop)}
                  </code>
                </Row>
              ))}
            </>
          )}

          {/* These used to sit under the table of contents this rail replaced.
              Every component page sets `primitive`, so these are exactly the
              pages that would otherwise lose the link out to Base UI. */}
          <div className="d-f fd-c g-3 mt-8 pt-8">
            <EditPage />
            <ViewMarkdown />
            <Separator />
            {currentUI?.primitive && (
              <ApiReference primitive={currentUI.primitive} />
            )}
          </div>
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

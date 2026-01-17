"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function NavbarCenterAlignedLinks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
      <nav
        aria-label="Main navigation"
        className="bbw-1 bc-silver-4 bg-white px-6 py-4"
      >
        <div className="ai-c d-f jc-sb max-w-xl mx-auto">
          <a href="/" className="fs-xl fw-600 c-black td-none">
            Brand
          </a>

          {/* Desktop Center Menu */}
          <ul className="ai-c d-none md:d-f g-6 p-0 m-0">
            <li>
              <a href="/" className="fs-sm h:c-black c-slate-7 td-none">
                Product
              </a>
            </li>
            <li>
              <a href="/" className="fs-sm h:c-black c-slate-7 td-none">
                Resources
              </a>
            </li>
            <li>
              <a href="/" className="fs-sm h:c-black c-slate-7 td-none">
                Pricing
              </a>
            </li>
          </ul>

          {/* Desktop Right Button */}
          <div className="ai-c d-none g-3 md:d-f">
            <a
              href="/"
              className="bw-1 bc-silver-4 fs-sm h:bg-silver-1 px-4 py-2 br-1 c-black td-none fv:os-s fv:ow-2 fv:oc-blue-8"
            >
              Sign in
            </a>
          </div>

          <Collapsible.Trigger className="d-f ai-c jc-c c-p br-1 px-2 py-2 bw-1 bc-silver-4 bg-white h:bg-silver-2 fv:os-s fv:ow-2 fv:oc-blue-8 md:d-none">
            {isOpen ? (
              <XIcon size={20} className="c-black" aria-hidden="true" />
            ) : (
              <ListIcon size={20} className="c-black" aria-hidden="true" />
            )}
            <span className="sr-only">
              {isOpen ? "Close menu" : "Open menu"}
            </span>
          </Collapsible.Trigger>
        </div>

        <Collapsible.Panel className="o-h md:d-none navbar-panel">
          <ul className="d-f fd-c g-4 p-0 m-0 mt-4">
            <li>
              <a
                href="/"
                className="d-b fs-sm h:c-black c-slate-7 td-none py-2"
              >
                Product
              </a>
            </li>
            <li>
              <a
                href="/"
                className="d-b fs-sm h:c-black c-slate-7 td-none py-2"
              >
                Resources
              </a>
            </li>
            <li>
              <a
                href="/"
                className="d-b fs-sm h:c-black c-slate-7 td-none py-2"
              >
                Pricing
              </a>
            </li>
            <li className="btw-1 bc-silver-4 pt-4">
              <a
                href="/"
                className="d-b fs-sm h:c-black c-slate-7 td-none py-2"
              >
                Sign in
              </a>
            </li>
          </ul>
        </Collapsible.Panel>
      </nav>

      <style>{`
        .navbar-panel {
          height: var(--collapsible-panel-height);
          transition: height 200ms ease-out;
        }
        .navbar-panel[data-starting-style],
        .navbar-panel[data-ending-style] {
          height: 0;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </Collapsible.Root>
  );
}

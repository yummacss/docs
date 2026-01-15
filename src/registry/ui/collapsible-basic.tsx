"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { CaretRightIcon } from "@phosphor-icons/react";

export default function ExampleCollapsible() {
  return (
    <Collapsible.Root className="d-f fd-c jc-c w-56 min-h-36 c-slate">
      <Collapsible.Trigger className="d-f ai-c g-2 br-1 bg-silver-1 px-2 py-1 fs-sm fw-500 c-slate h:bg-silver-2 fv:os-s fv:ow-2 fv:oc-blue-8 collapsible-trigger">
        <CaretRightIcon size={12} weight="bold" className="collapsible-icon" />
        Recovery keys
      </Collapsible.Trigger>
      <Collapsible.Panel className="d-f fd-c jc-fe o-h fs-sm collapsible-panel">
        <div className="d-f fd-c g-2 br-1 bg-silver-1 mt-1 py-2 pl-7 c-t">
          <div>alien-bean-pasta</div>
          <div>wild-irish-burrito</div>
          <div>horse-battery-staple</div>
        </div>
      </Collapsible.Panel>

      <style>{`
        .collapsible-panel {
          height: var(--collapsible-panel-height);
          transition: height 150ms ease-out;
        }
        .collapsible-panel[data-starting-style],
        .collapsible-panel[data-ending-style] {
          height: 0;
        }
        .collapsible-icon {
          transition: transform 150ms ease-out;
        }
        .collapsible-trigger[data-panel-open] .collapsible-icon {
          transform: rotate(90deg);
        }
      `}</style>
    </Collapsible.Root>
  );
}

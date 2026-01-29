import { Select } from "@base-ui/react/select";
import { Separator } from "@base-ui/react/separator";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar } from "@base-ui/react/toolbar";
import type * as React from "react";

export default function ExampleToolbar() {
  return (
    <Toolbar.Root className="d-f w-150 ai-c g-px br-1 bw-1 bc-silver-4 bg-silver-1 p-px">
      <ToggleGroup className="d-f g-1" aria-label="Alignment">
        <Toolbar.Button
          render={<Toggle />}
          aria-label="Align left"
          value="align-left"
          className="d-f h-8 ai-c jc-c br-1 px-3 fs-sm fw-500 c-slate-6 us-none b-0 bg-transparent h:bg-silver-2 fv:bg-none fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 a:bg-silver-3 data-pressed:bg-silver-2 data-pressed:c-slate-12"
        >
          Align Left
        </Toolbar.Button>
        <Toolbar.Button
          render={<Toggle />}
          aria-label="Align right"
          value="align-right"
          className="d-f h-8 ai-c jc-c br-1 px-3 fs-sm fw-500 c-slate-6 us-none b-0 bg-transparent h:bg-silver-2 fv:bg-none fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 a:bg-silver-3 data-pressed:bg-silver-2 data-pressed:c-slate-12"
        >
          Align Right
        </Toolbar.Button>
      </ToggleGroup>

      <Separator orientation="vertical" className="w-px h-4 mx-1 bg-silver-4" />

      <Toolbar.Group className="d-f g-1" aria-label="Numerical format">
        <Toolbar.Button
          className="d-f d-8 ai-c jc-c br-1 fs-sm fw-500 c-slate-6 us-none b-0 bg-transparent h:bg-silver-2 fv:bg-none fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 a:bg-silver-3 data-pressed:bg-silver-2 data-pressed:c-slate-12"
          aria-label="Format as currency"
        >
          $
        </Toolbar.Button>
        <Toolbar.Button
          className="d-f d-8 ai-c jc-c br-1 fs-sm fw-500 c-slate-6 us-none b-0 bg-transparent h:bg-silver-2 fv:bg-none fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 a:bg-silver-3 data-pressed:bg-silver-2 data-pressed:c-slate-12"
          aria-label="Format as percent"
        >
          %
        </Toolbar.Button>
      </Toolbar.Group>

      <Separator orientation="vertical" className="w-px h-4 mx-1 bg-silver-4" />

      <Select.Root defaultValue="Helvetica">
        <Toolbar.Button
          render={<Select.Trigger />}
          className="d-f miw-32 h-8 ai-c jc-sb g-3 br-1 pr-3 pl-3.5 fs-sm fw-500 c-slate-6 us-none b-0 bg-transparent h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 data-popup-open:bg-silver-2 cu-d"
        >
          <Select.Value />
          <Select.Icon className="d-f">
            <ChevronUpDownIcon />
          </Select.Icon>
        </Toolbar.Button>
        <Select.Portal>
          <Select.Positioner className="os-n us-n" sideOffset={8}>
            <Select.Popup className="zi-100 max-h-vh miw-anchor br-1 bg-white py-1 c-slate-12 bsh-lg bw-1 bc-silver-4 o-1 transition-all d-150 e-cb data-ending-style:s-90 data-ending-style:o-0 data-starting-style:s-90 data-starting-style:o-0">
              <Select.Item
                value="Helvetica"
                className="d-g miw-anchor cu-d ai-c g-2 py-1.5 pr-4 pl-2.5 lh-4 os-n us-n gtc-select data-highlighted:r c-white data-highlighted:be:p-a data-highlighted:be:ix-1 data-highlighted:be:iy-0 data-highlighted:be:zi--1 data-highlighted:be:br-1 data-highlighted:be:bg-slate-12 pointer-coarse:py-2.5"
              >
                <Select.ItemIndicator className="gc-1">
                  <CheckIcon className="d-3" />
                </Select.ItemIndicator>
                <Select.ItemText className="gc-2 fs-sm">
                  Helvetica
                </Select.ItemText>
              </Select.Item>
              <Select.Item
                value="Arial"
                className="d-g miw-anchor cu-d ai-c g-2 py-1.5 pr-4 pl-2.5 lh-4 os-n us-n gtc-select data-highlighted:r c-white data-highlighted:be:p-a data-highlighted:be:ix-1 data-highlighted:be:iy-0 data-highlighted:be:zi--1 data-highlighted:be:br-1 data-highlighted:be:bg-slate-12 pointer-coarse:py-2.5"
              >
                <Select.ItemIndicator className="gc-1">
                  <CheckIcon className="d-3" />
                </Select.ItemIndicator>
                <Select.ItemText className="gc-2 fs-sm">Arial</Select.ItemText>
              </Select.Item>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>

      <Separator orientation="vertical" className="w-px h-4 mx-1 bg-silver-4" />

      <Toolbar.Link
        className="ml-a mr-3.5 f-n as-c fs-sm c-slate-6 td-n h:c-blue-8 fv:br-1 fv:os-s fv:ow-2 fv:oo--2 fv:oc-blue-8"
        href="#"
      >
        Edited 51m ago
      </Toolbar.Link>

      <style>{`
        .gtc-select {
          grid-template-columns: 0.75rem 1fr;
        }
      `}</style>
    </Toolbar.Root>
  );
}

function ChevronUpDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <title>Open font selection</title>
      <path d="M0.5 4.5L4 1.5L7.5 4.5" />
      <path d="M0.5 7.5L4 10.5L7.5 7.5" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentColor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <title>Selected</title>
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}

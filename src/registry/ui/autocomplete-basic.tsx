"use client";
import { Autocomplete } from "@base-ui/react/autocomplete";

export default function ExampleAutocomplete() {
  return (
    <Autocomplete.Root items={tags}>
      {/** biome-ignore lint/a11y/noLabelWithoutControl: false positive */}
      <label className="d-f fd-c g-1 fs-sm fw-500 c-slate">
        Search tags
        <Autocomplete.Input
          placeholder="e.g. feature"
          className="h-10 w-64 md:w-80 bw-1 bc-silver-4 br-1 bg-white pl-4 fs-md c-slate fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 b-0"
        />
      </label>

      <Autocomplete.Portal>
        <Autocomplete.Positioner className="ow-0" sideOffset={4}>
          <Autocomplete.Popup className="w-64 md:w-80 max-h-72 bw-1 bc-silver-4 br-1 bg-white bs-lg c-slate o-h autocomplete-popup">
            <Autocomplete.Empty className="p-4 fs-sm c-slate-6 autocomplete-empty">
              No tags found.
            </Autocomplete.Empty>
            <Autocomplete.List className="o-y-auto ow-0 py-2 max-h-72">
              {(tag: Tag) => (
                <Autocomplete.Item
                  key={tag.id}
                  className="d-f ai-c py-2 pr-8 pl-4 fs-sm us-none c-d c-p autocomplete-item"
                  value={tag}
                >
                  {tag.value}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
      <style>{`
        .autocomplete-popup {
          transition: opacity 150ms ease-out, transform 150ms ease-out;
          transform-origin: var(--transform-origin);
        }
        .autocomplete-popup[data-starting-style],
        .autocomplete-popup[data-ending-style] {
          opacity: 0;
          transform: scale(0.95);
        }
        .autocomplete-empty:empty {
          display: none;
        }
        .autocomplete-item[data-highlighted] {
          position: relative;
          z-index: 0;
          color: #f5f5f6;
        }
        .autocomplete-item[data-highlighted]::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block: 0.125rem;
          inset-inline: 0.25rem;
          border-radius: 0.25rem;
          background-color: #0a0a0c;
        }
      `}</style>
    </Autocomplete.Root>
  );
}

interface Tag {
  id: string;
  value: string;
}

const tags: Tag[] = [
  { id: "t1", value: "feature" },
  { id: "t2", value: "fix" },
  { id: "t3", value: "bug" },
  { id: "t4", value: "docs" },
  { id: "t5", value: "internal" },
  { id: "t6", value: "mobile" },
  { id: "c-accordion", value: "component: accordion" },
  { id: "c-alert-dialog", value: "component: alert dialog" },
  { id: "c-autocomplete", value: "component: autocomplete" },
  { id: "c-avatar", value: "component: avatar" },
  { id: "c-checkbox", value: "component: checkbox" },
  { id: "c-checkbox-group", value: "component: checkbox group" },
  { id: "c-collapsible", value: "component: collapsible" },
  { id: "c-combobox", value: "component: combobox" },
  { id: "c-context-menu", value: "component: context menu" },
  { id: "c-dialog", value: "component: dialog" },
  { id: "c-field", value: "component: field" },
  { id: "c-fieldset", value: "component: fieldset" },
  { id: "c-filterable-menu", value: "component: filterable menu" },
  { id: "c-form", value: "component: form" },
  { id: "c-input", value: "component: input" },
  { id: "c-menu", value: "component: menu" },
  { id: "c-menubar", value: "component: menubar" },
  { id: "c-meter", value: "component: meter" },
  { id: "c-navigation-menu", value: "component: navigation menu" },
  { id: "c-number-field", value: "component: number field" },
  { id: "c-popover", value: "component: popover" },
  { id: "c-preview-card", value: "component: preview card" },
  { id: "c-progress", value: "component: progress" },
  { id: "c-radio", value: "component: radio" },
  { id: "c-scroll-area", value: "component: scroll area" },
  { id: "c-select", value: "component: select" },
  { id: "c-separator", value: "component: separator" },
  { id: "c-slider", value: "component: slider" },
  { id: "c-switch", value: "component: switch" },
  { id: "c-tabs", value: "component: tabs" },
  { id: "c-toast", value: "component: toast" },
  { id: "c-toggle", value: "component: toggle" },
  { id: "c-toggle-group", value: "component: toggle group" },
  { id: "c-toolbar", value: "component: toolbar" },
  { id: "c-tooltip", value: "component: tooltip" },
];

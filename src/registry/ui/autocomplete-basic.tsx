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
          className="h-10 w-64 bw-1 bc-silver-4 br-1 bg-white pl-4 fs-md c-slate f:os-s f:ow-2 f:oo--1 f:oc-blue-8"
        />
      </label>

      <Autocomplete.Portal>
        <Autocomplete.Positioner className="ow-0" sideOffset={4}>
          <Autocomplete.Popup className="w-64 max-h-72 bw-1 bc-silver-4 br-1 bg-white bs-lg c-slate autocomplete-popup">
            <Autocomplete.Empty className="p-4 fs-sm c-slate-6">
              No tags found.
            </Autocomplete.Empty>
            <Autocomplete.List className="o-y-auto ow-0 py-2">
              {(tag: Tag) => (
                <Autocomplete.Item
                  key={tag.id}
                  className="d-f ai-c py-2 pr-8 pl-4 fs-md us-none c-d autocomplete-item"
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
        .autocomplete-item[data-highlighted] {
          position: relative;
          z-index: 0;
          color: var(--silver-1);
        }
        .autocomplete-item[data-highlighted]::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block: 0;
          inset-inline: 0.5rem;
          border-radius: 0.25rem;
          background-color: var(--slate);
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
  { id: "c-checkbox", value: "component: checkbox" },
  { id: "c-dialog", value: "component: dialog" },
  { id: "c-input", value: "component: input" },
  { id: "c-menu", value: "component: menu" },
  { id: "c-tabs", value: "component: tabs" },
];

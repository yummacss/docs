import { Separator } from "@base-ui/react/separator";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar } from "@base-ui/react/toolbar";

export default function ExampleToolbar() {
  return (
    <Toolbar.Root className="d-f ai-c g-1 br-1 bw-1 bc-silver-4 bg-silver-1 p-1 toolbar-root">
      <ToggleGroup
        defaultValue={["align-left"]}
        className="d-f g-1"
        aria-label="Alignment"
      >
        <Toolbar.Button
          render={<Toggle />}
          aria-label="Align left"
          value="align-left"
          className="d-f h-8 ai-c jc-c br-1 px-3 fs-sm fw-500 c-slate-6 us-none h:bg-silver-2 toolbar-button"
        >
          Align Left
        </Toolbar.Button>
        <Toolbar.Button
          render={<Toggle />}
          aria-label="Align right"
          value="align-right"
          className="d-f h-8 ai-c jc-c br-1 px-3 fs-sm fw-500 c-slate-6 us-none h:bg-silver-2 toolbar-button"
        >
          Align Right
        </Toolbar.Button>
      </ToggleGroup>

      <Separator orientation="vertical" className="w-px h-4 mx-1 bg-silver-4" />

      <Toolbar.Group className="d-f g-1" aria-label="Numerical format">
        <Toolbar.Button
          className="d-f d-8 ai-c jc-c br-1 fs-sm fw-500 c-slate-6 us-none h:bg-silver-2 toolbar-button"
          aria-label="Format as currency"
        >
          $
        </Toolbar.Button>
        <Toolbar.Button
          className="d-f d-8 ai-c jc-c br-1 fs-sm fw-500 c-slate-6 us-none h:bg-silver-2 toolbar-button"
          aria-label="Format as percent"
        >
          %
        </Toolbar.Button>
      </Toolbar.Group>

      <Separator orientation="vertical" className="w-px h-4 mx-1 bg-silver-4" />

      <Toolbar.Link
        className="ml-auto mr-3 fs-sm c-slate-6 td-n h:c-slate toolbar-link"
        href="#"
      >
        Edited 51m ago
      </Toolbar.Link>

      <style>{`
        .toolbar-button {
          border: 0;
          background-color: transparent;
        }
        .toolbar-button:focus-visible {
          outline: 2px solid var(--blue-8);
          outline-offset: -1px;
        }
        .toolbar-button[data-pressed] {
          background-color: var(--silver-2);
          color: var(--slate);
        }
        .toolbar-link:focus-visible {
          outline: 2px solid var(--blue-8);
          outline-offset: -2px;
          border-radius: 0.125rem;
        }
      `}</style>
    </Toolbar.Root>
  );
}

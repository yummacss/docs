import { Switch } from "@base-ui/react/switch";

export default function ExampleSwitch() {
  return (
    <Switch.Root
      defaultChecked
      className="p-r d-f h-6 w-10 br-pill p-px switch-root"
    >
      <Switch.Thumb className="h-full br-pill bg-white switch-thumb" />

      <style>{`
        .switch-root {
          appearance: none;
          border: 0;
          margin: 0;
          outline: 1px solid var(--silver-4);
          outline-offset: -1px;
          background-color: transparent;
          background-image: linear-gradient(to right, var(--slate) 35%, var(--silver-2) 65%);
          background-size: 6.5rem 100%;
          background-position-x: 100%;
          background-repeat: no-repeat;
          transition-property: background-position;
          transition-timing-function: cubic-bezier(0.26, 0.75, 0.38, 0.45);
          transition-duration: 125ms;
        }
        .switch-root[data-checked] {
          background-position-x: 0%;
        }
        .switch-root:focus-visible {
          outline: 2px solid var(--blue-8);
          outline-offset: 2px;
        }
        .switch-thumb {
          aspect-ratio: 1 / 1;
          box-shadow: 0 0 1px 1px var(--silver-4), 0 1px 1px var(--silver-4);
          transition: translate 150ms ease;
        }
        .switch-thumb[data-checked] {
          translate: 1rem 0;
        }
      `}</style>
    </Switch.Root>
  );
}

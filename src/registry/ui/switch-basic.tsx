import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";

export default function ExampleSwitch() {
  return (
    <Field.Root className="d-f ai-c g-2">
      <Switch.Root
        id="switch-notifications"
        defaultChecked
        className="p-r d-f h-1.5 w-2.5 br-pill p-px switch-root"
      >
        <Switch.Thumb className="h-full br-pill bg-white switch-thumb" />

        <style>{`
        .switch-root {
          appearance: none;
          border: 0;
          margin: 0;
          outline: 1px solid #dadcdf;
          outline-offset: -1px;
          background-color: transparent;
          background-image: linear-gradient(to right, #0a0a0c 35%, #ecedee 65%);
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
          outline: 2px solid #26549f;
          outline-offset: 2px;
        }
        .switch-thumb {
          aspect-ratio: 1 / 1;
          box-shadow: 0 0 1px 1px #ecedee, 0 1px 1px #ecedee;
          transition: translate 150ms ease;
        }
        .switch-thumb[data-checked] {
          translate: 1rem 0;
        }
      `}</style>
      </Switch.Root>
      <label
        htmlFor="switch-notifications"
        className="fs-sm fw-500 c-slate-12 select-none"
      >
        Notifications
      </label>
    </Field.Root>
  );
}

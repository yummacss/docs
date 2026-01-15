import { Dialog } from "@base-ui/react/dialog";

export default function ExampleDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="d-f ai-c jc-c h-10 bw-1 bc-silver-4 br-1 bg-silver-1 px-4 fs-md fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
        View notifications
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="p-f zi-50 t-0 l-0 r-0 b-0 bg-black dialog-backdrop" />
        <Dialog.Popup className="p-f zi-50 t-half l-half w-96 bw-1 bc-silver-4 br-2 bg-silver-1 p-6 c-slate dialog-popup">
          <Dialog.Title className="fs-lg fw-500 c-slate mb-1">
            Notifications
          </Dialog.Title>
          <Dialog.Description className="fs-md c-slate-6 mb-6">
            You are all caught up. Good job!
          </Dialog.Description>
          <div className="d-f jc-fe g-4">
            <Dialog.Close className="d-f ai-c jc-c h-10 bw-1 bc-silver-4 br-1 bg-silver-1 px-4 fs-md fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
      <style>{`
        .dialog-backdrop {
          opacity: 0.2;
          transition: opacity 150ms ease-out;
        }
        .dialog-backdrop[data-starting-style],
        .dialog-backdrop[data-ending-style] {
          opacity: 0;
        }
        .dialog-popup {
          max-width: calc(100vw - 3rem);
          transform: translate(-50%, -50%);
          transition: opacity 150ms ease-out, transform 150ms ease-out;
        }
        .dialog-popup[data-starting-style],
        .dialog-popup[data-ending-style] {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.9);
        }
      `}</style>
    </Dialog.Root>
  );
}

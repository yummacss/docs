import { AlertDialog } from "@base-ui/react/alert-dialog";

export default function ExampleAlertDialog() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="d-f ai-c jc-c h-10 bw-1 bc-silver-4 br-1 bg-silver-1 px-4 fs-md fw-500 c-red-8 us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 c-p b-0">
        Discard draft
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="p-f i-0 min-h-dvh bg-black/20 alert-dialog-backdrop" />
        <AlertDialog.Popup className="p-f t-half l-half w-96 bw-1 bc-silver-4 br-1 bg-silver-1 p-6 c-slate alert-dialog-popup">
          <AlertDialog.Title className="fs-lg fw-500 mb-1">
            Discard draft?
          </AlertDialog.Title>
          <AlertDialog.Description className="fs-md c-slate-6 mb-6">
            You can't undo this action.
          </AlertDialog.Description>
          <div className="d-f jc-fe g-4">
            <AlertDialog.Close className="d-f ai-c jc-c h-10 bw-1 bc-silver-4 br-1 bg-silver-1 px-4 fs-md fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 c-p b-0">
              Cancel
            </AlertDialog.Close>
            <AlertDialog.Close className="d-f ai-c jc-c h-10 bw-1 bc-silver-4 br-1 bg-silver-1 px-4 fs-md fw-500 c-red-8 us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 c-p b-0">
              Discard
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
      <style>{`
        .alert-dialog-backdrop {
          transition: opacity 150ms ease-out;
        }
        .alert-dialog-backdrop[data-starting-style],
        .alert-dialog-backdrop[data-ending-style] {
          opacity: 0;
        }
        .alert-dialog-popup {
          transform: translate(-50%, -50%);
          transition: opacity 150ms ease-out, transform 150ms ease-out;
        }
        .alert-dialog-popup[data-starting-style],
        .alert-dialog-popup[data-ending-style] {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.9);
        }
      `}</style>
    </AlertDialog.Root>
  );
}

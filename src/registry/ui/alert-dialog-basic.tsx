import { AlertDialog } from "@base-ui/react/alert-dialog";

export default function AlertDialogBasic() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="bg-red c-white px-4 py-2 br-0 fs-sm fw-500 h:bg-red-7 f:oc-red-2 f:os-s f:ow-2">
        Discard draft
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="p-f zi-50 t-0 l-0 r-0 b-0 bg-black/50 alert-dialog-backdrop" />
        <AlertDialog.Popup className="p-f zi-50 t-half l-half bw-1 bc-silver-4 br-0 p-6 bg-white w-96 alert-dialog-popup">
          <AlertDialog.Title className="ff-s fs-lg fw-600 c-black mb-2">
            Discard draft?
          </AlertDialog.Title>
          <AlertDialog.Description className="fs-sm c-slate-6 mb-6">
            You can't undo this action.
          </AlertDialog.Description>
          <div className="d-f jc-fe g-3">
            <AlertDialog.Close className="bg-white c-black bw-1 bc-silver-4 px-3 py-2 br-0 fs-sm fw-500 h:bg-silver-1 f:oc-silver-1 f:os-s f:ow-2">
              Cancel
            </AlertDialog.Close>
            <AlertDialog.Close className="bg-red c-white px-3 py-2 br-0 fs-sm fw-500 h:bg-red-7 f:oc-red-2 f:os-s f:ow-2">
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
          transform: translate(-50%, -50%) scale(0.95);
        }
      `}</style>
    </AlertDialog.Root>
  );
}

import { Dialog } from "@base-ui/react/dialog";

export default function DialogBasic() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-slate-8 c-white px-4 py-2 br-0 fs-sm fw-500 h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2">
        View notifications
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="p-f zi-50 t-0 l-0 r-0 b-0 bg-black/50 dialog-backdrop" />
        <Dialog.Popup className="p-f zi-50 t-half l-half bw-1 bc-silver-4 br-0 p-6 bg-white w-96 dialog-popup">
          <Dialog.Title className="ff-s fs-lg fw-600 c-black mb-2">
            Notifications
          </Dialog.Title>
          <Dialog.Description className="fs-sm c-slate-6 mb-6">
            You are all caught up. Good job!
          </Dialog.Description>
          <div className="d-f jc-fe g-3">
            <Dialog.Close className="bg-white c-black bw-1 bc-silver-4 px-3 py-2 br-0 fs-sm fw-500 h:bg-silver-1 f:oc-silver-1 f:os-s f:ow-2">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
      <style>{`
        .dialog-backdrop {
          transition: opacity 150ms ease-out;
        }
        .dialog-backdrop[data-starting-style],
        .dialog-backdrop[data-ending-style] {
          opacity: 0;
        }
        .dialog-popup {
          transform: translate(-50%, -50%);
          transition: opacity 150ms ease-out, transform 150ms ease-out;
        }
        .dialog-popup[data-starting-style],
        .dialog-popup[data-ending-style] {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.95);
        }
      `}</style>
    </Dialog.Root>
  );
}

import {
  ChatsIcon,
  MapPinPlusIcon,
  UserCheckIcon,
} from "@phosphor-icons/react";

export default function TimelineIcons() {
  return (
    <div className="d-f fd-c g-4">
      <div className="d-f g-4">
        <div className="d-f fd-c ai-c">
          <div className="d-f ai-c jc-c w-8 h-8 br-pill bg-silver-2 c-black fs-0">
            <UserCheckIcon size={20} />
          </div>
          <div className="w-px h-full bg-silver-2 my-1"></div>
        </div>
        <div className="pb-4">
          <p className="fs-sm fw-500 c-slate-8 mb-1 fw-600">Profile Updated</p>
          <p className="fs-xs c-silver-10 mb-2">November 01, 2024</p>
          <p className="fs-sm c-silver-12 lh-4">
            User updated their profile picture and bio information.
          </p>
        </div>
      </div>
      <div className="d-f g-4">
        <div className="d-f fd-c ai-c">
          <div className="d-f ai-c jc-c w-8 h-8 br-pill bg-silver-2 c-black fs-0">
            <ChatsIcon size={20} />
          </div>
          <div className="w-px h-full bg-silver-2 my-1"></div>
        </div>
        <div className="pb-4">
          <p className="fs-sm fw-500 c-slate-8 mb-1 fw-600">New Message</p>
          <p className="fs-xs c-silver-10 mb-2">November 03, 2024</p>
          <p className="fs-sm c-silver-12 lh-4">
            You received a new message from the support team regarding your
            ticket.
          </p>
        </div>
      </div>
      <div className="d-f g-4">
        <div className="d-f fd-c ai-c">
          <div className="d-f ai-c jc-c w-8 h-8 br-pill bg-silver-2 c-black fs-0">
            <MapPinPlusIcon size={20} />
          </div>
        </div>
        <div className="pt-1">
          <p className="fs-sm fw-500 c-slate-8 mb-1 fw-600">Location Added</p>
          <p className="fs-xs c-silver-10 mb-2">November 05, 2024</p>
          <p className="fs-sm c-silver-12 lh-4">
            A new shipping address was added to your account.
          </p>
        </div>
      </div>
    </div>
  );
}

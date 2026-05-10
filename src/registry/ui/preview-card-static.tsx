"use client";

import { Avatar } from "@base-ui/react/avatar";
import { PreviewCard } from "@base-ui/react/preview-card";

export default function PreviewCardStatic() {
  return (
    <PreviewCard.Root>
      <p className="m-0 c-slate-10 fs-sm">
        Assigned to{" "}
        <PreviewCard.Trigger
          className={(state) =>
            `c-indigo c-p fw-500 td-none h:td-u fv:td-u ${state.open ? "td-u" : ""}`
          }
        >
          Sarah
        </PreviewCard.Trigger>{" "}
        for review.
      </p>

      <PreviewCard.Portal>
        <PreviewCard.Positioner sideOffset={8}>
          <PreviewCard.Popup className="d-f fd-c g-3 w-64 p-3 bg-white bc-silver-2 br-xl bw-1 bs-o-xs">
            <div className="d-f ai-c g-3">
              <div className="p-r">
                <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 bc-white br-pill bw-1 va-m us-none">
                  <Avatar.Image
                    src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9"
                    alt="Sarah"
                    className="of-c w-full h-full"
                  />
                </Avatar.Root>
                <span className="p-a r-0 w-3 h-3 bg-green-6 bc-white br-pill bw-1" />
              </div>
              <div className="d-f fd-c g-0">
                <span className="c-slate-10 fs-sm fw-500">Sarah</span>
                <span className="c-slate-6 fs-xs">Frontend Developer</span>
              </div>
            </div>
            <div className="d-f ai-c g-2">
              <span className="c-slate-6 fs-xs">3 tasks assigned</span>
            </div>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}

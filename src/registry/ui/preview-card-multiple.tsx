"use client";

import { Avatar } from "@base-ui/react/avatar";
import { PreviewCard } from "@base-ui/react/preview-card";
import { motion } from "motion/react";

const previewContent = {
  sarah: (
    <div className="d-f fd-c g-3 w-56">
      <div className="d-f ai-c g-3">
        <div className="p-r">
          <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 bc-white br-9999 bw-1 va-m us-none">
            <Avatar.Image
              src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9"
              alt="Sarah"
              className="of-c w-100% h-100%"
            />
          </Avatar.Root>
          <span className="p-a r-0 b-0 w-3 h-3 bg-green-6 bc-white br-9999 bw-1" />
        </div>
        <div className="d-f fd-c g-0">
          <span className="c-slate-10 fs-sm fw-500">Sarah</span>
          <span className="c-slate-6 fs-xs">Frontend Developer</span>
        </div>
      </div>
      <div className="d-f ai-c g-2">
        <span className="c-slate-6 fs-xs">3 active tasks</span>
      </div>
    </div>
  ),
  john: (
    <div className="d-f fd-c g-3 w-56">
      <div className="d-f ai-c g-3">
        <div className="p-r">
          <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 bc-white br-9999 bw-1 va-m us-none">
            <Avatar.Image
              src="https://api.dicebear.com/9.x/open-peeps/svg?seed=John&backgroundColor=B4E9F2"
              alt="John"
              className="of-c w-100% h-100%"
            />
          </Avatar.Root>
          <span className="p-a r-0 b-0 w-3 h-3 bg-slate-4 bc-white br-9999 bw-1" />
        </div>
        <div className="d-f fd-c g-0">
          <span className="c-slate-10 fs-sm fw-500">John</span>
          <span className="c-slate-6 fs-xs">Backend Developer</span>
        </div>
      </div>
      <div className="d-f ai-c g-2">
        <span className="c-slate-6 fs-xs">5 active tasks</span>
      </div>
    </div>
  ),
};

export default function PreviewCardMultiple() {
  return (
    <PreviewCard.Root>
      {({ payload }) => (
        <>
          <p className="m-0 c-slate-10 fs-sm">
            Mentioned{" "}
            <PreviewCard.Trigger
              className={(state) =>
                `c-indigo c-p fw-500 td-none h:td-u fv:td-u ${state.open ? "td-u" : ""}`
              }
              payload={previewContent.sarah}
            >
              Sarah
            </PreviewCard.Trigger>{" "}
            or{" "}
            <PreviewCard.Trigger
              className={(state) =>
                `c-indigo c-p fw-500 td-none h:td-u fv:td-u ${state.open ? "td-u" : ""}`
              }
              payload={previewContent.john}
            >
              John
            </PreviewCard.Trigger>{" "}
            in a comment.
          </p>

          <PreviewCard.Portal>
            <PreviewCard.Positioner sideOffset={8}>
              <PreviewCard.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="d-f fd-c g-3 p-3 bg-white bc-silver-2 br-xl bw-1 bs-o-xs"
              >
                <>{payload}</>
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </>
      )}
    </PreviewCard.Root>
  );
}

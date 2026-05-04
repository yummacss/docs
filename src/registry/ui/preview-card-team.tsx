"use client";

import { Avatar } from "@base-ui/react/avatar";
import { PreviewCard } from "@base-ui/react/preview-card";
import { motion } from "motion/react";

export default function PreviewCardTeam() {
  return (
    <PreviewCard.Root>
      <p className="m-0 c-slate-10 fs-sm">
        Contact{" "}
        <PreviewCard.Trigger
          className={(state) =>
            `c-indigo fw-500 td-n h:td-u fv:td-u ${state.open ? "td-u" : ""}`
          }
        >
          @sarah
        </PreviewCard.Trigger>{" "}
        for the frontend work.
      </p>

      <PreviewCard.Portal>
        <PreviewCard.Positioner sideOffset={8}>
          <PreviewCard.Popup
            render={
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
            }
            className="d-f fd-c g-3 w-64 p-3 bg-white bc-silver-2 br-xl bw-1 bs-o-lg"
          >
            <div className="d-f ai-c g-3">
              <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 bc-white br-pill bw-1 va-m us-none">
                <Avatar.Image
                  src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9"
                  alt="Sarah"
                  className="of-c w-full h-full"
                />
              </Avatar.Root>
              <div className="d-f fd-c g-0">
                <span className="c-slate-10 fs-sm fw-500">Sarah Chen</span>
                <span className="c-slate-6 fs-xs">Frontend Engineer</span>
              </div>
            </div>
            <div className="d-f g-1 flex-wrap">
              <span className="d-f ai-c g-1 px-2 py-0 h-6 bg-indigo-1 bc-indigo-2 c-indigo-7 br-pill bw-1 fs-xs fw-500">
                React
              </span>
              <span className="d-f ai-c g-1 px-2 py-0 h-6 bg-indigo-1 bc-indigo-2 c-indigo-7 br-pill bw-1 fs-xs fw-500">
                TypeScript
              </span>
              <span className="d-f ai-c g-1 px-2 py-0 h-6 bg-indigo-1 bc-indigo-2 c-indigo-7 br-pill bw-1 fs-xs fw-500">
                CSS
              </span>
            </div>
            <div className="d-f ai-c g-2">
              <span className="c-slate-6 fs-xs">1.2k followers</span>
              <span className="c-slate-4 fs-xs">·</span>
              <span className="c-slate-6 fs-xs">340 following</span>
            </div>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}

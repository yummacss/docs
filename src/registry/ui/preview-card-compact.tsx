"use client";

import { Avatar } from "@base-ui/react/avatar";
import { PreviewCard } from "@base-ui/react/preview-card";
import { Clock } from "@gravity-ui/icons";
import { motion } from "motion/react";

export default function PreviewCardCompact() {
  return (
    <PreviewCard.Root>
      <p className="m-0 c-slate-10 fs-sm">
        View task{" "}
        <PreviewCard.Trigger
          className={(state) =>
            `c-indigo c-p fw-500 td-none h:td-u fv:td-u ${state.open ? "td-u" : ""}`
          }
        >
          #dashboard-redesign
        </PreviewCard.Trigger>{" "}
        details.
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
            className="d-f fd-c g-2 w-56 p-3 bg-white bc-silver-2 br-xl bw-1 bs-o-xs"
          >
            <div className="d-f fd-c g-1">
              <span className="c-slate-10 fs-sm fw-500">
                Dashboard Redesign
              </span>
              <span className="c-slate-6 fs-xs">#dashboard-redesign</span>
            </div>
            <div className="d-f ai-c g-2">
              <span className="d-f ai-c g-1 px-2 py-0 h-5 bg-silver-1 bc-silver-2 c-slate-7 br-9999 bw-1 fs-xs fw-500">
                In Progress
              </span>
            </div>
            <div className="d-f ai-c g-2">
              <span className="c-slate-6 fs-xs">Assigned to</span>
              <div className="d-f ai-c g-1 px-2 py-0 h-5 bg-silver-1/50 bc-silver-2 br-9999 bw-1">
                <Avatar.Root className="d-if o-h ai-c jc-c w-4 h-4 bc-white br-9999 bw-1 va-m us-none">
                  <Avatar.Image
                    src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9"
                    alt="Sarah"
                    className="of-c w-100% h-100%"
                  />
                </Avatar.Root>
                <span className="c-slate-10 fs-xs">@sarah</span>
              </div>
            </div>
            <div className="d-f ai-c g-2">
              <Clock className="w-3 h-3 c-slate-6" />
              <span className="c-slate-8 fs-xs">Feb 15, 2026</span>
            </div>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}

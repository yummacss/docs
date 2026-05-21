"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import { motion } from "motion/react";

export default function PreviewCardProject() {
  return (
    <PreviewCard.Root>
      <p className="m-0 c-slate-10 fs-sm">
        View{" "}
        <PreviewCard.Trigger
          className={(state) =>
            `c-indigo c-p fw-500 td-none h:td-u fv:td-u ${state.open ? "td-u" : ""}`
          }
        >
          Acme Website
        </PreviewCard.Trigger>{" "}
        project details.
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
            className="d-f fd-c g-3 w-64 p-3 bg-white bc-silver-2 br-lg bw-1 bs-o-xs"
          >
            <div className="d-f fd-c g-1">
              <span className="c-slate-10 fs-md fw-500">Acme Website</span>
            </div>
            <p className="m-0 c-slate-8 fs-xs lh-4">
              Main company website redesign with modern UI components.
            </p>
            <div className="d-f ai-c g-2">
              <span className="c-slate-6 fs-xs">8 team members</span>
              <span className="c-slate-4 fs-xs">·</span>
              <span className="c-slate-6 fs-xs">12 tasks</span>
            </div>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}

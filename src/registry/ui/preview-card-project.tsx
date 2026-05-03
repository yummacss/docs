"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import { SealCheck } from "@gravity-ui/icons";
import { motion } from "motion/react";

export default function PreviewCardProject() {
  return (
    <PreviewCard.Root>
      <p className="m-0 c-slate-10 fs-sm">
        Check out{" "}
        <PreviewCard.Trigger
          className={(state) =>
            `c-indigo fw-500 td-n h:td-u fv:td-u ${state.open ? "td-u" : ""}`
          }
        >
          @yummacss
        </PreviewCard.Trigger>{" "}
        project.
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
            <div className="d-f fd-c g-1">
              <span className="d-f ai-c g-1 c-slate-10 fs-md fw-500">
                Yumma CSS
                <SealCheck className="w-4 h-4 mr-1 c-indigo" />
              </span>
            </div>
            <p className="m-0 c-slate-8 fs-xs lh-4">
              If Yumma CSS helps you, consider sponsoring the project. 💜
            </p>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}

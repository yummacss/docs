"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import { Display, Video } from "@gravity-ui/icons";
import { motion } from "motion/react";

const previewContent = {
  desktop: (
    <div className="d-f fd-c g-2 w-48">
      <div className="d-f ai-c g-2">
        <Display className="w-6 h-6 c-slate-10" />
        <span className="c-slate-10 fs-sm fw-500">Desktop</span>
      </div>
      <p className="m-0 c-slate-8 fs-xs lh-4">
        Native desktop app for Windows and macOS.
      </p>
      <span className="c-slate-6 fs-xs">Version 2.1.0</span>
    </div>
  ),
  mobile: (
    <div className="d-f fd-c g-2 w-48">
      <div className="d-f ai-c g-2">
        <Video className="w-6 h-6 c-slate-10" />
        <span className="c-slate-10 fs-sm fw-500">Mobile</span>
      </div>
      <p className="m-0 c-slate-8 fs-xs lh-4">
        iOS and Android native applications.
      </p>
      <span className="c-slate-6 fs-xs">Version 2.1.0</span>
    </div>
  ),
};

export default function PreviewCardMultipleIcon() {
  return (
    <PreviewCard.Root>
      {({ payload }) => (
        <>
          <p className="m-0 c-slate-10 fs-sm">
            Get the app for{" "}
            <PreviewCard.Trigger
              className={(state) =>
                `d-f ai-c c-indigo fw-500 td-n h:td-u fv:td-u ${state.open ? "td-u" : ""}`
              }
              payload={previewContent.desktop}
            >
              <Display className="w-4 h-4 mr-1" />
              <span>Desktop</span>
            </PreviewCard.Trigger>{" "}
            or{" "}
            <PreviewCard.Trigger
              className={(state) =>
                `d-f ai-c c-indigo fw-500 td-n h:td-u fv:td-u ${state.open ? "td-u" : ""}`
              }
              payload={previewContent.mobile}
            >
              <Video className="w-4 h-4 mr-1" />
              <span>Mobile</span>
            </PreviewCard.Trigger>{" "}
            devices.
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
                className="d-f fd-c g-3 p-3 bg-white bc-silver-2 br-xl bw-1 bs-o-lg"
              >
                {payload}
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </>
      )}
    </PreviewCard.Root>
  );
}
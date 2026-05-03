"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import { LogoWindows, LogoMacos } from "@gravity-ui/icons";
import { motion } from "motion/react";

const previewContent = {
  windows: (
    <div className="d-f fd-c g-2 w-48">
      <div className="d-f ai-c g-2">
        <LogoWindows className="w-6 h-6 c-slate-10" />
        <span className="c-slate-10 fs-sm fw-500">Windows</span>
      </div>
      <p className="m-0 c-slate-8 fs-xs lh-4">
        Native Windows application with full system integration.
      </p>
      <span className="c-slate-6 fs-xs">Version 2.1.0</span>
    </div>
  ),
  macos: (
    <div className="d-f fd-c g-2 w-48">
      <div className="d-f ai-c g-2">
        <LogoMacos className="w-6 h-6 c-slate-10" />
        <span className="c-slate-10 fs-sm fw-500">macOS</span>
      </div>
      <p className="m-0 c-slate-8 fs-xs lh-4">
        Native macOS application with App Store support.
      </p>
      <span className="c-slate-6 fs-xs">Version 2.1.0</span>
    </div>
  ),
};

export default function PreviewCardMultipleIcon() {
  return (
    <PreviewCard.Root>
      {({ payload }) => (
        <span className="c-slate-10 fs-sm">
          Get the app for{" "}
          <PreviewCard.Trigger
            className={(state) =>
              `d-if ai-c c-indigo fw-500 td-n h:td-u fv:td-u ${state.open ? "td-u" : ""}`
            }
            payload={previewContent.windows}
          >
            <LogoWindows className="w-4 h-4 mr-1" />
            Windows
          </PreviewCard.Trigger>
          {" "}or{" "}
          <PreviewCard.Trigger
            className={(state) =>
              `d-if ai-c c-indigo fw-500 td-n h:td-u fv:td-u ${state.open ? "td-u" : ""}`
            }
            payload={previewContent.macos}
          >
            <LogoMacos className="w-4 h-4 mr-1" />
            macOS
          </PreviewCard.Trigger>{" "}apps.

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
        </span>
      )}
    </PreviewCard.Root>
  );
}
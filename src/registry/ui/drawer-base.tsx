"use client";

import { Button } from "@base-ui/react/button";
import { Drawer } from "@base-ui/react/drawer";
import { useState } from "react";

export default function DrawerBase() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger
        render={
          <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        Open drawer
      </Drawer.Trigger>
      <Drawer.Portal keepMounted>
        <Drawer.Backdrop
          className="p-f i-0 bg-black/20 bf-b-xs"
          style={(state) => ({
            opacity: state.open ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: state.open ? "auto" : "none",
          })}
        />
        <div className="p-f i-0 d-f ai-fe jc-c p-4 pb-0" style={{ pointerEvents: "none" }}>
          <Drawer.Viewport className="w-100%">
            <Drawer.Popup
              className="w-100% bg-white c-slate-12 br-xxl bs-o-lg o-h p-r"
              style={(state) => {
                const idle =
                  !state.transitionStatus ||
                  state.transitionStatus === "idle";
                const starting = state.transitionStatus === "starting";
                const ending = state.transitionStatus === "ending";

                let transform;
                let duration;

                if (starting) {
                  transform = "translateY(100%)";
                  duration = state.swiping ? "0ms" : "0.3s";
                } else if (ending) {
                  transform = "translateY(100%)";
                  duration = state.swiping
                    ? "0ms"
                    : "calc(var(--drawer-swipe-strength, 1) * 0.4s)";
                } else if (idle && state.open) {
                  transform =
                    "translateY(calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)))";
                  duration = state.swiping ? "0ms" : "0.3s";
                } else {
                  transform = "translateY(100%)";
                  duration = "0s";
                }

                return {
                  transform,
                  transition: `transform ${duration} cubic-bezier(0.32, 0.72, 0, 1)`,
                  maxHeight: "80vh",
                  pointerEvents: "auto",
                };
              }}
            >
              <div className="d-f jc-c pt-3 pb-1">
                <div className="w-8 h-1 bg-silver-3 br-9999" />
              </div>
              <div className="px-4 py-2">
                <Drawer.Title className="c-slate-10 fs-md fw-500">
                  Notifications
                </Drawer.Title>
              </div>
              <Drawer.Content className="px-4 py-2 pb-4 d-f fd-c g-3">
                <div className="d-f ai-c g-3 px-3 py-2 bg-silver-1 br-md">
                  <span className="w-2 h-2 bg-indigo br-50%" />
                  <div className="d-f fd-c">
                    <span className="c-slate-10 fs-sm fw-500">New message</span>
                    <span className="c-slate-6 fs-xs">2 min ago</span>
                  </div>
                </div>
                <div className="d-f ai-c g-3 px-3 py-2 bg-silver-1 br-md">
                  <span className="w-2 h-2 bg-mint br-50%" />
                  <div className="d-f fd-c">
                    <span className="c-slate-10 fs-sm fw-500">Task completed</span>
                    <span className="c-slate-6 fs-xs">15 min ago</span>
                  </div>
                </div>
                <div className="d-f ai-c g-3 px-3 py-2 bg-silver-1 br-md">
                  <span className="w-2 h-2 bg-coral br-50%" />
                  <div className="d-f fd-c">
                    <span className="c-slate-10 fs-sm fw-500">Payment failed</span>
                    <span className="c-slate-6 fs-xs">1 hour ago</span>
                  </div>
                </div>
                <div className="d-f ai-c g-3 px-3 py-2 bg-silver-1 br-md">
                  <span className="w-2 h-2 bg-yellow br-50%" />
                  <div className="d-f fd-c">
                    <span className="c-slate-10 fs-sm fw-500">Meeting reminder</span>
                    <span className="c-slate-6 fs-xs">30 min ago</span>
                  </div>
                </div>
                <div className="d-f ai-c g-3 px-3 py-2 bg-silver-1 br-md">
                  <span className="w-2 h-2 bg-cyan br-50%" />
                  <div className="d-f fd-c">
                    <span className="c-slate-10 fs-sm fw-500">Friend request</span>
                    <span className="c-slate-6 fs-xs">2 hours ago</span>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </div>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

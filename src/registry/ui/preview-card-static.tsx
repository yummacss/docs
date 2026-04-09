"use client";

import { PreviewCard } from "@base-ui/react/preview-card";

export default function PreviewCardStatic() {
  return (
    <PreviewCard.Root>
      <p className="m-0 c-slate-10 fs-sm">
        Learn more about{" "}
        <PreviewCard.Trigger
          className={(state) =>
            `c-indigo fw-600 td-n h:td-u fv:td-u ${state.open ? "td-u" : ""}`
          }
          href="https://en.wikipedia.org/wiki/Responsive_web_design"
        >
          responsive design
        </PreviewCard.Trigger>{" "}
        and modern web layouts.
      </p>

      <PreviewCard.Portal>
        <PreviewCard.Positioner sideOffset={8}>
          <PreviewCard.Popup className="d-f fd-c g-2 w-64 p-3 bg-white bc-silver-2 br-md bw-1 bs-o-lg">
            <img
              width="232"
              height="140"
              className="d-b w-full h-auto br-md"
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=464&h=280"
              alt="MacBook with code on screen"
            />
            <p className="m-0 c-slate-8 fs-xs lh-4">
              <strong className="c-slate-10 fw-600">Responsive design</strong>{" "}
              adapts layouts to different screen sizes for optimal viewing.
            </p>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}

"use client";

import { PreviewCard } from "@base-ui/react/preview-card";

export default function ExamplePreviewCard() {
  return (
    <PreviewCard.Root>
      <p className="fs-md c-slate-12">
        The principles of good{" "}
        <PreviewCard.Trigger
          className="c-blue-8 td-n h:td-u fv:td-u preview-card-trigger"
          href="https://en.wikipedia.org/wiki/Typography"
        >
          typography
        </PreviewCard.Trigger>{" "}
        remain in the digital age.
      </p>

      <PreviewCard.Portal>
        <PreviewCard.Positioner sideOffset={8}>
          <PreviewCard.Popup className="d-f fd-c g-2 w-56 p-2 br-2 bg-white bsh-md bw-1 bc-silver-4 preview-card-popup">
            {/* biome-ignore lint: Using img for external URL */}
            <img
              width="224"
              height="150"
              className="d-b w-full h-auto br-1"
              src="https://images.unsplash.com/photo-1619615391095-dfa29e1672ef?q=80&w=448&h=300"
              alt="Station Hofplein signage in Rotterdam, Netherlands"
            />
            <p className="fs-sm c-slate-11 m-0">
              <strong className="fw-600 c-slate-12">Typography</strong> is the
              art and science of arranging type to make written language clear,
              visually appealing, and effective in communication.
            </p>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>

      <style>{`
        .preview-card-trigger[data-popup-open] {
          text-decoration: underline;
        }
        .preview-card-popup {
          transform-origin: var(--transform-origin);
          transition: transform 150ms, opacity 150ms;
        }
        .preview-card-popup[data-starting-style],
        .preview-card-popup[data-ending-style] {
          opacity: 0;
          transform: scale(0.95);
        }
      `}</style>
    </PreviewCard.Root>
  );
}

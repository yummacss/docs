"use client";

import { PreviewCard } from "@base-ui/react/preview-card";

export default function ExamplePreviewCard() {
  return (
    <PreviewCard.Root>
      <p className="max-w-64 fs-md c-slate">
        The principles of good{" "}
        <PreviewCard.Trigger
          className="c-blue-8 td-n h:td-u preview-card-trigger"
          href="https://en.wikipedia.org/wiki/Typography"
        >
          typography
        </PreviewCard.Trigger>{" "}
        remain into the digital age.
      </p>

      <PreviewCard.Portal>
        <PreviewCard.Positioner sideOffset={8}>
          <PreviewCard.Popup className="d-f fd-c g-2 w-60 p-2 br-1 bg-white bs-md bw-1 bc-silver-4 preview-card-popup">
            {/* biome-ignore lint: Using img for external URL */}
            <img
              width="448"
              height="300"
              className="d-b w-full br-1"
              src="https://images.unsplash.com/photo-1619615391095-dfa29e1672ef?q=80&w=448&h=300"
              alt="Station Hofplein signage in Rotterdam, Netherlands"
            />
            <p className="fs-sm c-slate m-0">
              <strong>Typography</strong> is the art and
              science of arranging type to make written language clear, visually
              appealing, and effective in communication.
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
          transform: scale(0.9);
        }
      `}</style>
    </PreviewCard.Root>
  );
}

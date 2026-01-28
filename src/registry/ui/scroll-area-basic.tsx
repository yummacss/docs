import { ScrollArea } from "@base-ui/react/scroll-area";

export default function ExampleScrollArea() {
  return (
    <ScrollArea.Root className="p-r h-36 w-96 max-w-full">
      <ScrollArea.Viewport className="h-full br-1 bw-1 bc-silver-4 fv:os-s fv:ow-2 fv:oc-blue-8 scroll-area-viewport">
        <div className="d-f fd-c g-4 py-3 pr-6 pl-4 fs-sm c-slate-12">
          <p className="m-0">
            Vernacular architecture is building done outside any academic
            tradition, and without professional guidance. It is not a particular
            architectural movement or style, but rather a broad category,
            encompassing a wide range and variety of building types, with
            differing methods of construction, from around the world, both
            historical and extant and classical and modern.
          </p>
          <p className="m-0">
            This type of architecture usually serves immediate, local needs, is
            constrained by the materials available in its particular region and
            reflects local traditions and cultural practices. The study of
            vernacular architecture does not examine formally schooled
            architects, but instead that of the design skills and tradition of
            local builders, who were rarely given any attribution for the work.
          </p>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="p-a r-0 t-0 b-0 z-1 scroll-area-scrollbar">
        <ScrollArea.Thumb className="br-pill scroll-area-thumb" />
      </ScrollArea.Scrollbar>

      <style>{`
        .scroll-area-viewport {
          overscroll-behavior: contain;
        }
        .scroll-area-scrollbar {
          display: flex;
          justify-content: center;
          background-color: #ecedee;
          width: 0.25rem;
          border-radius: 0.375rem;
          margin: 0.5rem;
          opacity: 0;
          transition: opacity 150ms;
          pointer-events: none;
        }
        .scroll-area-scrollbar[data-scrolling] {
          transition-duration: 0ms;
        }
        .scroll-area-scrollbar[data-hovering],
        .scroll-area-scrollbar[data-scrolling] {
          opacity: 1;
          pointer-events: auto;
        }
        .scroll-area-scrollbar::before {
          content: '';
          position: absolute;
          width: 1.25rem;
          height: 100%;
        }
        .scroll-area-thumb {
          width: 100%;
          border-radius: inherit;
          background-color: #757580;
        }
      `}</style>
    </ScrollArea.Root>
  );
}

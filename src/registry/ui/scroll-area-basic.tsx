"use client";

import { ScrollArea } from "@base-ui/react/scroll-area";

export default function ExampleScrollArea() {
  return (
    <ScrollArea.Root className="p-r h-36 w-96 max-w-full">
      <ScrollArea.Viewport className="h-full br-2 bw-1 bc-silver-2 fv:os-s fv:ow-2 fv:oc-indigo-6">
        <div className="d-f fd-c g-4 py-3 pr-6 pl-4 fs-sm c-slate-10">
          <p className="m-0 lh-5">
            Design systems help teams build consistent, scalable user
            interfaces. They provide a shared language between designers and
            developers, ensuring that components look and behave the same across
            an entire product.
          </p>
          <p className="m-0 lh-5">
            A well-structured design system includes typography, color palettes,
            spacing guidelines, and reusable components. By establishing these
            foundations, teams can work more efficiently and reduce the time
            spent on repetitive decisions.
          </p>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className={(state) =>
          `p-a r-0 t-0 b-0 z-1 d-f jc-c w-1 br-2 m-2 ${
            state.hovering || state.scrolling ? "o-100 pe-a" : "o-0 pe-none"
          } bg-silver-2`
        }
      >
        <ScrollArea.Thumb className="w-full br-2 bg-slate-5" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

import { Button } from "@base-ui/react/button";
import { ArrowRightIcon } from "@phosphor-icons/react";

export default function HeroSectionBasic() {
  return (
    <section className="py-16 px-6 ta-c">
      <div className="max-w-sm m-auto">
        <h1 className="ff-s fs-5xl fw-600 c-slate-10 mb-4 lh-1">
          Build beautiful products faster
        </h1>
        <p className="fs-lg c-silver-10 mb-8 m-0 lh-4">
          The modern platform for teams to design, develop, and ship stunning
          experiences without the complexity.
        </p>
        <div className="d-f jc-c g-3">
          <Button className="d-f h-12 ai-c jc-c bw-1 bc-silver-4 br-pill bg-silver-1 px-5 fs-md fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
            Get started
          </Button>
          <Button className="d-f h-12 ai-c jc-c g-2 bw-1 bc-silver-4 br-pill bg-white px-5 fs-md fw-500 c-slate us-none h:bg-silver-1 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
            <span>Learn more</span>
            <ArrowRightIcon size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}

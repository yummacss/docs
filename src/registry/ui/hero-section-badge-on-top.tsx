import { Button } from "@base-ui/react/button";
import { SparkleIcon } from "@phosphor-icons/react";

export default function HeroSectionBadgeOnTop() {
  return (
    <section className="py-16 px-6 ta-c">
      <div className="max-w-sm m-auto">
        <div className="d-f jc-c mb-4">
          <span className="d-f ai-c g-2 bg-indigo-1 c-indigo-8 px-3 py-1 br-pill fs-xs fw-600">
            <SparkleIcon size={16} weight="fill" />
            <span>New features available</span>
          </span>
        </div>
        <h1 className="ff-s fs-5xl fw-600 c-slate-10 mb-4 lh-1">
          The future of work starts here
        </h1>
        <p className="fs-lg c-silver-10 mb-8 m-0 lh-4">
          Empower your team with tools that simplify collaboration and boost
          productivity across every project.
        </p>
        <div className="d-f jc-c g-3">
          <Button className="d-f h-12 ai-c jc-c bw-1 bc-silver-4 br-pill bg-silver-1 px-5 fs-md fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
            Start free trial
          </Button>
          <Button className="d-f h-12 ai-c jc-c bw-1 bc-silver-4 br-pill bg-white px-5 fs-md fw-500 c-slate us-none h:bg-silver-1 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
            View demo
          </Button>
        </div>
      </div>
    </section>
  );
}

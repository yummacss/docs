import { Button } from "@base-ui/react/button";
import { CheckIcon } from "@phosphor-icons/react";

export default function PricingSectionBasic() {
  return (
    <section className="py-12 px-6">
      <div className="ta-c mb-10">
        <h2 className="ff-s fs-3xl fw-600 c-slate-10 mb-2">
          Simple, transparent pricing
        </h2>
        <p className="fs-md c-silver-10 m-0">
          Choose the plan that works best for you
        </p>
      </div>
      <div className="d-f fw-w jc-c g-6">
        <div className="w-72 bw-1 bc-silver-4 br-1 bs-xs p-6 d-f fd-c">
          <div className="mb-6">
            <h3 className="ff-s fs-lg fw-600 c-slate-10 mb-1">Free</h3>
            <p className="fs-sm c-silver-10 m-0">
              For individuals getting started
            </p>
          </div>
          <div className="mb-6">
            <span className="fs-4xl fw-600 c-slate-10">€0</span>
            <span className="fs-sm c-silver-10">/month</span>
          </div>
          <ul className="d-f fd-c g-3 mb-6 p-0">
            <li className="d-f ai-c g-2">
              <CheckIcon size={16} className="c-green" />
              <span className="fs-sm c-slate-8">Up to 3 projects</span>
            </li>
            <li className="d-f ai-c g-2">
              <CheckIcon size={16} className="c-green" />
              <span className="fs-sm c-slate-8">Basic analytics</span>
            </li>
            <li className="d-f ai-c g-2">
              <CheckIcon size={16} className="c-green" />
              <span className="fs-sm c-slate-8">Community support</span>
            </li>
          </ul>
          <Button className="d-f h-10 ai-c jc-c w-full bw-1 bc-silver-4 br-1 bg-silver-1 mt-auto px-4 fs-sm fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
            Get started
          </Button>
        </div>
        <div className="p-r w-72 bw-2 bc-slate-8 br-1 bs-xs p-6 d-f fd-c">
          <div className="p-a t-0 l-0 r-0 h-0 d-f jc-c ai-c">
            <span className="br-1 bg-slate-8 px-2 py-1 fs-xs fw-500 c-white">
              Popular
            </span>
          </div>
          <div className="mb-6">
            <h3 className="ff-s fs-lg fw-600 c-slate-10 m-0">Premium</h3>
            <p className="fs-sm c-silver-10 m-0">
              For growing teams and businesses
            </p>
          </div>
          <div className="mb-6">
            <span className="fs-4xl fw-600 c-slate-10">€59</span>
            <span className="fs-sm c-silver-10">/month</span>
          </div>
          <ul className="d-f fd-c g-3 mb-6 p-0">
            <li className="d-f ai-c g-2">
              <CheckIcon size={16} className="c-green" />
              <span className="fs-sm c-slate-8">Unlimited projects</span>
            </li>
            <li className="d-f ai-c g-2">
              <CheckIcon size={16} className="c-green" />
              <span className="fs-sm c-slate-8">Advanced analytics</span>
            </li>
            <li className="d-f ai-c g-2">
              <CheckIcon size={16} className="c-green" />
              <span className="fs-sm c-slate-8">Priority support</span>
            </li>
            <li className="d-f ai-c g-2">
              <CheckIcon size={16} className="c-green" />
              <span className="fs-sm c-slate-8">Custom integrations</span>
            </li>
          </ul>
          <Button className="d-f h-10 ai-c jc-c w-full bw-1 bc-silver-4 br-1 bg-silver-1 mt-auto px-4 fs-sm fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
            Get started
          </Button>
        </div>
      </div>
    </section>
  );
}

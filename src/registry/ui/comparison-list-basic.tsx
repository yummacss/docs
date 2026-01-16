import { CheckIcon, XIcon } from "@phosphor-icons/react";

export default function ComparisonListBasic() {
  return (
    <div className="max-w-sm">
      <div className="d-f fd-c g-3">
        <div className="d-f ai-c g-3">
          <div className="d-f ai-c jc-c d-6 br-pill bg-green-1 c-green">
            <CheckIcon size={16} weight="bold" />
          </div>
          <span className="fs-sm c-slate">Unlimited projects</span>
        </div>
        <div className="d-f ai-c g-3">
          <div className="d-f ai-c jc-c d-6 br-pill bg-green-1 c-green">
            <CheckIcon size={16} weight="bold" />
          </div>
          <span className="fs-sm c-slate">Priority support</span>
        </div>
        <div className="d-f ai-c g-3">
          <div className="d-f ai-c jc-c d-6 br-pill bg-green-1 c-green">
            <CheckIcon size={16} weight="bold" />
          </div>
          <span className="fs-sm c-slate">Custom integrations</span>
        </div>
        <div className="d-f ai-c g-3">
          <div className="d-f ai-c jc-c d-6 br-pill bg-red-1 c-red">
            <XIcon size={16} weight="bold" />
          </div>
          <span className="fs-sm c-slate-6">Dedicated account manager</span>
        </div>
      </div>
    </div>
  );
}

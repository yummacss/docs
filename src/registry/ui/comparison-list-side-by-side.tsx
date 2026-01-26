import { CheckIcon, XIcon } from "@phosphor-icons/react";

export default function ComparisonListSideBySide() {
  return (
    <div className="d-g gtc-2 g-8">
      <div>
        <h3 className="fs-md fw-600 c-slate mb-4">Included</h3>
        <div className="d-f fd-c g-3">
          <div className="d-f ai-c g-2">
            <CheckIcon size={16} weight="bold" className="c-green" />
            <span className="fs-sm c-slate">Unlimited bandwidth</span>
          </div>
          <div className="d-f ai-c g-2">
            <CheckIcon size={16} weight="bold" className="c-green" />
            <span className="fs-sm c-slate">SSL certificate</span>
          </div>
          <div className="d-f ai-c g-2">
            <CheckIcon size={16} weight="bold" className="c-green" />
            <span className="fs-sm c-slate">24/7 monitoring</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="fs-md fw-600 c-slate mb-4">Not included</h3>
        <div className="d-f fd-c g-3">
          <div className="d-f ai-c g-2">
            <XIcon size={16} weight="bold" className="c-red" />
            <span className="fs-sm c-slate-6">Custom domain</span>
          </div>
          <div className="d-f ai-c g-2">
            <XIcon size={16} weight="bold" className="c-red" />
            <span className="fs-sm c-slate-6">Priority support</span>
          </div>
          <div className="d-f ai-c g-2">
            <XIcon size={16} weight="bold" className="c-red" />
            <span className="fs-sm c-slate-6">API access</span>
          </div>
        </div>
      </div>
    </div>
  );
}

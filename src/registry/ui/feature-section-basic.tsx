import {
  GaugeIcon,
  LightningIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";

export default function FeatureSectionBasic() {
  return (
    <section className="py-12 px-6">
      <div className="d-g gtc-3 g-8">
        <div className="d-f fd-c">
          <div className="d-f ai-c jc-c d-10 br-pill bg-silver-2 c-silver-9 mb-4">
            <LightningIcon size={24} />
          </div>
          <h3 className="fs-lg fw-600 c-slate-10 mb-2">Lightning fast</h3>
          <p className="fs-sm c-silver-10 m-0">
            Optimized for speed with instant loading times and smooth
            interactions.
          </p>
        </div>
        <div className="d-f fd-c">
          <div className="d-f ai-c jc-c d-10 br-pill bg-silver-2 c-silver-9 mb-4">
            <ShieldCheckIcon size={24} />
          </div>
          <h3 className="fs-lg fw-600 c-slate-10 mb-2">Secure by default</h3>
          <p className="fs-sm c-silver-10 m-0">
            Enterprise-grade security built into every layer of the platform.
          </p>
        </div>
        <div className="d-f fd-c">
          <div className="d-f ai-c jc-c d-10 br-pill bg-silver-2 c-silver-9 mb-4">
            <GaugeIcon size={24} />
          </div>
          <h3 className="fs-lg fw-600 c-slate-10 mb-2">Fully customizable</h3>
          <p className="fs-sm c-silver-10 m-0">
            Adapt every aspect to match your brand and workflow perfectly.
          </p>
        </div>
      </div>
    </section>
  );
}

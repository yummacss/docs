import {
  GaugeIcon,
  LightningIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";

export default function FeatureSectionCentered() {
  return (
    <section className="py-12 px-6">
      <div className="d-g gtc-3 g-8 ta-c">
        <div className="d-f fd-c ai-c">
          <div className="d-f ai-c jc-c d-12 br-pill bg-silver-2 c-silver-9 mb-4">
            <LightningIcon size={24} />
          </div>
          <h3 className="ff-s fs-lg fw-600 c-slate-10 mb-2">Lightning fast</h3>
          <p className="fs-sm c-silver-10 m-0">
            Optimized for speed with instant loading times.
          </p>
        </div>
        <div className="d-f fd-c ai-c">
          <div className="d-f ai-c jc-c d-12 br-pill bg-silver-2 c-silver-9 mb-4">
            <ShieldCheckIcon size={24} />
          </div>
          <h3 className="ff-s fs-lg fw-600 c-slate-10 mb-2">
            Secure by default
          </h3>
          <p className="fs-sm c-silver-10 m-0">
            Enterprise-grade security built in.
          </p>
        </div>
        <div className="d-f fd-c ai-c">
          <div className="d-f ai-c jc-c d-12 br-pill bg-silver-2 c-silver-9 mb-4">
            <GaugeIcon size={24} />
          </div>
          <h3 className="ff-s fs-lg fw-600 c-slate-10 mb-2">
            Fully customizable
          </h3>
          <p className="fs-sm c-silver-10 m-0">
            Adapt every aspect to your needs.
          </p>
        </div>
      </div>
    </section>
  );
}

import { AtIcon, HeadsetIcon, MapPinIcon } from "@phosphor-icons/react";

export default function ContactSectionBasic() {
  return (
    <section className="py-12 px-6">
      <h2 className="fs-3xl fw-600 c-slate-10 mb-6">Contact us</h2>
      <div className="d-g gtc-1 sm:gtc-3 g-6">
        <div className="p-6 bw-1 bc-silver-4 br-1">
          <div className="d-f ai-c jc-c d-10 br-pill bg-silver-1 c-slate mb-4">
            <HeadsetIcon size={20} />
          </div>
          <h3 className="fs-md fw-600 c-slate-10 mb-1">Live Chat</h3>
          <p className="fs-sm c-silver-10 m-0">Chat with us in real-time</p>
        </div>
        <div className="p-6 bw-1 bc-silver-4 br-1">
          <div className="d-f ai-c jc-c d-10 br-pill bg-silver-1 c-slate mb-4">
            <AtIcon size={20} />
          </div>
          <h3 className="fs-md fw-600 c-slate-10 mb-1">Email</h3>
          <p className="fs-sm c-silver-10 m-0">company@example.com</p>
        </div>
        <div className="p-6 bw-1 bc-silver-4 br-1">
          <div className="d-f ai-c jc-c d-10 br-pill bg-silver-1 c-slate mb-4">
            <MapPinIcon size={20} />
          </div>
          <h3 className="fs-md fw-600 c-slate-10 mb-1">Office</h3>
          <p className="fs-sm c-silver-10 m-0">123 Main St, City</p>
        </div>
      </div>
    </section>
  );
}

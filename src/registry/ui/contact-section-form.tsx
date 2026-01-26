import { Button } from "@base-ui/react/button";
import { Field } from "@base-ui/react/field";
import { AtIcon, HeadsetIcon, MapPinIcon } from "@phosphor-icons/react";

export default function ContactSectionForm() {
  return (
    <section className="py-12 px-6">
      <div className="d-f fw-w g-12">
        <div className="f-1 min-w-64">
          <h2 className="fs-3xl fw-600 c-slate-10 mb-2">Contact us</h2>
          <p className="fs-md c-silver-10 mb-6 m-0">
            We'd love to hear from you. Reach out anytime.
          </p>
          <div className="d-f fd-c g-4">
            <div className="d-f ai-c g-3">
              <div className="d-f ai-c jc-c d-10 br-pill bw-1 bc-silver-4 c-slate-9">
                <HeadsetIcon size={20} />
              </div>
              <div>
                <p className="fs-sm fw-600 c-slate-9 m-0">Live Chat</p>
                <p className="fs-sm c-silver-10 m-0">
                  Chat with us in real-time
                </p>
              </div>
            </div>
            <div className="d-f ai-c g-3">
              <div className="d-f ai-c jc-c d-10 br-pill bw-1 bc-silver-4 c-slate-9">
                <AtIcon size={20} />
              </div>
              <div>
                <p className="fs-sm fw-600 c-slate-9 m-0">Email</p>
                <p className="fs-sm c-silver-10 m-0">company@example.com</p>
              </div>
            </div>
            <div className="d-f ai-c g-3">
              <div className="d-f ai-c jc-c d-10 br-pill bw-1 bc-silver-4 c-slate-9">
                <MapPinIcon size={20} />
              </div>
              <div>
                <p className="fs-sm fw-600 c-slate-9 m-0">Address</p>
                <p className="fs-sm c-silver-10 m-0">
                  123 Main St, City, Country
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="f-1 min-w-64">
          <form className="d-f fd-c g-4">
            <Field.Root className="d-f fd-c g-1">
              <Field.Label className="fs-sm fw-600 c-slate-9">Name</Field.Label>
              <Field.Control
                type="text"
                placeholder="Your name"
                className="w-full bw-1 bc-silver-4 br-1 bg-white px-3 py-2 fs-sm c-slate f:os-s f:ow-2 f:oo--1 f:oc-blue-8"
              />
            </Field.Root>
            <Field.Root className="d-f fd-c g-1">
              <Field.Label className="fs-sm fw-600 c-slate-9">
                Email
              </Field.Label>
              <Field.Control
                type="email"
                placeholder="you@example.com"
                className="w-full bw-1 bc-silver-4 br-1 bg-white px-3 py-2 fs-sm c-slate f:os-s f:ow-2 f:oo--1 f:oc-blue-8"
              />
            </Field.Root>
            <Field.Root className="d-f fd-c g-1">
              <Field.Label className="fs-sm fw-600 c-slate-9">
                Message
              </Field.Label>
              <textarea
                placeholder="Your message"
                rows={4}
                className="w-full bw-1 bc-silver-4 br-1 bg-white px-3 py-2 fs-sm c-slate f:os-s f:ow-2 f:oo--1 f:oc-blue-8 rz-n"
              />
            </Field.Root>
            <Button className="d-f h-10 ai-c jc-c bw-1 bc-silver-4 br-1 bg-silver-1 px-4 fs-sm fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
              Send message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@base-ui/react/button";
import { Field } from "@base-ui/react/field";
import { NewspaperIcon } from "@phosphor-icons/react";

export default function NewsletterSectionCentered() {
  return (
    <section className="py-12 px-6 ta-c">
      <div className="max-w-md m-auto">
        <div className="d-f jc-c mb-4">
          <div className="d-f ai-c jc-c d-12 br-pill bg-slate-8 c-white">
            <NewspaperIcon size={24} />
          </div>
        </div>
        <h2 className="fs-xxl fw-600 c-slate-10 mb-2">
          Subscribe to our newsletter
        </h2>
        <p className="fs-sm c-silver-10 mb-6 m-0">
          Join thousands of subscribers and get weekly insights.
        </p>
        <div className="d-f g-2">
          <Field.Root className="f-1">
            <Field.Control
              type="email"
              placeholder="you@example.com"
              className="w-full bw-1 bc-silver-4 br-1 bg-white px-3 py-2 fs-sm c-slate-12 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8"
            />
          </Field.Root>
          <Button className="d-f h-10 ai-c jc-c bw-1 bc-silver-4 br-1 bg-silver-1 px-4 fs-sm fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
            Subscribe
          </Button>
        </div>
        <p className="fs-xs c-silver-8 mt-3 m-0">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}

import { Button } from "@base-ui/react/button";
import { Field } from "@base-ui/react/field";

export default function NewsletterSectionBasic() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-md m-auto">
        <h2 className="ff-s fs-xxl fw-600 c-slate-10 mb-2">Stay in the loop</h2>
        <p className="fs-sm c-silver-10 mb-6 m-0">
          Get the latest updates and news delivered to your inbox.
        </p>
        <div className="d-f g-2">
          <Field.Root className="f-1">
            <Field.Control
              type="email"
              placeholder="you@example.com"
              className="w-full bw-1 bc-silver-4 br-1 bg-white px-3 py-2 fs-sm c-slate f:os-s f:ow-2 f:oo--1 f:oc-blue-8"
            />
          </Field.Root>
          <Button className="d-f h-10 ai-c jc-c bw-1 bc-silver-4 br-1 bg-silver-1 px-4 fs-sm fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}

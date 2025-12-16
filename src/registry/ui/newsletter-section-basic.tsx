export default function NewsletterSectionBasic() {
  return (
    <div className="py-12 px-6">
      <div className="max-w-md m-auto">
        <h2 className="ff-s fs-xxl fw-600 tc-slate-10 mb-2">
          Stay in the loop
        </h2>
        <p className="fs-sm tc-silver-10 mb-6 m-0">
          Get the latest updates and news delivered to your inbox.
        </p>
        <div className="d-f g-2">
          <input
            type="email"
            placeholder="you@example.com"
            className="f-1 b-1 bc-silver-4 tc-black px-3 py-2 rad-0 fs-md f:oc-silver-1 f:os-s f:ow-2"
          />
          <button
            type="submit"
            className="ai-c d-f jc-c px-4 py-2 rad-0 fs-sm fw-500 bg-slate-8 tc-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

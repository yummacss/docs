export default function TextareaError() {
  return (
    <div className="d-f fd-c g-1 w-full">
      <label htmlFor="error-message" className="tc-slate-12 fw-600">
        Message
      </label>
      <textarea
        id="error-message"
        placeholder="Write your message..."
        rows={4}
        className="bg-red-1/15 px-3 py-2 rad-0 fs-md bc-red-6 b-1 f:oc-red-2 f:os-s f:ow-2 w-full"
      ></textarea>
      <span className="tc-red fs-xs">Message cannot be empty.</span>
    </div>
  );
}

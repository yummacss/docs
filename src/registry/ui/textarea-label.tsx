

export default function TextareaLabel() {
  return (
    <div className="d-f fd-c g-2 w-full">
      <label htmlFor="message" className="tc-silver-12 fw-600">
        Message
      </label>
      <textarea
        id="message"
        placeholder="Write your message..."
        rows={4}
        className="b-1 bc-silver-4 tc-black px-3 py-2 rad-0 fs-md f:oc-silver-1 f:os-s f:ow-2 w-full"
      ></textarea>
    </div>
  );
}

export default function TextareaBasic() {
  return (
    <textarea
      placeholder="Write your message..."
      rows={4}
      className="b-1 bc-silver-4 tc-black px-3 py-2 rad-0 fs-md f:oc-silver-1 f:os-s f:ow-2 w-full"
      aria-label="Message"
    />
  );
}

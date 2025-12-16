export default function TextareaDescriptive() {
  return (
    <div className="d-f fd-c g-2 w-full">
      <label htmlFor="bio" className="tc-silver-12 fw-600">
        Bio
      </label>
      <textarea
        id="bio"
        placeholder="Tell us about yourself..."
        rows={4}
        className="b-1 bc-silver-4 tc-black px-3 py-2 rad-0 fs-md f:oc-silver-1 f:os-s f:ow-2 w-full"
      ></textarea>
      <p className="fs-xs tc-silver-10">Write a short biography to display on your profile.</p>
    </div>
  );
}


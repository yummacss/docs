/** Spinner shown while a lazy registry preview chunk loads. */
export default function PreviewSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading preview"
      className="preview-spinner w-5 h-5"
    />
  );
}

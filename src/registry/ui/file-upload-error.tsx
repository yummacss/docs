import { CloudUpload } from "iconoir-react";

export default function FileUploadError() {
  return (
    <section className="d-f fd-c ai-c g-3 w-100 bg-white bc-red-5 br-xxl bw-2 bs-d">
      <div className="d-f fd-c ai-c g-2 p-8 bg-white ta-c">
        <div className="d-f ai-c jc-c w-10 h-10 bg-red-1/50 bc-red-5 br-lg bw-1">
          <CloudUpload className="w-5 h-5 c-red" />
        </div>
        <div className="d-f fd-c ai-c g-1">
          <span className="c-slate-10 fs-sm fw-500">
            <a className="c-indigo td-none c-p">Upload team logo</a> or drag and
            drop
          </span>
          <span className="c-red-5 fs-xs fw-400">
            Invalid file format. Please use JPG or PNG.
          </span>
        </div>
      </div>
    </section>
  );
}

import { CloudUpload } from "iconoir-react";

export default function FileUploadDisabled() {
  return (
    <section className="d-f fd-c ai-c g-3 w-100 bg-silver-1/50 bc-silver-2 br-xxl bw-2 bs-d o-50 c-na">
      <div className="d-f fd-c ai-c g-2 p-8 ta-c">
        <div className="d-f ai-c jc-c w-10 h-10 bg-white bc-silver-2 br-lg bw-1 bs-o-xs">
          <CloudUpload className="w-5 h-5 c-slate-6" />
        </div>
        <div className="d-f fd-c ai-c g-1">
          <span className="c-slate-10 fs-sm fw-500">
            <a className="c-indigo/50 td-none c-p">Upload project brief</a> or
            drag and drop
          </span>
          <span className="c-slate-6 fs-xs fw-400">
            Upload enabled after project approval
          </span>
        </div>
      </div>
    </section>
  );
}

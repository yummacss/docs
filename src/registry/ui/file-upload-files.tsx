"use client";

import { Progress } from "@base-ui/react/progress";
import { CircleCheckFill, CloudArrowUpIn, FileLetterP, FileLetterW, TrashBin } from "@gravity-ui/icons";

export default function FileUploadFiles() {

  return (
    <div className="d-f fd-c g-3 w-100">
      <section className="d-f fd-c ai-c g-3 w-100 bc-silver-2 br-xl bw-2 bs-d">
        <div className="d-f fd-c ai-c g-2 p-8 bg-white">
          <div className="d-f ai-c jc-c w-10 h-10 bg-white bc-silver-2 br-lg bw-1 bs-o-xs">
            <CloudArrowUpIn className="w-5 h-5 c-slate-6" />
          </div>
          <div className="d-f fd-c ai-c g-1">
            <span className="c-slate-10 fs-sm fw-500">
              <a className="c-indigo td-none c-p">Click to upload</a> or drag and drop
            </span>
            <span className="c-slate-6 fs-xs fw-400">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </span>
          </div>
        </div>
      </section>
      {files.map((file, index) => (
        <section
          key={index}
          className="d-f fd-c g-2 p-4 bg-white bc-silver-2 br-xl bw-1 bs-o-xs"
        >
          <div className="d-f jc-sb ai-c">
            <div className="d-f ai-c g-2">
              <file.icon className={`w-5 h-5 ${file.color}`} />
              <div className="d-f fd-c">
                <span className="c-slate-10 fs-sm fw-500">{file.name}</span>
                <span className="c-slate-6 fs-xs">{file.size}</span>
              </div>
            </div>
            <div className="d-f ai-c g-3">
              <div className="d-f ai-c g-1">
                <CircleCheckFill className="w-4 h-4 c-green" />
                <span className="c-slate-6 fs-xs">Complete</span>
              </div>
              <button className="d-f b-0 ai-c jc-c w-6 h-6 p-0 bg-transparent us-none cursor-pointer">
                <TrashBin className="w-4 h-4 c-slate-6 h:c-red" />
              </button>
            </div>
          </div>
          <Progress.Root className="d-f fd-c g-1 w-full" value={100}>
            <Progress.Track className="o-h h-1 bg-silver-2 br-pill">
              <Progress.Indicator className="h-full bg-indigo br-pill" />
            </Progress.Track>
          </Progress.Root>
          <span className="c-slate-6 fs-xs">100%</span>
        </section>
      ))}
    </div>
  );
}

const files = [
    {
      icon: FileLetterP,
      color: "c-orange",
      name: "project.pdf",
      size: "2.4 MB",
    },
    {
      icon: FileLetterW,
      color: "c-blue",
      name: "document.docx",
      size: "1.2 MB",
    },
    {
      icon: FileLetterW,
      color: "c-green",
      name: "spreadsheet.xlsx",
      size: "856 KB",
    },
  ];
"use client";

import { Button } from "@base-ui/react/button";
import { Fieldset } from "@base-ui/react/fieldset";
import { Input } from "@base-ui/react/input";
import { CloudUpload, Xmark } from "iconoir-react";
import type { ChangeEvent, DragEvent, ReactNode } from "react";
import { useId, useRef, useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type Border = "dashed" | "solid";

const FOCUS = "fv:os-s fv:ow-3 fv:oo-0 fv:oc-silver-3/60 fv:bc-silver-5";

const ZONE = "d-f fd-c ai-c g-3 m-0 p-0 w-100 min-w-0 bg-white";

const SHAPES: Record<Shape, string> = {
  rounded: "br-xxl",
  square: "br-0",
  squircle: "br-3xl cs-s",
};

const BORDERS: Record<Border, string> = {
  dashed: "bw-2 bs-d",
  solid: "bw-1",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const UNITS = ["B", "KB", "MB", "GB"];

function formatSize(bytes: number) {
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < UNITS.length - 1) {
    size /= 1024;
    unit += 1;
  }
  return `${size < 10 && unit > 0 ? size.toFixed(1) : Math.round(size)} ${UNITS[unit]}`;
}

export interface FileUploadProps {
  label?: string;
  hint?: string;
  description?: string;
  icon?: ReactNode;
  accept?: string;
  multiple?: boolean;
  onFilesChange?: (files: File[]) => void;
  shape?: Shape;
  shadow?: Shadow;
  border?: Border;
  error?: string;
  disabled?: boolean;
  className?: string;
  focus?: boolean | string;
}

export default function FileUploadBase({
  label = "Upload files",
  hint = "Drag and drop files here",
  description,
  icon,
  accept,
  multiple = false,
  onFilesChange,
  shape = "square",
  shadow = "none",
  border = "dashed",
  error,
  disabled = false,
  className,
  focus = true,
}: FileUploadProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";
  const browseOutline = focus
    ? merge(
        FOCUS,
        "fv:oo-1",
        error ? "fv:oc-red-2/60" : "",
        focus === true ? "" : focus,
      )
    : "";

  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const message = error ?? description;

  const commit = (next: File[]) => {
    setFiles(next);
    onFilesChange?.(next);
  };

  const identity = (file: File) =>
    `${file.name}:${file.size}:${file.lastModified}`;

  const add = (incoming: FileList | null) => {
    if (!incoming?.length) return;
    const picked = Array.from(incoming);

    if (!multiple) {
      commit(picked.slice(0, 1));
      return;
    }

    const held = new Set(files.map(identity));
    const fresh = picked.filter((file) => {
      const key = identity(file);
      if (held.has(key)) return false;
      held.add(key);
      return true;
    });

    if (fresh.length > 0) commit([...files, ...fresh]);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    add(event.target.files);
    event.target.value = "";
  };

  const onDragOver = (event: DragEvent) => {
    if (disabled) return;
    event.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (event: DragEvent) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null))
      return;
    setDragging(false);
  };

  const onDrop = (event: DragEvent) => {
    if (disabled) return;
    event.preventDefault();
    setDragging(false);
    add(event.dataTransfer.files);
  };

  const zone = merge(
    ZONE,
    SHAPES[shape],
    BORDERS[border],
    error ? "bc-red-5" : "bc-silver-2",
    disabled
      ? "bg-silver-1 c-slate-5 c-na"
      : dragging
        ? "bc-slate-12 bg-silver-2/50"
        : "",
    className,
  );

  return (
    <Fieldset.Root
      aria-label={label}
      className={zone}
      onDragEnter={onDragOver}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <Input
        ref={input}
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={onChange}
        className="d:none"
      />

      <div className="d:f fd:c ai:c g:2 p:8 ta:c">
        <div
          className={merge(
            "d-f ai-c jc-c w-10 h-10 bw-1",
            SHAPES[shape],
            SHADOWS[shadow],
            error ? "bg-red-1/50 bc-red-5" : "bg-white bc-silver-2",
          )}
        >
          {icon ?? (
            <CloudUpload
              className={`w:5 h:5 ${error ? "c:red-5" : "c:slate-6"}`}
            />
          )}
        </div>
        <div className="d:f fd:c ai:c g:1">
          <span className={`fs:sm fw:500 ${error ? "c:red-5" : "c:slate-10"}`}>
            <Button
              disabled={disabled}
              onClick={() => input.current?.click()}
              className={merge(
                browseOutline,
                "p-0 bg-transparent bw-0 fs-sm fw-500 c-p d:c-na",
                error ? "c-red-5" : "c-slate-12",
              )}
            >
              {label}
            </Button>{" "}
            or drag and drop
          </span>
          <span className={`fs:xs fw:400 ${error ? "c:red-5" : "c:slate-6"}`}>
            {hint}
          </span>
        </div>
      </div>

      {files.length > 0 && (
        <div className="d:f fd:c g:1 w:100% px:6 pb:6">
          {files.map((file) => (
            <div
              key={identity(file)}
              className={merge(
                "d-f ai-c jc-sb g-3 px-3 py-2 bg-silver-1/50 bc-silver-2 bw-1",
                SHAPES[shape],
              )}
            >
              <span className="o:h fs:xs c:slate-10 to:e ws:nw">
                {file.name}
              </span>
              <span className="d:f ai:c g:2 fs:xs c:slate-6">
                {formatSize(file.size)}
                <Button
                  aria-label={`Remove ${file.name}`}
                  disabled={disabled}
                  onClick={() =>
                    commit(files.filter((entry) => entry !== file))
                  }
                  className={merge(
                    outline,
                    "d-f ai-c jc-c w-5 h-5 p-0 bg-transparent bw-0 c-slate-6 c-p h:c-slate-10",
                    SHAPES[shape],
                  )}
                >
                  <Xmark className="w:4 h:4" />
                </Button>
              </span>
            </div>
          ))}
        </div>
      )}

      {message && (
        <p
          className={`w:100% m:0 pb:6 fs:xs ta:c ${error ? "c:red-5" : "c:slate-6"}`}
        >
          {message}
        </p>
      )}
    </Fieldset.Root>
  );
}

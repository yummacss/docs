"use client";

import {
  FileCssIcon,
  FileIcon,
  HashIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getTemplateBySlug } from "@/utils/templates";

export default function TemplateDetailsSidebar() {
  const pathname = usePathname();
  const slug = pathname?.replace("/ui/templates/", "") || "";
  const template = getTemplateBySlug(slug);

  if (!template) {
    return null;
  }

  return (
    <aside className="d-none lg:d-b lg:gc-s-3 blw-1 bc-white/5">
      <div
        className="p-st o-y-auto"
        style={{
          top: "6rem",
          maxHeight: "calc(100vh - 6rem)",
        }}
      >
        <div className="px-8">
          <h3 className="fs-md fw-400 tt-c mb-4 c-white">
            About {template.name}
          </h3>

          {/* Price */}
          <div className="mb-6">
            <span className="fs-3xl fw-600 c-white">€{template.price}</span>
            <span className="fs-sm c-white/60 ml-1">/ one-time purchase</span>
          </div>

          {/* CTAs */}
          <div className="d-f fd-c g-2 mb-6">
            <Link
              href={template.purchaseUrl}
              target="_blank"
              className="d-f ai-c jc-c bg-white c-black px-4 py-3 br-0 fw-600 fs-sm h:bg-white/90"
            >
              Get template
            </Link>
            <Link
              href={template.previewUrl}
              target="_blank"
              className="d-f ai-c jc-c bw-1 bc-white/10 px-4 py-3 br-0 fw-500 fs-sm h:bc-white/15 c-white"
            >
              Live Preview
            </Link>
          </div>

          {/* Yumma CSS, Pages & Version - inline with duotone icons */}
          <div className="d-f g-6 mb-6 pb-6 bbw-1 bc-white/10">
            <div className="d-f ai-c g-2">
              <FileCssIcon size={16} className="c-white" weight="duotone" />
              <div>
                <p className="fs-xs fw-500 c-white">Yumma CSS</p>
                <p className="fs-sm c-white/60">{template.version}</p>
              </div>
            </div>
            <div className="d-f ai-c g-2">
              <FileIcon size={16} className="c-white" weight="duotone" />
              <div>
                <p className="fs-xs fw-500 c-white">Pages</p>
                <p className="fs-sm c-white/60">{template.pageCount}</p>
              </div>
            </div>
            <div className="d-f ai-c g-2">
              <HashIcon size={16} className="c-white" weight="duotone" />
              <div>
                <p className="fs-xs fw-500 c-white">Version</p>
                <p className="fs-sm c-white/60">{template.templateVersion}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

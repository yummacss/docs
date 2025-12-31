"use client";

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
            <span className="fs-sm c-white/60 ml-1">/ one-time</span>
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
              className="d-f ai-c jc-c bw-1 bc-white/20 bg-black/20 px-4 py-3 br-0 fw-500 fs-sm h:bg-black/20 c-white"
            >
              Live Preview
            </Link>
          </div>

          {/* Yumma CSS & Version - inline */}
          <div className="d-g gtc-2 g-4 mb-6 pb-6 bbw-1 bc-white/10">
            <div>
              <p className="fs-xs c-white/50 mb-1">Yumma CSS</p>
              <p className="fs-sm c-white">{template.yummacssVersion}</p>
            </div>
            <div>
              <p className="fs-xs c-white/50 mb-1">Version</p>
              <p className="fs-sm c-white">{template.templateVersion}</p>
            </div>
          </div>

          {/* What's included */}
          <div className="mb-6">
            <h4 className="fs-sm fw-500 c-white mb-3">What's included</h4>
            <ul className="d-f fd-c g-2 fs-xs c-white/70">
              <li>• Full source code</li>
              <li>• Neutral & colorful versions</li>
              <li>• Lifetime updates</li>
              <li>• Discord support</li>
            </ul>
          </div>

          {/* Badges */}
          <div>
            <h4 className="fs-sm fw-500 c-white mb-3">Features</h4>
            <div className="d-f fw-w g-2">
              {template.badges.map((badge) => (
                <span
                  key={badge.label}
                  className="px-2 py-1 bg-white/10 br-0 fs-xs c-white/70"
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

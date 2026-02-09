"use client";

import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPageIcon, getTemplateBySlug } from "@/utils/templates";

export default function TemplateDetailsSidebar() {
  const pathname = usePathname();
  const slug = pathname?.replace("/ui/templates/", "") || "";
  const template = getTemplateBySlug(slug);

  if (!template) {
    return null;
  }

  return (
    <aside className="d-none lg:d-b lg:gc-s-3 blw-1 bc-white/10">
      <div
        className="p-st t-24 o-y-auto"
        style={{
          maxHeight: "calc(100vh - 6rem)",
        }}
      >
        <div className="px-8 pb-12">
          <div className="mb-1">
            <h3 className="fs-md fw-400 tt-c c-white m-0">
              About {template.name}
            </h3>
          </div>
          <p className="fs-sm c-white/50 m-0 mb-6">{template.tagline}</p>

          {/* Price */}
          <div className="mb-6">
            <span className="fs-3xl fw-600 c-white">€{template.price}</span>
            <span className="fs-sm c-white/60 ml-1">/ one-time purchase</span>
          </div>

          {/* CTAs */}
          <div className="d-f fd-c g-2 mb-6">
            <Link
              href={template.checkoutUrl}
              className="d-f ai-c jc-c bg-white c-black px-4 py-3 fw-600 fs-sm h:bg-white/90 us-none fv:oc-indigo-4 fv:ow-2"
            >
              Get template
            </Link>
            <Link
              href={template.previewUrl}
              target="_blank"
              className="d-f ai-c jc-c g-2 bg-transparent c-white px-4 py-3 fw-500 fs-sm bw-1 bc-white/20 h:bg-white/5 us-none fv:oc-indigo-4 fv:ow-2"
            >
              <span>Live preview</span>
              <ArrowSquareOutIcon size={16} weight="bold" />
            </Link>
          </div>

          {/* Divider */}
          <div className="bbw-1 bc-white/10 mb-6" />

          {/* Pages Section */}
          <div className="mb-6">
            <h4 className="fs-sm fw-500 c-white mb-3">
              Pages ({template.pages.length})
            </h4>
            <ul className="d-f fd-c g-2 us-none">
              {template.pages.map((page) => {
                const PageIcon = getPageIcon(page.title);
                return (
                  <li key={page.path} className="d-f ai-c g-2 fs-sm c-white/70">
                    <PageIcon size={20} weight="duotone" />
                    <span>{page.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}

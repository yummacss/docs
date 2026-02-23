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
    <aside className="d-none bc-white/10 blw-1 lg:d-b lg:gc-s-3">
      <div
        className="p-st t-20 o-y-auto"
        style={{
          maxHeight: "calc(100vh - 3rem)",
        }}
      >
        <div className="px-8 pb-12">
          <div className="mb-1">
            <h3 className="m-0 c-white fs-md fw-400 tt-c">
              About {template.name}
            </h3>
          </div>
          <p className="c-white/50 m-0 mb-6 fs-sm">{template.tagline}</p>

          {/* Price */}
          <div className="mb-6">
            <span className="c-white fs-3xl fw-600">€{template.price}</span>
            <span className="c-white/60 ml-1 fs-sm">/ one-time purchase</span>
          </div>

          {/* CTAs */}
          <div className="d-f fd-c g-2 mb-6">
            <Link
              href={template.checkoutUrl}
              className="d-f ai-c jc-c px-4 py-3 bg-white c-black fw-600 fs-sm us-none h:bg-white/90 fv:oc-white fv:ow-2"
            >
              Get template
            </Link>
            <Link
              href={template.previewUrl}
              target="_blank"
              className="d-f ai-c jc-c g-2 px-4 py-3 bc-white/20 bg-transparent c-white bw-1 fw-500 fs-sm us-none h:bg-white/5 fv:oc-white fv:ow-2"
            >
              <span>Live preview</span>
              <ArrowSquareOutIcon size={16} weight="bold" />
            </Link>
          </div>

          {/* Divider */}
          <div className="mb-6 bc-white/10 bbw-1" />

          {/* Pages Section */}
          <div className="mb-6">
            <h4 className="mb-3 c-white fs-sm fw-500">
              Pages ({template.pages.length})
            </h4>
            <ul className="d-f fd-c g-2 us-none">
              {template.pages.map((page) => {
                const PageIcon = getPageIcon(page.title);
                return (
                  <li key={page.path} className="d-f c-white/70 ai-c g-2 fs-sm">
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

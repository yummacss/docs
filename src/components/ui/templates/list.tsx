import Image from "next/image";
import Link from "next/link";
import { templates } from "@/utils/templates";

export default function TemplatesList() {
  return (
    <div className="d-f fd-c g-16 my-8">
      {templates.map((template) => (
        <div key={template.slug} className="d-f fd-c lg:fd-r g-8">
          {/* Left - Info */}
          <div className="f-s-0 w-full max-w-70">
            <Link
              href={`/ui/templates/${template.slug}`}
              className="fs-lg fw-600 c-white mb-1 d-b"
            >
              {template.name}
            </Link>
            <p className="fs-sm c-white/50 m-0 mb-3">{template.tagline}</p>
            <p className="fs-sm c-white/60 m-0 mb-4 lh-4">
              {template.description}
            </p>
            <p className="fs-sm c-white/50 m-0">
              <span className="c-white fw-500">€{template.price}</span>
              {" / one-time purchase"}
            </p>
          </div>

          {/* Right - Screenshot */}
          <div className="f-1">
            <Link
              href={`/ui/templates/${template.slug}`}
              className="p-r ar-16/9 o-h br-0 bg-white/5 d-b h:o-90 tr-a"
            >
              <Image
                src={template.cover}
                alt={`${template.name} preview`}
                fill
                className="of-c us-none"
                unoptimized
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

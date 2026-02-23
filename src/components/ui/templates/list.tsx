import Image from "next/image";
import Link from "next/link";
import { templates } from "@/utils/templates";

export default function TemplatesList() {
  return (
    <div className="d-f fd-c g-16 my-8">
      {templates.map((template) => (
        <div key={template.slug} className="d-f fd-c g-8 lg:fd-r">
          {/* Left - Info */}
          <div className="f-s-0 w-full max-w-70">
            <Link
              href={`/ui/templates/${template.slug}`}
              className="d-b mb-1 c-white fs-lg fw-600"
            >
              {template.name}
            </Link>
            <p className="c-white/50 m-0 mb-3 fs-sm">{template.tagline}</p>
            <p className="c-white/60 m-0 mb-4 fs-sm lh-4">
              {template.description}
            </p>
            <p className="c-white/50 m-0 fs-sm">
              <span className="c-white fw-500">€{template.price}</span>
              {" / one-time purchase"}
            </p>
          </div>

          {/* Right - Screenshot */}
          <div className="f-1">
            <Link
              href={`/ui/templates/${template.slug}`}
              className="d-b p-r o-h ar-16/9 bg-white/5 br-0 tr-a h:o-90"
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

import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import Link from "next/link";

interface Props {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  basePath: string;
}

export default function Pagination({ previous, next, basePath }: Props) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="d-f fd-c g-4 mt-16 pt-8 sm:fd-r">
      {previous ? (
        <Link
          href={`${basePath}/${previous.slug}`}
          className="d-f ai-c g-2 f-1 p-4 bc-white/10 bs-s fv:oc-white fv:ow-2"
        >
          <ChevronLeft className="w-5 h-5 c-white/70" />
          <div className="d-f fd-c">
            <span className="c-white/70 fs-sm">Previous</span>
            <span className="c-white h:c-white/90">{previous.title}</span>
          </div>
        </Link>
      ) : (
        <div className="f-1" />
      )}
      {next ? (
        <Link
          href={`${basePath}/${next.slug}`}
          className="d-f ai-c jc-fe g-2 f-1 p-4 bc-white/10 bs-s fv:oc-white fv:ow-2"
        >
          <div className="d-f fd-c ta-r">
            <span className="c-white/70 fs-sm">Next</span>
            <span className="c-white h:c-white/90">{next.title}</span>
          </div>
          <ChevronRight className="w-5 h-5 c-white/70" />
        </Link>
      ) : (
        <div className="f-1" />
      )}
    </nav>
  );
}

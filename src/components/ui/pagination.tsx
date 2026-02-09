import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
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
    <nav className="d-f fd-c sm:fd-r g-4 mt-16 pt-8 btw-1 bc-white/10">
      {previous ? (
        <Link
          href={`${basePath}/${previous.slug}`}
          className="d-f ai-c g-2 f-1 p-4 br-0 bc-white/10 bs-s fv:oc-indigo-4 fv:ow-2"
        >
          <CaretLeftIcon size={20} className="c-white/70" />
          <div className="d-f fd-c">
            <span className="fs-sm c-white/70">Previous</span>
            <span className="c-white h:c-white/90">{previous.title}</span>
          </div>
        </Link>
      ) : (
        <div className="f-1" />
      )}
      {next ? (
        <Link
          href={`${basePath}/${next.slug}`}
          className="d-f ai-c jc-fe g-2 f-1 p-4 br-0 bc-white/10 bs-s fv:oc-indigo-4 fv:ow-2"
        >
          <div className="d-f fd-c ta-r">
            <span className="fs-sm c-white/70">Next</span>
            <span className="c-white h:c-white/90">{next.title}</span>
          </div>
          <CaretRightIcon size={20} className="c-white/70" />
        </Link>
      ) : (
        <div className="f-1" />
      )}
    </nav>
  );
}

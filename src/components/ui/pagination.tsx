"use client";

import { Button } from "@base-ui/react/button";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
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
    <div className="d-f ai-c g-2">
      {previous ? (
        <Button
          nativeButton={false}
          render={<Link href={`${basePath}/${previous.slug}`} />}
          aria-label={`Previous: ${previous.title}`}
          className="d-f ai-c jc-c w-8 h-8 bc-clay bg-midnight c-white bw-1 h:bg-midnight-7 fv:oc-white fv:oo-2"
        >
          <CaretLeftIcon className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          disabled
          aria-label="No previous page"
          className="d-f ai-c jc-c w-8 h-8 bc-clay/30 bg-midnight c-white/30 bw-1 c-p-none"
        >
          <CaretLeftIcon className="w-4 h-4" />
        </Button>
      )}

      {next ? (
        <Button
          nativeButton={false}
          render={<Link href={`${basePath}/${next.slug}`} />}
          aria-label={`Next: ${next.title}`}
          className="d-f ai-c jc-c w-8 h-8 bc-clay bg-midnight c-white bw-1 h:bg-midnight-7 fv:oc-white fv:oo-2"
        >
          <CaretRightIcon className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          disabled
          aria-label="No next page"
          className="d-f ai-c jc-c w-8 h-8 bc-clay/30 bg-midnight c-white/30 bw-1 c-p-none"
        >
          <CaretRightIcon className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

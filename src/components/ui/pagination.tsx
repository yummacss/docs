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
      {previous && (
        <Button
          nativeButton={false}
          render={<Link href={`${basePath}/${previous.slug}`} />}
          aria-label={`Previous: ${previous.title}`}
          className="d-f ai-c jc-c w-8 h-8 bc-border bg-surface a:bg-surface-7 c-accent bw-1 fv:oc-white fv:oo-2"
        >
          <CaretLeftIcon className="w-4 h-4" />
        </Button>
      )}

      {next && (
        <Button
          nativeButton={false}
          render={<Link href={`${basePath}/${next.slug}`} />}
          aria-label={`Next: ${next.title}`}
          className="d-f ai-c jc-c w-8 h-8 bc-border bg-surface a:bg-surface-7 c-accent bw-1 fv:oc-white fv:oo-2"
        >
          <CaretRightIcon className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

"use client";
import { Link as RouterLink } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, Ref } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; prefetch?: boolean; ref?: Ref<HTMLAnchorElement> };

// next/link on the router's Link
export default function Link({ href, prefetch, ...rest }: Props) {
  if (!href.startsWith("/")) return <a href={href} {...rest} />;
  return <RouterLink to={href} preload={prefetch === false ? false : "intent"} {...rest} />;
}

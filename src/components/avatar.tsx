import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import type * as React from "react";

interface Props {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Avatar({ src, alt, fallback, className = "", style }: Props) {
  const initials =
    fallback ||
    alt
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <BaseAvatar.Root
      className={`d-if jc-c ai-c br-pill us-none fw-500 fs-sm lh-1 o-h w-8 h-8 ${className}`}
      style={{
        color: "#989ec2",
        backgroundColor: "#21243f",
        ...style,
      }}
    >
      <BaseAvatar.Image src={src} alt={alt} className="of-c h-full w-full" />
      <BaseAvatar.Fallback className="d-f jc-c ai-c h-full w-full fs-md">
        {initials}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}

import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import type React from "react";

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
      className={`d-f jc-c ai-c us-none fw-500 fs-sm lh-1 o-h w-8 h-8 bg-charcoal ${className}`}
      style={{
        color: "#989ec2",
        ...style,
      }}
    >
      <BaseAvatar.Image src={src} alt={alt} className="of-c w-100% h-100%" />
      <BaseAvatar.Fallback className="d-f jc-c ai-c w-100% h-100% fs-md">
        {initials}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}

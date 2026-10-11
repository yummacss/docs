import type { ImgHTMLAttributes } from "react";

// next/image without the optimiser: the spike measures the framework, not image delivery
export default function Image({ priority, fill, ...rest }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; fill?: boolean }) {
  return <img alt="" {...rest} />;
}

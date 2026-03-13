export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

import { makeOGResponse } from "@/lib/og";
export default () => makeOGResponse("Type less. Style more.", "/");

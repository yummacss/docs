import { allUis } from "content-collections";
import { getRegistryTarget } from "@/registry";

export function pageSlug(pathname: string) {
  return pathname
    .replace(/^\/ui\/components\//, "")
    .replace(/^\/ui\//, "")
    .replace(/\/$/, "");
}

export function primitiveSlug(slug: string, installId?: string) {
  const primitive = allUis.find((ui) => ui._meta.path === slug)?.primitive;
  if (!primitive) return null;

  return typeof primitive === "string"
    ? primitive
    : getRegistryTarget(installId ?? slug).component;
}

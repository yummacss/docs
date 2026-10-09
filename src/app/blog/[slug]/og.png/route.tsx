import { allBlogs } from "content-collections";
import { blogOg, ogImage } from "@/utils/og-image";

export const dynamicParams = false;

export function generateStaticParams() {
  return allBlogs.map((post) => ({ slug: post._meta.path }));
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  return ogImage(blogOg((await params).slug));
}

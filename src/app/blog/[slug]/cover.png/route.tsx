import { coverImage, coverParams } from "@/utils/cover-image";

export const dynamicParams = false;

export const generateStaticParams = coverParams;

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  return coverImage((await params).slug);
}

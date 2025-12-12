import type { Metadata } from "next";

const description = "Beautiful UI components built with Yumma CSS.";

export const metadata: Metadata = {
  title: {
    default: "Yumma UI - Beautiful UI components built with Yumma CSS.",
    template: "%s | Yumma UI",
  },
  description,
  metadataBase: new URL("https://yummacss.com"),
  openGraph: {
    images: "/ui-og.png",
  },
};

export default function UILayout({ children }: { children: React.ReactNode }) {
  return children;
}

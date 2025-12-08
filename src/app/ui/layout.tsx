import type { Metadata } from "next";

const description =
  "A CLI-first CSS framework for the web with abbreviated styles.";

export const metadata: Metadata = {
  title: {
    default: "Yumma UI - Beautiful UI components built with Yumma CSS.",
    template: "%s | Yumma UI",
  },
  description,
  metadataBase: new URL("https://yummacss.com/ui"),
  openGraph: {
    images: "/ui-og.png",
  },
};

export default function UILayout({ children }: { children: React.ReactNode }) {
  return children;
}

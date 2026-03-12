import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

const description = "An atomic CSS framework with abbreviated class names.";

export const metadata: Metadata = {
  title: {
    default: "Yumma CSS - Style more, type even less",
    template: "%s - Yumma CSS",
  },
  description,
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  metadataBase: new URL("https://yummacss.com"),
  openGraph: {
    images: "/og.png",
  },
  other: {
    "llms": "/llms.txt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="sb-s spt-20" lang="en">
      <body style={{ backgroundColor: "#151724" }}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

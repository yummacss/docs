import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

const description =
  "A CLI-first CSS framework for the web with abbreviated styles.";

export const metadata: Metadata = {
  title: {
    default: "Yumma CSS - Style more, type even less",
    template: "%s - Yumma CSS",
  },
  description,
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  metadataBase: new URL("https://yummacss.com"),
  openGraph: {
    images: "/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="sb-s spt-20 s::bg-blue-10" lang="en">
      <body style={{ backgroundColor: "#151724" }}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

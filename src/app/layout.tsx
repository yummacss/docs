import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

const description =
  "Yumma CSS is an ergonomic CSS framework with abbreviated utility classes. Write d-f instead of flex, fw-600 instead of font-bold. Faster styling, less typing.";

export const metadata: Metadata = {
  title: {
    default: "Yumma CSS - Type less. Style more.",
    template: "%s - Yumma CSS",
  },
  description,
  keywords: [
    "abbreviated css",
    "atomic css",
    "css framework",
    "ergonomic css framework",
    "tailwind alternative",
    "utility classes",
  ],
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
    llms: "/llms.txt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="sb-s spt-20" lang="en" data-scroll-behavior="smooth">
      <body style={{ backgroundColor: "#151724" }}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

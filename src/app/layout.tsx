import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";

const description =
  "Yumma CSS is a utility framework whose class names are derived from CSS property names by one rule. No invented vocabulary, no lookup tables: just CSS, compressed.";

export const metadata: Metadata = {
  title: {
    default: "Yumma CSS - Utility CSS with no new vocabulary",
    template: "%s · Yumma CSS",
  },
  description,
  keywords: [
    "utility css",
    "css framework",
    "derived class names",
    "css-native",
    "utility classes",
  ],
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  metadataBase: new URL("https://yummacss.com"),
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Yumma CSS - Utility CSS with no new vocabulary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yumma CSS - Utility CSS with no new vocabulary",
    description,
    images: ["/og.png"],
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
    <html
      className="sb-s spt-20 s::bg-accent-dim/10"
      lang="en"
      data-scroll-behavior="smooth"
    >
      <body className="bg-page">
        {children}
        <Analytics />
        <SpeedInsights />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Yumma CSS",
            url: "https://yummacss.com",
            description,
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Yumma CSS",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            description,
            url: "https://yummacss.com",
          }}
        />
      </body>
    </html>
  );
}

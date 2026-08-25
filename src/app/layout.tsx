import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { themeInitScript } from "@/lib/theme";

const description =
  "Fixed scales for spacing, colors, type and radius. No arbitrary values to drift.";

export const metadata: Metadata = {
  title: {
    default: "Yumma CSS - Get faster at CSS while you use it",
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
        alt: "Yumma CSS - Get faster at CSS while you use it",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yumma CSS - Get faster at CSS while you use it",
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
      className="cs-ld sb-s spt-20 s::bg-accent-dim/10"
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap, not user input */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-page c-accent-dim">
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}

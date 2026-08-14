import React from "react";
import config from "@config/index.json";
import theme from "@config/theme/index.json";
import "styles/style.scss";
import { Providers } from "./providers";
import type { Metadata, Viewport } from "next";

const { meta_author, meta_description, meta_image } = config.metadata;
const { base_url, title, favicon } = config.site;

export const metadata: Metadata = {
  metadataBase: new URL(base_url || "https://awd.my.id"),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description: meta_description,
  authors: [{ name: meta_author, url: "https://awd.my.id" }],
  icons: {
    icon: favicon || "/images/favicon.png",
  },
  openGraph: {
    title: title,
    description: meta_description,
    url: base_url,
    siteName: title,
    images: [
      {
        url: meta_image,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: meta_description,
    images: [meta_image],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const fontUrl = `https://fonts.googleapis.com/css2?family=${pf}${
    sf ? "&family=" + sf : ""
  }&display=swap`;

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={fontUrl} />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

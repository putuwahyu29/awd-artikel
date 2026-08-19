import React from "react";
import config from "@config/index.json";
import theme from "@config/theme/index.json";
import "../styles/style.scss";
import { Providers } from "./providers";
import type { Metadata, Viewport } from "next";
import { generatePersonSchema, generateWebSiteSchema } from "@lib/schemaGenerator";

const { meta_author, meta_description, meta_image } = config.metadata;
const { base_url, title, favicon } = config.site;

const siteBaseUrl = base_url || "https://blog.awd.my.id";
const fullMetaImage = meta_image.startsWith("http")
  ? meta_image
  : `${siteBaseUrl}${meta_image}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description: meta_description,
  authors: [{ name: meta_author, url: "https://awd.my.id" }],
  creator: meta_author,
  publisher: title,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: favicon || "/images/favicon.png",
    shortcut: favicon || "/images/favicon.png",
    apple: favicon || "/images/favicon.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: siteBaseUrl,
    types: {
      "application/rss+xml": `${siteBaseUrl}/rss.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: title,
    description: meta_description,
    url: siteBaseUrl,
    siteName: title,
    locale: "id_ID",
    images: [
      {
        url: fullMetaImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: meta_description,
    images: [fullMetaImage],
    creator: "@aguswahyudupayana",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
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

  const websiteSchema = generateWebSiteSchema();
  const personSchema = generatePersonSchema();

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${title} RSS Feed`}
          href={`${siteBaseUrl}/rss.xml`}
        />
        <link rel="stylesheet" href={fontUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

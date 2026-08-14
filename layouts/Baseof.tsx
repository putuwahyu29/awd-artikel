"use client";

import React from "react";
import config from "@config/index.json";
import { plainify } from "@lib/utils/textConverter";
import Footer from "@partials/Footer";
import Header from "@partials/Header";
import ScrollToTop from "@layouts/components/ScrollToTop";
import { usePathname } from "next/navigation";

interface BaseProps {
  title?: string;
  meta_title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  canonical?: string;
  children: React.ReactNode;
}

const Base: React.FC<BaseProps> = ({
  title,
  meta_title,
  description,
  image,
  noindex,
  canonical,
  children,
}) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const pathname = usePathname();

  const pageDescription = plainify(description ? description : meta_description) || "";
  const pageImage = image
    ? image.startsWith("http")
      ? image
      : `${base_url}${image}`
    : `${base_url}${meta_image}`;
  const pageUrl = `${base_url}${pathname === "/" ? "" : pathname}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": title ? "BlogPosting" : "WebSite",
    headline: title ? plainify(title) : config.site.title,
    description: pageDescription,
    image: pageImage,
    url: pageUrl,
    author: {
      "@type": "Person",
      name: meta_author,
      url: "https://awd.my.id",
    },
    publisher: {
      "@type": "Organization",
      name: config.site.title,
      logo: {
        "@type": "ImageObject",
        url: `${base_url}${config.site.logo}`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="overflow-x-hidden pt-20">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Base;

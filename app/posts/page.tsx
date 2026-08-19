import React from "react";
import BlogPaginationPage from "../page/[slug]/page";
import config from "@config/index.json";
import type { Metadata } from "next";

const { base_url, title: siteTitle } = config.site;
const { meta_image } = config.metadata;

export const metadata: Metadata = {
  title: "Daftar Artikel",
  description: `Jelajahi seluruh artikel dan panduan teknologi di ${siteTitle}.`,
  alternates: {
    canonical: `${base_url}/posts`,
  },
  openGraph: {
    title: `Daftar Artikel | ${siteTitle}`,
    description: `Jelajahi seluruh artikel dan panduan teknologi di ${siteTitle}.`,
    url: `${base_url}/posts`,
    siteName: siteTitle,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: meta_image.startsWith("http") ? meta_image : `${base_url}${meta_image}`,
        width: 1200,
        height: 630,
        alt: "Daftar Artikel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Daftar Artikel | ${siteTitle}`,
    description: `Jelajahi seluruh artikel dan panduan teknologi di ${siteTitle}.`,
    images: [meta_image.startsWith("http") ? meta_image : `${base_url}${meta_image}`],
    creator: "@aguswahyudupayana",
  },
};

export default async function PostsIndexPage() {
  return BlogPaginationPage({
    params: Promise.resolve({ slug: "1" }),
  });
}

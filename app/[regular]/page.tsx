import React from "react";
import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";
import Default from "@layouts/Default";
import { getRegularPage, getSinglePage } from "@lib/contentParser";
import { plainify } from "@lib/utils/textConverter";
import config from "@config/index.json";
import { PostItem } from "@/types";
import type { Metadata } from "next";
import { generateBreadcrumbSchema } from "@lib/schemaGenerator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ regular: string }>;
}): Promise<Metadata> {
  const { regular } = await params;
  const data = await getRegularPage(regular);
  if (!data || !data.frontmatter) return {};

  const { title, meta_title, description, image, noindex, canonical } =
    data.frontmatter;
  const { meta_description, meta_image } = config.metadata;
  const { base_url, title: siteTitle } = config.site;

  const pageTitle = meta_title || title;
  const pageDescription =
    description || plainify(data.content?.slice(0, 160)) || meta_description;
  const pageImage = image
    ? image.startsWith("http")
      ? image
      : image.startsWith("/")
      ? `${base_url}${image}`
      : `${base_url}/${image}`
    : `${base_url}${meta_image}`;
  const pageUrl = canonical || `${base_url}/${regular}`;

  return {
    title: pageTitle,
    description: pageDescription,
    robots: noindex ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteTitle,
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: "@aguswahyudupayana",
    },
  };
}

export async function generateStaticParams() {
  const slugs = getSinglePage("content");
  return slugs.map((item: PostItem) => ({
    regular: item.slug,
  }));
}

export default async function RegularPage({
  params,
}: {
  params: Promise<{ regular: string }>;
}) {
  const { regular } = await params;
  const data = await getRegularPage(regular);
  const { title, meta_title, description, image, noindex, canonical, layout } =
    data.frontmatter;
  const { content } = data;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: title, url: `/${regular}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Base
        title={title}
        description={description ? description : content.slice(0, 120)}
        meta_title={meta_title}
        image={image}
        noindex={noindex}
        canonical={canonical}
      >
        {layout === "404" ? <NotFound data={data} /> : <Default data={data} />}
      </Base>
    </>
  );
}

import React from "react";
import config from "@config/index.json";
import Base from "@layouts/Baseof";
import Pagination from "@layouts/components/Pagination";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { markdownify } from "@lib/utils/textConverter";
import { sortByDate } from "@lib/utils/sortFunctions";
import Post from "@partials/Post";
import { PostItem } from "@/types";
import type { Metadata } from "next";
import { generateBreadcrumbSchema } from "@lib/schemaGenerator";

const { blog_folder, pagination } = config.settings;
const { base_url, title: siteTitle } = config.site;
const { meta_image } = config.metadata;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const currentPage = resolvedParams?.slug || "1";
  const title = `Halaman ${currentPage}`;
  const description = `Daftar artikel ${siteTitle} - Halaman ${currentPage}.`;
  const url = `${base_url}/page/${currentPage}`;
  const ogImage = meta_image.startsWith("http") ? meta_image : `${base_url}${meta_image}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteTitle}`,
      description,
      url,
      siteName: siteTitle,
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteTitle}`,
      description,
      images: [ogImage],
      creator: "@aguswahyudupayana",
    },
  };
}

export async function generateStaticParams() {
  const getAllSlug = getSinglePage(`content/${blog_folder}`);
  const allSlug = getAllSlug.map((item: PostItem) => item.slug);
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths: { slug: string }[] = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      slug: (i + 1).toString(),
    });
  }

  return paths;
}

export default async function BlogPaginationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const currentPage = parseInt((resolvedParams && resolvedParams.slug) || "1", 10);
  const posts = getSinglePage(`content/${blog_folder}`);
  const postIndex = await getListPage(`content/${blog_folder}/_index.md`);

  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const orderedPosts = sortByDate(posts);
  const currentPosts = orderedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const { frontmatter } = postIndex;
  const { title, image } = frontmatter;
  const totalPages = Math.ceil(posts.length / pagination);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Artikel", url: `/${blog_folder}` },
    { name: `Halaman ${currentPage}`, url: `/page/${currentPage}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Base title={title} image={image}>
        <section className="section">
          <div className="container">
            {markdownify(title, "h1", "h2 mb-8 text-center")}
            <div className="row mb-16">
              {currentPosts.map((post: PostItem) => (
                <div className="mt-16 flex lg:col-6" key={post.slug}>
                  <Post post={post} />
                </div>
              ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </div>
        </section>
      </Base>
    </>
  );
}

import React from "react";
import config from "@config/index.json";
import Base from "@layouts/Baseof";
import { getTaxonomy } from "@lib/taxonomyParser";
import { humanize, markdownify, slugify } from "@lib/utils/textConverter";
import Link from "next/link";
import { getSinglePage } from "@lib/contentParser";
import { FaFolder } from "react-icons/fa";
import { PostItem } from "@/types";
import type { Metadata } from "next";
import { generateBreadcrumbSchema, generateCollectionPageSchema } from "@lib/schemaGenerator";

const { blog_folder } = config.settings;
const { base_url, title: siteTitle } = config.site;
const { meta_image } = config.metadata;

export const metadata: Metadata = {
  title: "Semua Kategori",
  description: "Daftar semua kategori topik dan artikel yang tersedia di " + siteTitle,
  alternates: {
    canonical: `${base_url}/categories`,
  },
  openGraph: {
    title: `Semua Kategori | ${siteTitle}`,
    description: "Daftar semua kategori topik dan artikel yang tersedia di " + siteTitle,
    url: `${base_url}/categories`,
    siteName: siteTitle,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: meta_image.startsWith("http") ? meta_image : `${base_url}${meta_image}`,
        width: 1200,
        height: 630,
        alt: "Semua Kategori",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Semua Kategori | ${siteTitle}`,
    description: "Daftar semua kategori topik dan artikel yang tersedia di " + siteTitle,
    images: [meta_image.startsWith("http") ? meta_image : `${base_url}${meta_image}`],
    creator: "@aguswahyudupayana",
  },
};

export default async function CategoriesPage() {
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");
  const categoriesWithPostsCount = categories
    .map((category: string) => {
      const filteredPosts = posts.filter((post: PostItem) =>
        post.frontmatter.categories?.map((e: string) => slugify(e)).includes(category)
      );
      return {
        name: category,
        posts: filteredPosts.length,
      };
    })
    .filter((cat: { name: string; posts: number }) => cat.posts > 0);

  const collectionSchema = generateCollectionPageSchema(
    "Semua Kategori",
    "Daftar semua kategori topik dan artikel di " + siteTitle,
    "/categories",
    categoriesWithPostsCount.map((c: { name: string; posts: number }) => ({
      name: humanize(c.name),
      url: `/categories/${c.name}`,
    }))
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Kategori", url: "/categories" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Base title={"Semua Kategori"}>
        <section className="section pt-0">
          {markdownify(
            "Kategori",
            "h1",
            "h2 mb-16 bg-theme-light dark:bg-darkmode-theme-dark py-12 text-center lg:text-[55px]"
          )}
          <div className="container pt-12 text-center">
            <ul className="row">
              {categoriesWithPostsCount.map((category: { name: string; posts: number }, i: number) => (
                <li
                  key={`category-${i}`}
                  className="mt-4 block lg:col-4 xl:col-3"
                >
                  <Link
                    href={`/categories/${category.name}`}
                    className="flex w-full items-center justify-center rounded-lg bg-theme-light px-4 py-4 font-bold text-dark transition hover:bg-primary hover:text-white dark:bg-darkmode-theme-dark dark:text-darkmode-light dark:hover:bg-primary dark:hover:text-white"
                  >
                    <FaFolder className="mr-1.5" />
                    {humanize(category.name)} ({category.posts})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Base>
    </>
  );
}

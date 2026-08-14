import React from "react";
import config from "@config/index.json";
import Base from "@layouts/Baseof";
import Sidebar from "@layouts/partials/Sidebar";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { humanize, slugify } from "@lib/utils/textConverter";
import Post from "@partials/Post";
import { notFound } from "next/navigation";
import { PostItem } from "@/types";
import type { Metadata } from "next";

const { blog_folder } = config.settings;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const humanizedCategory = humanize(category);
  const { base_url, title: siteTitle } = config.site;
  const { meta_image } = config.metadata;
  const title = `Kategori: ${humanizedCategory}`;
  const description = `Menampilkan semua artikel dengan topik/kategori ${humanizedCategory} di ${siteTitle}.`;
  const url = `${base_url}/categories/${category}`;
  const ogImage = `${base_url}${meta_image}`;

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
      type: "website",
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteTitle}`,
      description,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  const allCategories = getTaxonomy(`content/${blog_folder}`, "categories");
  return allCategories.map((category: string) => ({
    category: category,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = getSinglePage(`content/${blog_folder}`);
  const filterPosts = posts.filter((post: PostItem) =>
    post.frontmatter.categories?.find((cat: string) =>
      slugify(cat)?.includes(category)
    )
  );

  if (filterPosts.length === 0) {
    notFound();
  }
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");

  const categoriesWithPostsCount = categories
    .map((cat: string) => {
      const filteredPosts = posts.filter((post: PostItem) =>
        post.frontmatter.categories?.map((e: string) => slugify(e)).includes(cat)
      );
      return {
        name: cat,
        posts: filteredPosts.length,
      };
    })
    .filter((cat: { name: string; posts: number }) => cat.posts > 0);

  return (
    <Base title={`Kategori ${category}`}>
      <div className="section mt-16">
        <div className="container">
          <h1 className="h2 mb-12">
            Menampilkan artikel dengan kategori
            <span className="section-title ml-1 inline-block capitalize">
              {category.replace("-", " ")}
            </span>
          </h1>
          <div className="row">
            <div className="lg:col-8">
              <div className="row">
                {filterPosts.map((post: PostItem, i: number) => (
                  <div key={`key-${i}`} className="mb-8 flex col-12 sm:col-6">
                    <Post post={post} />
                  </div>
                ))}
              </div>
            </div>
            <Sidebar posts={posts} categories={categoriesWithPostsCount} />
          </div>
        </div>
      </div>
    </Base>
  );
}

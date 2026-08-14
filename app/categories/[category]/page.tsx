import React from "react";
import config from "@config/index.json";
import Base from "@layouts/Baseof";
import Sidebar from "@layouts/partials/Sidebar";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { slugify } from "@lib/utils/textConverter";
import Post from "@partials/Post";
import { notFound } from "next/navigation";
import { PostItem } from "@/types";

const { blog_folder } = config.settings;

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

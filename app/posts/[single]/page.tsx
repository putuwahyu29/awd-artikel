import React from "react";
import config from "@config/index.json";
import PostSingle from "@layouts/PostSingle";
import MdxContent from "@layouts/components/MdxContent";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { PostItem } from "@/types";

import { slugify } from "@lib/utils/textConverter";

import { notFound } from "next/navigation";

const { blog_folder } = config.settings;

export async function generateStaticParams() {
  const allSlug = getSinglePage(`content/${blog_folder}`);
  return allSlug.map((item: PostItem) => ({
    single: item.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ single: string }>;
}) {
  const { single } = await params;
  const decodedSlug = decodeURIComponent(single);
  const posts = getSinglePage(`content/${blog_folder}`);
  const post = posts.find(
    (p: PostItem) =>
      p.slug === single ||
      p.slug === decodedSlug ||
      slugify(p.slug) === slugify(decodedSlug)
  );

  if (!post) {
    notFound();
  }

  const relatedPosts = posts.filter(
    (p: PostItem) =>
      p.slug !== post.slug &&
      post.frontmatter.categories?.some((cate: string) =>
        p.frontmatter.categories?.includes(cate)
      )
  );

  const categories = getTaxonomy(`content/${blog_folder}`, "categories");
  const categoriesWithPostsCount = categories
    .map((category: string) => {
      const filteredPosts = posts.filter((postItem: PostItem) =>
        postItem.frontmatter.categories?.map((e: string) => slugify(e)).includes(category)
      );
      return {
        name: category,
        posts: filteredPosts.length,
      };
    })
    .filter((cat: { name: string; posts: number }) => cat.posts > 0);

  return (
    <PostSingle
      frontmatter={post.frontmatter}
      content={post.content}
      mdxChildren={<MdxContent source={post.content} />}
      slug={single}
      allCategories={categoriesWithPostsCount}
      relatedPosts={relatedPosts}
      posts={posts}
    />
  );
}

import React from "react";
import config from "@config/index.json";
import PostSingle from "@layouts/PostSingle";
import MdxContent from "@layouts/components/MdxContent";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { PostItem } from "@/types";
import { plainify, slugify } from "@lib/utils/textConverter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const { blog_folder } = config.settings;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ single: string }>;
}): Promise<Metadata> {
  const { single } = await params;
  const decodedSlug = decodeURIComponent(single);
  const posts = getSinglePage(`content/${blog_folder}`);
  const post = posts.find(
    (p: PostItem) =>
      p.slug === single ||
      p.slug === decodedSlug ||
      slugify(p.slug) === slugify(decodedSlug)
  );

  if (!post) return {};

  const { title, meta_title, description, image, date } = post.frontmatter;
  const { meta_description, meta_image, meta_author } = config.metadata;
  const { base_url, title: siteTitle } = config.site;

  const postTitle = meta_title || title;
  const postDescription =
    description || plainify(post.content?.slice(0, 160)) || meta_description;
  const postImage = image
    ? image.startsWith("http")
      ? image
      : image.startsWith("/")
      ? `${base_url}${image}`
      : `${base_url}/${image}`
    : `${base_url}${meta_image}`;
  const canonicalUrl = `${base_url}/${blog_folder}/${single}`;

  return {
    title: postTitle,
    description: postDescription,
    authors: [{ name: post.frontmatter.author || meta_author }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: postTitle,
      description: postDescription,
      url: canonicalUrl,
      siteName: siteTitle,
      type: "article",
      publishedTime: date ? new Date(date).toISOString() : undefined,
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: postTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description: postDescription,
      images: [postImage],
    },
  };
}

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

import React from "react";
import config from "@config/index.json";
import Base from "@layouts/Baseof";
import { getTaxonomy } from "@lib/taxonomyParser";
import { humanize, markdownify, slugify } from "@lib/utils/textConverter";
import Link from "next/link";
import { getSinglePage } from "@lib/contentParser";
import { FaFolder } from "react-icons/fa";
import { PostItem } from "@/types";

const { blog_folder } = config.settings;

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

  return (
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
  );
}

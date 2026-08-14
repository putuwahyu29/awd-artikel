import React from "react";
import config from "@config/index.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import Sidebar from "@layouts/partials/Sidebar";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify, slugify } from "@lib/utils/textConverter";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import generateRssFeed from "@lib/generateRSSFeed";
import generateSiteMap from "@lib/generateSiteMap";
import { PostItem } from "@/types";

const { blog_folder, pagination } = config.settings;

export default async function HomePage() {
  await generateRssFeed();
  await generateSiteMap();
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const banner = frontmatter.banner || {
    title: "",
    content: "",
    image_enable: false,
    image: "",
    button: { enable: false, label: "", link: "" },
  };
  const featured_posts = frontmatter.featured_posts || { enable: false, title: "" };
  const recent_posts = frontmatter.recent_posts || { enable: false, title: "" };
  const promotion = frontmatter.promotion || { enable: false, link: "#", image: "" };

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

  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post: PostItem) => post.frontmatter.featured
  );
  const showPosts = pagination;

  return (
    <Base title="Beranda">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-16">
        {/* Glow ambient background lights */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[450px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-600/20 via-sky-500/15 to-cyan-400/10 blur-3xl" />
        
        <div className="container px-4">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div
              className={
                banner.image_enable
                  ? "mt-8 text-center lg:col-6 lg:mt-0 lg:text-left"
                  : "mt-8 text-center lg:col-12 lg:mt-0 lg:text-left"
              }
            >
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl leading-[1.15]">
                {banner.title}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 font-medium">
                {banner.content}
              </p>

              {/* Quick Topic Chips */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <Link
                  href="/categories/linux"
                  className="rounded-full bg-slate-100/80 px-3.5 py-1 text-xs font-semibold text-slate-700 transition-all hover:bg-primary/10 hover:text-primary dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary"
                >
                  Linux
                </Link>
                <Link
                  href="/categories/devops"
                  className="rounded-full bg-slate-100/80 px-3.5 py-1 text-xs font-semibold text-slate-700 transition-all hover:bg-primary/10 hover:text-primary dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary"
                >
                  DevOps & Cloud
                </Link>
                <Link
                  href="/categories/web-development"
                  className="rounded-full bg-slate-100/80 px-3.5 py-1 text-xs font-semibold text-slate-700 transition-all hover:bg-primary/10 hover:text-primary dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary"
                >
                  Web Development
                </Link>
              </div>

              {/* Dual Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
                <Link
                  className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-600 hover:shadow-blue-500/40 active:scale-95"
                  href="/posts"
                >
                  <span>Jelajahi Artikel</span>
                  <span className="ml-2">→</span>
                </Link>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white/60 px-6 py-3 text-sm font-bold text-slate-700 shadow-xs backdrop-blur-md transition-all hover:border-primary/40 hover:bg-slate-100 hover:text-primary dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary active:scale-95"
                  href="https://awd.my.id"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Portofolio Penulis</span>
                  <span className="ml-1 text-xs">↗</span>
                </a>
              </div>
            </div>

            {banner.image_enable && (
              <div className="col-9 lg:col-6">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary via-sky-400 to-cyan-400 opacity-25 blur-2xl transition-all duration-500 group-hover:opacity-40" />
                  <ImageFallback
                    className="relative mx-auto rounded-2xl object-contain shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                    src={banner.image}
                    width={548}
                    height={443}
                    priority={true}
                    alt="Banner Image"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Home Main Content */}
      <section className="section py-8">
        <div className="container px-4">
          <div className="row items-start">
            <div className="mb-12 lg:col-8 lg:mb-0">
              {/* Featured Posts */}
              {featured_posts.enable && featuredPosts.length > 0 && (
                <div className="mb-14">
                  <h2 className="section-title text-2xl font-extrabold tracking-tight">
                    {featured_posts.title || "Artikel Unggulan"}
                  </h2>

                  <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-5 sm:p-7 shadow-lg backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/50">
                    <div className="row">
                      <div className="md:col-6">
                        <Post post={featuredPosts[0]} />
                      </div>

                      <div className="mt-6 scrollbar-w-[6px] max-h-[490px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 md:col-6 dark:scrollbar-track-slate-800 dark:scrollbar-thumb-slate-700 md:mt-0">
                        {featuredPosts
                          .slice(1, featuredPosts.length)
                          .map((post: PostItem, i: number, arr: PostItem[]) => (
                            <div
                              className={`group flex items-center rounded-2xl p-3 transition-all duration-300 hover:bg-blue-50/60 dark:hover:bg-slate-800/60 ${
                                i !== arr.length - 1 &&
                                "mb-3 border-b border-slate-100 dark:border-slate-800/60 pb-3"
                              }`}
                              key={`key-${i}`}
                            >
                              {post.frontmatter.image && (
                                <div className="mr-3.5 aspect-video h-[72px] w-[110px] flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                                  <ImageFallback
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={post.frontmatter.image}
                                    alt={post.frontmatter.title}
                                    width={110}
                                    height={72}
                                  />
                                </div>
                              )}
                              <div>
                                <h3 className="mb-1.5 text-sm font-bold leading-snug text-slate-800 transition-colors group-hover:text-primary dark:text-slate-100">
                                  <Link
                                    href={`/${blog_folder}/${post.slug}`}
                                    className="block hover:text-primary"
                                  >
                                    {post.frontmatter.title}
                                  </Link>
                                </h3>
                                {post.frontmatter.date && (
                                  <p className="inline-flex items-center text-[11px] font-medium text-slate-500 dark:text-slate-400">
                                    <FaRegCalendar className="mr-1.5 text-primary text-[10px]" />
                                    {dateFormat(post.frontmatter.date)}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Promotion */}
              {promotion.enable && (
                <Link href={promotion.link} className="mb-12 block overflow-hidden rounded-2xl shadow-md transition-transform hover:scale-[1.01]">
                  <ImageFallback
                    className="h-full w-full object-cover"
                    height={115}
                    width={800}
                    src={promotion.image}
                    alt="promotion"
                  />
                </Link>
              )}

              {/* Recent Posts Grid */}
              {recent_posts.enable && (
                <div className="mb-12">
                  <h2 className="section-title text-2xl font-extrabold tracking-tight">
                    {recent_posts.title || "Artikel Terkini"}
                  </h2>
                  <div className="row">
                    {sortPostByDate.slice(0, showPosts).map((post: PostItem) => (
                      <div className="mb-8 flex md:col-6" key={post.slug}>
                        <Post post={post} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Pagination
                totalPages={Math.ceil(posts.length / showPosts)}
                currentPage={1}
              />
            </div>

            {/* Sidebar */}
            <Sidebar
              className=""
              posts={posts}
              categories={categoriesWithPostsCount}
            />
          </div>
        </div>
      </section>
    </Base>
  );
}

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
import { markdownify } from "@lib/utils/textConverter";
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

  const categoriesWithPostsCount = categories.map((category: string) => {
    const filteredPosts = posts.filter((post: PostItem) =>
      post.frontmatter.categories?.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post: PostItem) => post.frontmatter.featured
  );
  const showPosts = pagination;

  return (
    <Base title="Beranda">
      {/* Banner */}
      <section className="section banner relative pb-0">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src={"/images/banner-bg-shape.svg"}
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />

        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div
              className={
                banner.image_enable
                  ? "mt-12 text-center lg:col-6 lg:mt-0 lg:text-left"
                  : "mt-12 text-center lg:col-12 lg:mt-0 lg:text-left"
              }
            >
              <div className="banner-title">
                {markdownify(banner.title, "h1")}
                {markdownify(banner.title_small, "span")}
              </div>
              {markdownify(banner.content, "p", "mt-4")}
              {banner.button?.enable && (
                <Link
                  className="btn btn-primary mt-6"
                  href={banner.button.link}
                  rel={banner.button.rel}
                  target="_blank"
                >
                  {banner.button.label}
                </Link>
              )}
            </div>
            {banner.image_enable && (
              <div className="col-9 lg:col-6">
                <ImageFallback
                  className="mx-auto object-contain"
                  src={banner.image}
                  width={548}
                  height={443}
                  priority={true}
                  alt="Banner Image"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Home main */}
      <section className="section">
        <div className="container">
          <div className="row items-start">
            <div className="mb-12 lg:col-8 lg:mb-0">
              {/* Featured posts */}
              {featured_posts.enable && featuredPosts.length > 0 && (
                <div className="section">
                  {markdownify(featured_posts.title, "h2", "section-title")}
                  <div className="rounded-2xl border border-border/50 bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:border-darkmode-border/50 dark:bg-darkmode-theme-dark/20">
                    <div className="row">
                      <div className="md:col-6">
                        <Post post={featuredPosts[0]} />
                      </div>
                      <div className="scrollbar-w-[10px] mt-8 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border md:col-6 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-theme-dark md:mt-0">
                        {featuredPosts
                          .slice(1, featuredPosts.length)
                          .map((post: PostItem, i: number, arr: PostItem[]) => (
                            <div
                              className={`group mb-4 flex items-center rounded-xl p-2.5 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-darkmode-theme-dark/50 ${
                                i !== arr.length - 1 &&
                                "border-b border-border/40 dark:border-darkmode-border/40"
                              }`}
                              key={`key-${i}`}
                            >
                              {post.frontmatter.image && (
                                <div className="mr-3 aspect-video h-[75px] w-[110px] flex-shrink-0 overflow-hidden rounded-lg">
                                  <ImageFallback
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    src={post.frontmatter.image}
                                    alt={post.frontmatter.title}
                                    width={110}
                                    height={75}
                                  />
                                </div>
                              )}
                              <div>
                                <h3 className="h6 mb-1.5 transition-colors group-hover:text-primary">
                                  <Link
                                    href={`/${blog_folder}/${post.slug}`}
                                    className="block hover:text-primary"
                                  >
                                    {post.frontmatter.title}
                                  </Link>
                                </h3>
                                {post.frontmatter.date && (
                                  <p className="inline-flex items-center text-xs font-semibold text-gray-500 dark:text-darkmode-light/70">
                                    <FaRegCalendar className="mr-1.5 text-primary text-xs" />
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
                <Link href={promotion.link} className="section block pt-0">
                  <ImageFallback
                    className="h-full w-full"
                    height={115}
                    width={800}
                    src={promotion.image}
                    alt="promotion"
                  />
                </Link>
              )}

              {/* Recent Posts */}
              {recent_posts.enable && (
                <div className="section pt-0">
                  {markdownify(recent_posts.title, "h2", "section-title mb-6")}
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
            {/* sidebar */}
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

"use client";

import React, { useState } from "react";
import config from "@config/index.json";
import Base from "@layouts/Baseof";
import InnerPagination from "@layouts/components/InnerPagination";
import ReadingProgressBar from "@layouts/components/ReadingProgressBar";
import TableOfContents from "@layouts/components/TableOfContents";
import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import wordCount from "@lib/utils/wordCount";
import { markdownify } from "@lib/utils/textConverter";
import { DiscussionEmbed } from "disqus-react";
import { useTheme } from "next-themes";
import ImageFallback from "@layouts/components/ImageFallback";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt, FaRegClock, FaFileAlt, FaLink, FaCheck } from "react-icons/fa";
import Post from "./partials/Post";
import Sidebar from "./partials/Sidebar";
import AuthorCard from "@layouts/components/AuthorCard";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";
import { PostFrontmatter, PostItem, CategoryWithCount } from "@/types";

const { disqus } = config;
const { meta_author } = config.metadata;
const { base_url } = config.site;

interface PostSingleProps {
  frontmatter: PostFrontmatter;
  content: string;
  mdxChildren?: React.ReactNode;
  slug: string;
  posts: PostItem[];
  allCategories: CategoryWithCount[];
  relatedPosts: PostItem[];
}

const PostSingle: React.FC<PostSingleProps> = ({
  frontmatter,
  content,
  mdxChildren,
  slug,
  posts,
  allCategories,
  relatedPosts,
}) => {
  let { description, title, date, image, categories = [] } = frontmatter;
  description = description ? description : content.slice(0, 120);

  const [showToast, setShowToast] = useState(false);
  const { theme } = useTheme();
  const author = frontmatter.author ? frontmatter.author : meta_author;
  const readTime = readingTime(content || "");
  const words = wordCount(content || "");

  const handleCopyLink = () => {
    const currentUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `${base_url}/${config.settings.blog_folder}/${slug}`;
    navigator.clipboard.writeText(currentUrl);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  let disqusConfig: any = { ...config.disqus.settings };
  disqusConfig.identifier = frontmatter.disqusId
    ? frontmatter.disqusId
    : config.settings.blog_folder + "/" + slug;

  return (
    <Base title={title} description={description} image={image}>
      <ReadingProgressBar />
      <section className="section single-blog pt-6 pb-16">
        <div className="container px-4">
          <div className="row">
            <div className="lg:col-8">
              <article className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-10 shadow-xl backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/50">
                {/* Category Tags */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  {categories.map((tag: string, index: number) => (
                    <Link
                      key={"tag-" + index}
                      href={`/categories/${tag.replace(" ", "-").toLowerCase()}`}
                      className="inline-flex items-center rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold capitalize text-primary transition-all hover:bg-primary hover:text-white dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-primary dark:hover:text-white"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>

                {/* Article Title */}
                <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl leading-tight">
                  {title}
                </h1>

                {/* Article Meta Bar */}
                <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-slate-100 py-3.5 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <span className="inline-flex items-center">
                    <FaUserAlt className="mr-2 text-xs text-primary" />
                    {author}
                  </span>
                  {date && (
                    <span className="inline-flex items-center">
                      <FaRegCalendar className="mr-2 text-xs text-primary" />
                      {dateFormat(date)}
                    </span>
                  )}
                  <span className="inline-flex items-center">
                    <FaRegClock className="mr-2 text-xs text-primary" />
                    {readTime}
                  </span>
                  <span className="inline-flex items-center">
                    <FaFileAlt className="mr-2 text-xs text-primary" />
                    {words}
                  </span>
                </div>

                {/* Main Article Image */}
                {image && (
                  <div className="relative mb-10 overflow-hidden rounded-2xl bg-slate-100 shadow-md dark:bg-slate-800">
                    <ImageFallback
                      src={image}
                      height={500}
                      width={1000}
                      alt={title || "Post Image"}
                      className="w-full object-cover"
                      priority
                    />
                  </div>
                )}

                {config.settings.InnerPaginationOptions.enableTop && (
                  <div className="mb-6">
                    <InnerPagination posts={posts} date={date} />
                  </div>
                )}

                {/* Table of Contents */}
                <TableOfContents content={content} />

                {/* Article Content */}
                <div className="content mb-12 leading-relaxed">
                  {mdxChildren}
                </div>

                {config.settings.InnerPaginationOptions.enableBottom && (
                  <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
                    <InnerPagination posts={posts} date={date} />
                  </div>
                )}

                {/* Share Toolbar */}
                <div className="mt-10 border-t border-slate-100 pt-8 dark:border-slate-800">
                  <h3 className="mb-4 text-sm font-bold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                    Bagikan Artikel Ini
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <FacebookShareButton
                      url={`${base_url}/${config.settings.blog_folder}/${slug}`}
                      quote={title}
                    >
                      <FacebookIcon size={38} round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`${base_url}/${config.settings.blog_folder}/${slug}`}
                      title={title}
                    >
                      <TwitterIcon size={38} round />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      url={`${base_url}/${config.settings.blog_folder}/${slug}`}
                      title={title}
                      separator=":: "
                    >
                      <WhatsappIcon size={38} round />
                    </WhatsappShareButton>
                    <LinkedinShareButton
                      url={`${base_url}/${config.settings.blog_folder}/${slug}`}
                    >
                      <LinkedinIcon size={38} round />
                    </LinkedinShareButton>
                    <TelegramShareButton
                      url={`${base_url}/${config.settings.blog_folder}/${slug}`}
                      title={title}
                    >
                      <TelegramIcon size={38} round />
                    </TelegramShareButton>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="flex h-[38px] items-center space-x-2 rounded-full border border-slate-200 bg-slate-100 px-4 text-xs font-bold text-slate-700 transition-all hover:bg-primary hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-primary dark:hover:text-white"
                      title="Salin Link Artikel"
                    >
                      <FaLink size={12} />
                      <span>Salin Link</span>
                    </button>
                  </div>
                </div>

                {/* Author Profile Card */}
                <AuthorCard layout="article" />

                {/* Toast Notification */}
                {showToast && (
                  <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 flex items-center space-x-2.5 rounded-full bg-slate-900/95 px-6 py-3.5 text-xs font-bold text-white shadow-2xl backdrop-blur-md dark:bg-white/95 dark:text-slate-900 transition-all duration-300">
                    <FaCheck className="text-emerald-400 dark:text-emerald-600 text-sm" />
                    <span>Link artikel berhasil disalin ke clipboard!</span>
                  </div>
                )}

                {/* Comments Section */}
                <div className="mt-14 border-t border-slate-100 pt-8 dark:border-slate-800">
                  <h3 className="section-title text-xl font-extrabold tracking-tight">Komentar</h3>
                  {disqus.enable && (
                    <DiscussionEmbed
                      key={theme}
                      shortname={disqus.shortname}
                      config={disqusConfig}
                    />
                  )}
                </div>
              </article>
            </div>

            <Sidebar
              posts={posts.filter((post) => post.slug !== slug)}
              categories={allCategories}
            />
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="container mt-20 px-4">
            <h2 className="section-title text-2xl font-extrabold tracking-tight">Artikel Terkait</h2>
            <div className="row mt-8">
              {relatedPosts.slice(0, 3).map((post, index) => (
                <div key={"post-" + index} className="mb-8 flex md:col-6 lg:col-4">
                  <Post post={post} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </Base>
  );
};

export default PostSingle;

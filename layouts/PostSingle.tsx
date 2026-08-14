"use client";

import React, { useState, useEffect } from "react";
import config from "@config/index.json";
import Base from "@layouts/Baseof";
import InnerPagination from "@layouts/components/InnerPagination";
import ReadingProgressBar from "@layouts/components/ReadingProgressBar";
import TableOfContents from "@layouts/components/TableOfContents";
import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import wordCount from "@lib/utils/wordCount";
import { markdownify, slugify } from "@lib/utils/textConverter";
import { DiscussionEmbed } from "disqus-react";
import { useTheme } from "next-themes";
import ImageFallback from "@layouts/components/ImageFallback";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt, FaRegClock, FaFileAlt, FaLink, FaCheck } from "react-icons/fa";
import Post from "./partials/Post";
import Sidebar from "./partials/Sidebar";
import ArticleToolbar from "@layouts/components/ArticleToolbar";
import MarkAsRead from "@layouts/components/MarkAsRead";
import ArticleStats from "@layouts/components/ArticleStats";
import DisqusComments from "@layouts/components/DisqusComments";
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

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const disqusShortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || disqus.shortname;
  const currentUrl = `${base_url}/${config.settings.blog_folder}/${slug}`;

  const disqusConfig = {
    url: currentUrl,
    identifier: frontmatter.disqusId || `${config.settings.blog_folder}/${slug}`,
    title: title,
    language: "id",
    ...config.disqus.settings,
  };

  const [fontSize, setFontSize] = useState<"small" | "normal" | "large">("normal");

  const fontSizeStyle =
    fontSize === "small"
      ? { fontSize: "14px", lineHeight: "1.7" }
      : fontSize === "large"
      ? { fontSize: "20px", lineHeight: "1.8" }
      : { fontSize: "16px", lineHeight: "1.75" };

  return (
    <Base title={title} meta_title={title} description={description} image={image}>
      <ReadingProgressBar />
      <MarkAsRead slug={slug} />
      
      <section className="section pt-8">
        <div className="container px-4 sm:px-6">
          <div className="row justify-center">
            <div className="lg:col-8">
              <article className="post-single rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 shadow-xl backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70">
                {/* Categories */}
                {categories.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {categories.map((category: string, i: number) => (
                      <Link
                        key={i}
                        href={`/categories/${slugify(category)}`}
                        className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white dark:bg-primary/20 dark:text-blue-300"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Post Title */}
                <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl leading-snug">
                  {title}
                </h1>

                {/* Author & Meta Bar */}
                <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-100 pb-6 text-xs font-medium text-slate-500 dark:border-slate-800/80 dark:text-slate-400">
                  <span className="inline-flex items-center text-slate-700 font-bold dark:text-slate-200">
                    <FaUserAlt className="mr-1.5 text-primary text-[11px]" />
                    {author}
                  </span>
                  {date && (
                    <span className="inline-flex items-center">
                      <FaRegCalendar className="mr-1.5 text-primary text-[11px]" />
                      {dateFormat(date)}
                    </span>
                  )}
                  <span className="inline-flex items-center">
                    <FaRegClock className="mr-1.5 text-primary text-[11px]" />
                    {readTime}
                  </span>
                  <span className="inline-flex items-center">
                    <FaFileAlt className="mr-1.5 text-primary text-[11px]" />
                    {words}
                  </span>
                </div>

                {/* Main Feature Image */}
                {image && (
                  <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200/80 shadow-lg dark:border-slate-800">
                    <ImageFallback
                      src={image}
                      height={500}
                      width={1000}
                      alt={title}
                      className="w-full object-cover"
                      priority={true}
                    />
                  </div>
                )}

                {/* Interactive Article Toolbar (Audio Reader + Bookmark + Font Size + Print) */}
                <ArticleToolbar
                  title={title}
                  slug={slug}
                  content={content}
                  currentFontSize={fontSize}
                  onFontSizeChange={setFontSize}
                />

                {config.settings.InnerPaginationOptions.enableTop && (
                  <div className="mb-6">
                    <InnerPagination posts={posts} date={date} />
                  </div>
                )}

                {/* Table of Contents */}
                <TableOfContents content={content} />

                {/* Article Content */}
                <div className="content mb-12 transition-all duration-200" style={fontSizeStyle}>
                  {mdxChildren}
                </div>

                {/* Article Reader Summary Statistics */}
                <ArticleStats words={words} readTime={readTime} />

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

                {/* Toast Notification */}
                {showToast && (
                  <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 flex items-center space-x-2.5 rounded-full bg-slate-900/95 px-6 py-3.5 text-xs font-bold text-white shadow-2xl backdrop-blur-md dark:bg-white/95 dark:text-slate-900 transition-all duration-300">
                    <FaCheck className="text-emerald-400 dark:text-emerald-600 text-sm" />
                    <span>Link artikel berhasil disalin ke clipboard!</span>
                  </div>
                )}

                {/* Comments Section */}
                <div className="mt-14 border-t border-slate-100 pt-8 dark:border-slate-800">
                  <h3 className="section-title text-xl font-extrabold tracking-tight mb-6">Komentar</h3>
                  {disqus.enable && mounted && disqusShortname ? (
                    <DisqusComments
                      shortname={disqusShortname}
                      url={disqusConfig.url}
                      identifier={disqusConfig.identifier}
                      title={disqusConfig.title}
                    />
                  ) : (
                    <p className="text-xs text-slate-500">
                      Kolom komentar belum aktif atau shortname Disqus belum dikonfigurasi.
                    </p>
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

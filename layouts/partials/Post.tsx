import React from "react";
import config from "@config/index.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import wordCount from "@lib/utils/wordCount";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt, FaArrowRight, FaRegClock, FaStar, FaFileAlt } from "react-icons/fa";
import { PostItem } from "@/types";

interface PostProps {
  post: PostItem;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { summary_length, blog_folder } = config.settings;
  const { meta_author } = config.metadata;
  const author = post.frontmatter.author
    ? post.frontmatter.author
    : meta_author;

  const descriptionText = post.frontmatter.description
    ? post.frontmatter.description
    : post.content
        .replace(/^#+\s+/gm, "")
        .replace(/[*_~`]/g, "")
        .trim()
        .slice(0, Number(summary_length));

  const readTime = readingTime(post.content || "");
  const words = wordCount(post.content || "");
  const categories = post.frontmatter.categories || [];

  return (
    <article className="post group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800/80 dark:bg-slate-900/70">
      {/* Image Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {post.frontmatter.image && (
          <ImageFallback
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={405}
            height={228}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <ul className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5 z-10">
          {categories.map((tag: string, index: number) => (
            <li key={"tag-" + index}>
              <Link
                href={`/categories/${tag.replace(" ", "-").toLowerCase()}`}
                className="inline-flex items-center rounded-full bg-primary border border-white/20 px-3 py-1 text-[11px] font-bold text-white shadow-md shadow-primary/20 backdrop-blur-md transition-all hover:bg-blue-600 hover:scale-105 active:scale-95"
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>

        {post.frontmatter.featured && (
          <div className="absolute right-3 top-3 z-10 inline-flex items-center rounded-full bg-amber-500/95 px-2.5 py-1 text-[10px] font-bold text-white shadow-md backdrop-blur-md">
            <FaStar className="mr-1 text-[9px]" /> Unggulan
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Meta Author, Date, Reading Time & Word Count */}
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center font-medium">
            <FaUserAlt className="mr-1.5 text-[10px] text-primary" />
            {author}
          </span>
          {post.frontmatter.date && (
            <span className="inline-flex items-center font-medium">
              <FaRegCalendar className="mr-1.5 text-[10px] text-primary" />
              {dateFormat(post.frontmatter.date)}
            </span>
          )}
          <span className="inline-flex items-center font-medium">
            <FaRegClock className="mr-1.5 text-[10px] text-primary" />
            {readTime}
          </span>
          <span className="inline-flex items-center font-medium">
            <FaFileAlt className="mr-1.5 text-[10px] text-primary" />
            {words}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2.5 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary dark:text-slate-100">
          <Link
            href={`/${blog_folder}/${post.slug}`}
            className="block hover:text-primary"
          >
            {post.frontmatter.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300/80 line-clamp-3">
          {descriptionText}...
        </p>

        {/* Action Link at Bottom */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <Link
            href={`/${blog_folder}/${post.slug}`}
            className="inline-flex items-center text-xs font-bold text-primary transition-all group-hover:translate-x-1"
          >
            <span>Baca Selengkapnya</span>
            <FaArrowRight className="ml-1.5 text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Post;

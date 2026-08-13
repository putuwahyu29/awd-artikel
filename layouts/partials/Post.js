import config from "@config/index.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import wordCount from "@lib/utils/wordCount";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt, FaArrowRight, FaRegClock, FaStar, FaFileAlt } from "react-icons/fa";

const Post = ({ post }) => {
  const { summary_length, blog_folder } = config.settings;
  const { meta_author } = config.metadata;
  const author = post.frontmatter.author
    ? post.frontmatter.author
    : meta_author;

  // Clean raw markdown heading tags or extra characters from content preview
  const descriptionText = post.frontmatter.description
    ? post.frontmatter.description
    : post.content
        .replace(/^#+\s+/gm, "")
        .replace(/[*_~`]/g, "")
        .trim()
        .slice(0, Number(summary_length));

  const readTime = readingTime(post.content || "");
  const words = wordCount(post.content || "");

  return (
    <article className="post group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl dark:border-darkmode-border/60 dark:bg-darkmode-theme-dark/40">
      {/* Image Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-darkmode-theme-dark/80">
        {post.frontmatter.image && (
          <ImageFallback
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={405}
            height={228}
          />
        )}
        <ul className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5 z-10">
          {post.frontmatter.categories.map((tag, index) => (
            <li key={"tag-" + index}>
              <Link
                href={`/categories/${tag.replace(" ", "-").toLowerCase()}`}
                className="inline-flex items-center rounded-full bg-primary/95 px-3 py-1 text-[11px] font-semibold tracking-wide text-white shadow-sm backdrop-blur-md transition-all hover:bg-primary"
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>

        {post.frontmatter.featured && (
          <div className="absolute right-3 top-3 z-10 inline-flex items-center rounded-full bg-amber-500/90 px-2.5 py-1 text-[10px] font-bold text-white shadow-md backdrop-blur-md">
            <FaStar className="mr-1 text-[9px]" /> Unggulan
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Meta Author, Date, Reading Time & Word Count */}
        <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-darkmode-light/70">
          <span className="inline-flex items-center font-medium">
            <FaUserAlt className="mr-1.5 text-[10px] text-primary" />
            {author}
          </span>
          <span className="inline-flex items-center font-medium">
            <FaRegCalendar className="mr-1.5 text-[10px] text-primary" />
            {dateFormat(post.frontmatter.date)}
          </span>
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
        <h3 className="h5 mb-2 font-bold leading-snug text-dark transition-colors group-hover:text-primary dark:text-darkmode-light">
          <Link
            href={`/${blog_folder}/${post.slug}`}
            className="block hover:text-primary"
          >
            {post.frontmatter.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-darkmode-text/80 line-clamp-3">
          {descriptionText}...
        </p>

        {/* Action Link at Bottom */}
        <div className="mt-auto pt-2 border-t border-gray-100 dark:border-darkmode-border/30">
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


import config from "@config/index.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt, FaChevronRight } from "react-icons/fa";

const Post = ({ post }) => {
  const { summary_length, blog_folder } = config.settings;
  const { meta_author } = config.metadata;
  const author = post.frontmatter.author
    ? post.frontmatter.author
    : meta_author;
  return (
    <div className="post group flex h-full flex-col rounded-2xl border border-border/40 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl dark:border-darkmode-border/40 dark:bg-darkmode-theme-dark/30">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        {post.frontmatter.image && (
          <ImageFallback
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={405}
            height={228}
          />
        )}
        <ul className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
          {post.frontmatter.categories.map((tag, index) => (
            <li
              className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-sm transition-all hover:bg-primary"
              key={"tag-" + index}
            >
              <Link
                className="capitalize"
                href={`/categories/${tag.replace(" ", "-").toLowerCase()}`}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <h3 className="h5 mb-2 mt-4 transition-colors group-hover:text-primary">
        <Link
          href={`/${blog_folder}/${post.slug}`}
          className="block hover:text-primary"
        >
          {post.frontmatter.title}
        </Link>
      </h3>
      <ul className="mb-3 flex items-center space-x-4 text-gray-500 dark:text-darkmode-light/70">
        <li>
          <Link
            className="inline-flex items-center font-secondary text-xs leading-3 hover:text-primary"
            href="https://awd.my.id"
          >
            <FaUserAlt className="mr-1.5 text-primary" />
            {author}
          </Link>
        </li>
        <li className="inline-flex items-center font-secondary text-xs leading-3">
          <FaRegCalendar className="mr-1.5 text-primary" />
          {dateFormat(post.frontmatter.date)}
        </li>
      </ul>
      <p className="text-sm text-text/80 dark:text-darkmode-text/80 line-clamp-3">
        {post.content.slice(0, Number(summary_length))}...
      </p>
      <Link
        className="btn btn-outline-primary mt-auto inline-flex items-center gap-1.5 pt-4 transition-all duration-300 group-hover:bg-primary group-hover:text-white"
        href={`/${blog_folder}/${post.slug}`}
      >
        <span>Baca Selengkapnya</span>
        <FaChevronRight className="text-xs transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default Post;

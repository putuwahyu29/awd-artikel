import { useState } from "react";
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
import { MDXRemote } from "next-mdx-remote";
import { useTheme } from "next-themes";
import ImageFallback from "@layouts/components/ImageFallback";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt, FaRegClock, FaFileAlt, FaLink, FaCheck } from "react-icons/fa";
import Post from "./partials/Post";
import Sidebar from "./partials/Sidebar";
import shortcodes from "./shortcodes/all";
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
const { disqus } = config;
const { meta_author } = config.metadata;
const { base_url } = config.site;

const PostSingle = ({
  frontmatter,
  content,
  mdxContent,
  slug,
  posts,
  allCategories,
  relatedPosts,
}) => {
  let { description, title, date, image, categories } = frontmatter;
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

  // Local copy so we don't modify global config.
  let disqusConfig = config.disqus.settings;
  disqusConfig.identifier = frontmatter.disqusId
    ? frontmatter.disqusId
    : config.settings.blog_folder + "/" + slug;

  return (
    <Base title={title} description={description} image={image}>
      <ReadingProgressBar />
      <section className="section single-blog mt-6">
        <div className="container">
          <div className="row">
            <div className="lg:col-8">
              <article>
                <div className="relative">
                  {image && (
                    <ImageFallback
                      src={image}
                      height="500"
                      width="1000"
                      alt={title}
                      className="rounded-lg w-full"
                    />
                  )}
                  <ul className="absolute left-2 top-3 flex flex-wrap items-center">
                    {categories.map((tag, index) => (
                      <li
                        className="mx-2 inline-flex h-7 rounded-[35px] bg-primary px-3 text-white"
                        key={"tag-" + index}
                      >
                        <Link
                          className="capitalize"
                          href={`/categories/${tag
                            .replace(" ", "-")
                            .toLowerCase()}`}
                        >
                          {tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {config.settings.InnerPaginationOptions.enableTop && (
                  <div className="mt-4">
                    <InnerPagination posts={posts} date={date} />
                  </div>
                )}
                {markdownify(title, "h1", "lg:text-[42px] mt-4")}
                <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 my-3">
                  <li>
                    <Link
                      className="inline-flex items-center font-secondary text-xs leading-3 text-gray-600 dark:text-darkmode-light/70 hover:text-primary"
                      href="https://awd.my.id"
                    >
                      <FaUserAlt className="mr-1.5 text-primary text-[10px]" />
                      {author}
                    </Link>
                  </li>
                  <li className="inline-flex items-center font-secondary text-xs leading-3 text-gray-600 dark:text-darkmode-light/70">
                    <FaRegCalendar className="mr-1.5 text-primary text-[10px]" />
                    {dateFormat(date)}
                  </li>
                  <li className="inline-flex items-center font-secondary text-xs leading-3 text-gray-600 dark:text-darkmode-light/70">
                    <FaRegClock className="mr-1.5 text-primary text-[10px]" />
                    {readTime}
                  </li>
                  <li className="inline-flex items-center font-secondary text-xs leading-3 text-gray-600 dark:text-darkmode-light/70">
                    <FaFileAlt className="mr-1.5 text-primary text-[10px]" />
                    {words}
                  </li>
                </ul>

                {/* Table of Contents */}
                <TableOfContents content={content} />

                <div className="content mb-16">
                  <MDXRemote {...mdxContent} components={shortcodes} />
                </div>
                {config.settings.InnerPaginationOptions.enableBottom && (
                  <InnerPagination posts={posts} date={date} />
                )}
              </article>

              {/* Share */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <h3 className="section-title mb-0 mr-2">Bagikan Artikel Ini</h3>
                <FacebookShareButton
                  url={`${base_url}/${config.settings.blog_folder}/${slug}`}
                  quote={title}
                >
                  <FacebookIcon size={40} round={true} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={`${base_url}/${config.settings.blog_folder}/${slug}`}
                  title={title}
                >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={`${base_url}/${config.settings.blog_folder}/${slug}`}
                  title={title}
                  separator=":: "
                >
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>
                <LinkedinShareButton
                  url={`${base_url}/${config.settings.blog_folder}/${slug}`}
                >
                  <LinkedinIcon size={40} round />
                </LinkedinShareButton>
                <TelegramShareButton
                  url={`${base_url}/${config.settings.blog_folder}/${slug}`}
                  title={title}
                >
                  <TelegramIcon size={40} round />
                </TelegramShareButton>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex h-10 items-center space-x-1.5 rounded-full bg-gray-100 px-4 text-xs font-bold text-gray-700 transition-all hover:bg-primary hover:text-white dark:bg-darkmode-theme-dark dark:text-darkmode-light dark:hover:bg-primary"
                  title="Salin Link Artikel"
                >
                  <FaLink size={12} />
                  <span>Salin Link</span>
                </button>
              </div>

              {/* Toast Notification */}
              {showToast && (
                <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 flex items-center space-x-2 rounded-full bg-gray-900/95 px-5 py-3 text-xs font-semibold text-white shadow-2xl backdrop-blur-md dark:bg-white/95 dark:text-gray-900 transition-all duration-300">
                  <FaCheck className="text-emerald-400 dark:text-emerald-600 text-sm" />
                  <span>Link artikel berhasil disalin ke clipboard!</span>
                </div>
              )}

              <div className="mt-16">
                <h3 className="section-title">Komentar</h3>
                {disqus.enable && (
                  <DiscussionEmbed
                    key={theme}
                    shortname={disqus.shortname}
                    config={disqusConfig}
                  />
                )}
              </div>
            </div>
            <Sidebar
              posts={posts.filter((post) => post.slug !== slug)}
              categories={allCategories}
            />
          </div>
        </div>

        {/* Related posts */}
        <div className="container mt-20">
          <h2 className="section-title">Artikel Terkait</h2>
          <div className="row mt-16">
            {relatedPosts.slice(0, 3).map((post, index) => (
              <div key={"post-" + index} className="mb-12 lg:col-4">
                <Post post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
};

export default PostSingle;

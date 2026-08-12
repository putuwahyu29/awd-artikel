import config from "@config/index.json";
import ImageFallback from "@layouts/components/ImageFallback";
import CustomForm from "@layouts/components/NewsLetterForm";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import Link from "next/link";
import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import MailchimpSubscribe from "react-mailchimp-subscribe";
const { blog_folder } = config.settings;
const { featured_posts, newsletter } = config.widgets;

const Sidebar = ({ posts, categories, className }) => {
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );

  const [showRecent, setShowRecent] = useState(false);

  return (
    <aside className={`${className} px-0 lg:col-4 lg:px-6`}>
      {/* categories widget */}
      {categories.enable && (
        <div className="mt-6 rounded-2xl border border-border/50 bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:border-darkmode-border/50 dark:bg-darkmode-theme-dark/20">
          <h4 className="section-title mb-8 text-center">
            {featured_posts.title}
          </h4>
          <ul>
            {categories.map((category, i) => (
              <li
                className={`relative mb-2 flex items-center justify-between rounded-lg pl-6 text-[15px] font-bold capitalize text-dark transition-all duration-300 hover:bg-gray-100/60 dark:text-darkmode-light dark:hover:bg-darkmode-theme-dark/40 ${
                  i !== categories.length - 1 &&
                  "border-b border-border/40 dark:border-darkmode-border/40"
                }`}
                key={i}
              >
                <svg
                  className="absolute left-0 top-3"
                  width="18px"
                  height="18px"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7318 9.35984C12.0854 8.93556 12.7159 8.87824 13.1402 9.2318C13.5645 9.58537 13.6218 10.2159 13.2682 10.6402L8.26825 16.6402C7.91468 17.0645 7.28412 17.1218 6.85984 16.7682C6.43556 16.4147 6.37824 15.7841 6.7318 15.3598L11.7318 9.35984Z"
                    fill="#2ba283"
                  />
                  <path
                    d="M6.7318 4.64021C6.37824 4.21593 6.43556 3.58537 6.85984 3.2318C7.28412 2.87824 7.91468 2.93556 8.26825 3.35984L13.2682 9.35984C13.6218 9.78412 13.5645 10.4147 13.1402 10.7682C12.7159 11.1218 12.0854 11.0645 11.7318 10.6402L6.7318 4.64021Z"
                    fill="#2ba283"
                  />
                </svg>
                <Link className="block w-full py-2.5" href={`/categories/${category.name}`}>
                  {category.name.replace("-", " ")}
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gray-200/80 px-2 py-0.5 text-[11px] font-semibold text-gray-600 dark:bg-darkmode-theme-dark/80 dark:text-darkmode-light/80">
                    {category.posts}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* featured widget */}
      {featured_posts.enable && (
        <div className="mt-6 rounded-2xl border border-border/50 bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:border-darkmode-border/50 dark:bg-darkmode-theme-dark/20">
          <h4 className="section-title mb-6 text-center">Unggulan</h4>
          <div className="mb-6 flex items-center justify-center rounded-xl bg-gray-100/70 p-1.5 dark:bg-darkmode-theme-dark/50">
            <button
              className={`btn flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                showRecent ? "text-text hover:text-primary dark:text-darkmode-light" : "bg-primary text-white shadow-md"
              }`}
              onClick={() => setShowRecent(false)}
            >
              Unggulan
            </button>
            <button
              className={`btn flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                showRecent ? "bg-primary text-white shadow-md" : "text-text hover:text-primary dark:text-darkmode-light"
              }`}
              onClick={() => setShowRecent(true)}
            >
              Terkini
            </button>
          </div>
          {showRecent
            ? sortPostByDate
                .slice(0, featured_posts.showPost)
                .map((post, i, arr) => (
                  <div
                    className={`group flex items-center rounded-xl p-2 transition-all duration-300 hover:bg-gray-100/60 dark:hover:bg-darkmode-theme-dark/40 ${
                      i !== arr.length - 1 &&
                      "mb-4 border-b border-border/40 pb-4 dark:border-darkmode-border/40"
                    }`}
                    key={`key-${i}`}
                  >
                    {post.frontmatter.image && (
                      <div className="mr-3 overflow-hidden rounded-full">
                        <ImageFallback
                          className="h-[65px] w-[65px] min-w-[65px] rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                          src={post.frontmatter.image}
                          alt={post.frontmatter.title}
                          width={65}
                          height={65}
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="h6 mb-1 text-sm transition-colors group-hover:text-primary">
                        <Link
                          href={`/${blog_folder}/${post.slug}`}
                          className="block hover:text-primary"
                        >
                          {post.frontmatter.title}
                        </Link>
                      </h3>
                      <p className="inline-flex items-center text-xs font-semibold text-gray-500 dark:text-darkmode-light/70">
                        <FaRegCalendar className="mr-1.5 text-primary text-xs" />
                        {dateFormat(post.frontmatter.date)}
                      </p>
                    </div>
                  </div>
                ))
            : featuredPosts
                .slice(0, featured_posts.showPost)
                .map((post, i, arr) => (
                  <div
                    className={`group flex items-center rounded-xl p-2 transition-all duration-300 hover:bg-gray-100/60 dark:hover:bg-darkmode-theme-dark/40 ${
                      i !== arr.length - 1 &&
                      "mb-4 border-b border-border/40 pb-4 dark:border-darkmode-border/40"
                    }`}
                    key={`key-${i}`}
                  >
                    {post.frontmatter.image && (
                      <div className="mr-3 overflow-hidden rounded-full">
                        <ImageFallback
                          className="h-[65px] w-[65px] min-w-[65px] rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                          src={post.frontmatter.image}
                          alt={post.frontmatter.title}
                          width={65}
                          height={65}
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="h6 mb-1 text-sm transition-colors group-hover:text-primary">
                        <Link
                          href={`/${blog_folder}/${post.slug}`}
                          className="block hover:text-primary"
                        >
                          {post.frontmatter.title}
                        </Link>
                      </h3>
                      <p className="inline-flex items-center text-xs font-semibold text-gray-500 dark:text-darkmode-light/70">
                        <FaRegCalendar className="mr-1.5 text-primary text-xs" />
                        {dateFormat(post.frontmatter.date)}
                      </p>
                    </div>
                  </div>
                ))}
        </div>
      )}

      {/* newsletter */}
      {newsletter.enable && (
        <div className="mt-6 rounded-2xl border border-border/50 bg-white/50 p-6 text-center shadow-sm backdrop-blur-sm dark:border-darkmode-border/50 dark:bg-darkmode-theme-dark/20">
          <h4 className="section-title">{newsletter.title}</h4>
          <p className="mt-4 text-xs leading-relaxed text-gray-600 dark:text-darkmode-light/80">{newsletter.content}</p>
          <MailchimpSubscribe
            url={newsletter.mailchimp_url}
            render={({ subscribe, status, message }) => (
              <CustomForm
                status={status}
                message={message}
                onValidated={(formData) => subscribe(formData)}
              />
            )}
          />
          <p className="mt-3 text-xs text-gray-500">
            Jika berlangganan, Anda telah menyetujui
            <Link
              href={newsletter.privacy_policy_page}
              className="ml-1 font-semibold text-primary hover:underline"
            >
              Kebijakan Privasi
            </Link>
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

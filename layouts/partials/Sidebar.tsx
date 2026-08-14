"use client";

import React, { useState } from "react";
import config from "@config/index.json";
import ImageFallback from "@layouts/components/ImageFallback";
import CustomForm from "@layouts/components/NewsLetterForm";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { PostItem, CategoryWithCount } from "@/types";

import AuthorCard from "@layouts/components/AuthorCard";

const { blog_folder } = config.settings;
const { featured_posts, newsletter } = config.widgets;

interface SidebarProps {
  posts: PostItem[];
  categories: any;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ posts, categories, className }) => {
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post: PostItem) => post.frontmatter.featured
  );

  const [showRecent, setShowRecent] = useState(false);
  const categoryList: CategoryWithCount[] = Array.isArray(categories) ? categories : [];

  return (
    <aside className={`${className || ""} px-0 lg:col-4 lg:px-6`}>
      {/* Author Profile Widget */}
      <AuthorCard layout="sidebar" />

      {/* Categories Widget */}
      {categories?.enable !== false && categoryList.length > 0 && (
        <div className="mt-2 rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/40">
          <h3 className="section-title text-xl font-extrabold tracking-tight">
            Kategori Artikel
          </h3>
          <ul className="mt-4 space-y-2">
            {categoryList
              .sort((a, b) => b.posts - a.posts)
              .slice(0, 5)
              .map((category, i) => (
                <li key={i}>
                  <Link
                    href={`/categories/${category.name}`}
                    className="group flex items-center justify-between rounded-xl border border-transparent px-4 py-2.5 text-sm font-bold text-slate-700 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:hover:border-slate-800 dark:hover:bg-slate-800/60"
                  >
                    <span className="capitalize group-hover:text-primary transition-colors">
                      {category.name.replace("-", " ")}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-800 dark:text-slate-300">
                      {category.posts}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
          {categoryList.length > 5 && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-center">
              <Link
                href="/categories"
                className="inline-flex items-center text-xs font-bold text-primary transition-all hover:underline"
              >
                <span>Lihat Semua Kategori ({categoryList.length})</span>
                <span className="ml-1">→</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Featured & Recent Tab Widget */}
      {featured_posts.enable && (
        <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/40">
          <div className="mb-6 flex items-center justify-center rounded-2xl bg-slate-100/80 p-1.5 dark:bg-slate-800/80">
            <button
              type="button"
              className={`flex-1 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-300 ${
                !showRecent
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "text-slate-600 hover:text-primary dark:text-slate-300"
              }`}
              onClick={() => setShowRecent(false)}
            >
              Unggulan
            </button>
            <button
              type="button"
              className={`flex-1 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-300 ${
                showRecent
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "text-slate-600 hover:text-primary dark:text-slate-300"
              }`}
              onClick={() => setShowRecent(true)}
            >
              Terkini
            </button>
          </div>

          <div className="space-y-4">
            {(showRecent ? sortPostByDate : featuredPosts)
              .slice(0, 4)
              .map((post: PostItem, i: number) => (
                <div
                  className="group flex items-center gap-3 rounded-2xl p-2.5 transition-all duration-300 hover:bg-blue-50/60 dark:hover:bg-slate-800/60"
                  key={`post-tab-${i}`}
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-extrabold text-primary dark:bg-slate-800 dark:text-blue-300 border border-blue-100 dark:border-slate-700/60">
                    0{i + 1}
                  </span>

                  {post.frontmatter.image && (
                    <div className="aspect-square h-[54px] w-[54px] flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                      <ImageFallback
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        width={54}
                        height={54}
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 text-xs font-bold leading-snug text-slate-800 transition-colors group-hover:text-primary dark:text-slate-100">
                      <Link href={`/${blog_folder}/${post.slug}`}>
                        {post.frontmatter.title}
                      </Link>
                    </h4>
                    {post.frontmatter.date && (
                      <p className="mt-1 inline-flex items-center text-[10px] font-medium text-slate-500 dark:text-slate-400">
                        <FaRegCalendar className="mr-1 text-primary text-[9px]" />
                        {dateFormat(post.frontmatter.date)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Newsletter Widget */}
      {newsletter.enable && (
        <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white/70 p-6 text-center shadow-lg backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/40">
          <h3 className="section-title text-xl font-extrabold tracking-tight">
            {newsletter.title || "Buletin"}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {newsletter.content}
          </p>
          <div className="mt-4">
            <MailchimpSubscribe
              url={newsletter.mailchimp_url}
              render={({ subscribe, status, message }: { subscribe: any; status: any; message: any }) => (
                <CustomForm
                  status={status}
                  message={message ? String(message) : undefined}
                  onValidated={(formData: any) => subscribe(formData)}
                />
              )}
            />
          </div>
          <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
            Dengan berlangganan, Anda menyetujui
            <Link
              href={newsletter.privacy_policy_page}
              className="ml-1 font-bold text-primary hover:underline"
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

"use client";

import React, { useState } from "react";
import Post from "@partials/Post";
import { PostItem } from "@/types";
import { slugify } from "@lib/utils/textConverter";

interface HomePostFilterProps {
  posts: PostItem[];
  categories: { name: string; posts: number }[];
}

const HomePostFilter: React.FC<HomePostFilterProps> = ({ posts, categories }) => {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredPosts = posts.filter((post) => {
    if (activeCategory === "Semua") return true;
    return post.frontmatter.categories?.some(
      (cat) => slugify(cat) === slugify(activeCategory)
    );
  });

  return (
    <div>
      {/* Category Tabs Bar */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800/80">
        <h2 className="section-title text-2xl font-extrabold tracking-tight">
          Artikel Terkini
        </h2>

        <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none py-1">
          <button
            type="button"
            onClick={() => setActiveCategory("Semua")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 ${
              activeCategory === "Semua"
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            Semua ({posts.length})
          </button>
          {categories.map((cat, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveCategory(cat.name)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold capitalize transition-all duration-300 ${
                activeCategory === cat.name
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {cat.name.replace("-", " ")} ({cat.posts})
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="row">
          {filteredPosts.map((post, i) => (
            <div key={`filtered-post-${i}`} className="mb-8 flex col-12 sm:col-6">
              <Post post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-12 text-center shadow-lg dark:border-slate-800/80 dark:bg-slate-900/40">
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
            Belum ada artikel dalam kategori ini.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePostFilter;

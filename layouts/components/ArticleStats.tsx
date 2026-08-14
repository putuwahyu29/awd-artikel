"use client";

import React from "react";
import { FaFileAlt, FaClock, FaCheckCircle, FaHeart } from "react-icons/fa";

interface ArticleStatsProps {
  words: string | number;
  readTime: string;
}

const ArticleStats: React.FC<ArticleStatsProps> = ({ words, readTime }) => {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50/70 p-6 shadow-sm dark:border-slate-800/80 dark:from-slate-900/80 dark:via-slate-900/50 dark:to-slate-900/80">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300">
            <FaCheckCircle size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Selesai Membaca Artikel Ini
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Terima kasih telah membaca artikel di Awd Artikel.
            </p>
          </div>
        </div>

        {/* Stats Badges */}
        <div className="flex items-center space-x-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center space-x-1.5 rounded-lg bg-white/80 px-3 py-1.5 shadow-2xs dark:bg-slate-800/80">
            <FaFileAlt className="text-primary" />
            <span>{words} Kata</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 rounded-lg bg-white/80 px-3 py-1.5 shadow-2xs dark:bg-slate-800/80">
            <FaClock className="text-primary" />
            <span>{readTime}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleStats;

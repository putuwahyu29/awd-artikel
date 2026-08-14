"use client";

import React from "react";
import config from "@config/index.json";
import social from "@config/social/index.json";
import Social from "@layouts/components/Social";
import ImageFallback from "@layouts/components/ImageFallback";

interface AuthorCardProps {
  layout?: "sidebar" | "article";
}

const AuthorCard: React.FC<AuthorCardProps> = ({ layout = "sidebar" }) => {
  const { about } = config.widgets;
  if (!about.enable) return null;

  const authorName = about.name || config.metadata.meta_author || "Agus Wahyu";
  const authorRole = about.role || "Tech Writer & Developer";
  const authorBio = about.bio || "Penulis dan pengembang sistem. Berbagi wawasan seputar teknologi, Linux, dan pemrograman.";
  const authorAvatar = about.avatar || "/images/site/favicon.png";

  if (layout === "article") {
    return (
      <div className="my-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/40">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-primary/30 bg-primary/10 shadow-md">
          <ImageFallback
            src={authorAvatar}
            alt={authorName}
            width={80}
            height={80}
            className="h-full w-full object-cover rounded-xl"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                {authorName}
              </h4>
              <span className="inline-block text-xs font-bold text-primary">
                {authorRole}
              </span>
            </div>
            <Social source={social} className="socials flex items-center justify-center sm:justify-end space-x-2 mt-2 sm:mt-0" />
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {authorBio}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-3xl border border-slate-200/80 bg-white/70 p-6 text-center shadow-lg backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/40">
      <div className="relative mx-auto mb-3.5 h-20 w-20 overflow-hidden rounded-2xl border-2 border-primary/30 bg-indigo-50/50 dark:bg-slate-800 p-1.5 shadow-md">
        <ImageFallback
          src={authorAvatar}
          alt={authorName}
          width={80}
          height={80}
          className="h-full w-full object-cover rounded-xl"
        />
      </div>

      <h3 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
        {authorName}
      </h3>
      <span className="inline-block mt-0.5 rounded-full bg-blue-50 px-3 py-0.5 text-[11px] font-bold text-primary dark:bg-blue-950/60 dark:text-blue-300">
        {authorRole}
      </span>

      <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
        {authorBio}
      </p>

      <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800/60">
        <Social source={social} className="socials flex items-center justify-center space-x-2" />
      </div>
    </div>
  );
};

export default AuthorCard;

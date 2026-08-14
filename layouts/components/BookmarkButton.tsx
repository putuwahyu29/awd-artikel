"use client";

import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useReadingTracker } from "@lib/utils/readingTracker";

interface BookmarkButtonProps {
  slug: string;
  variant?: "icon" | "toolbar";
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ slug, variant = "icon" }) => {
  const { isBookmarked, toggleBookmark } = useReadingTracker();
  const saved = isBookmarked(slug);

  if (variant === "toolbar") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleBookmark(slug);
        }}
        className={`flex items-center space-x-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all active:scale-95 ${
          saved
            ? "bg-amber-500 text-white shadow-md shadow-amber-500/25"
            : "bg-slate-200/60 text-slate-700 hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-primary dark:hover:text-white"
        }`}
        title={saved ? "Hapus dari Daftar Bacaan" : "Simpan ke Daftar Bacaan"}
      >
        {saved ? (
          <>
            <FaBookmark size={12} />
            <span>Tersimpan</span>
          </>
        ) : (
          <>
            <FaRegBookmark size={12} />
            <span>Simpan</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(slug);
      }}
      className={`z-20 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 active:scale-90 ${
        saved
          ? "bg-amber-500 text-white shadow-md shadow-amber-500/30"
          : "bg-slate-900/70 text-white hover:bg-primary"
      }`}
      title={saved ? "Hapus dari Bookmark" : "Simpan ke Bookmark"}
    >
      {saved ? <FaBookmark size={12} /> : <FaRegBookmark size={12} />}
    </button>
  );
};

export default BookmarkButton;

"use client";

import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useReadingTracker } from "@lib/utils/readingTracker";

interface BookmarkButtonProps {
  slug: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ slug }) => {
  const { isBookmarked, toggleBookmark } = useReadingTracker();
  const saved = isBookmarked(slug);

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

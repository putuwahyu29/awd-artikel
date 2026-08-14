"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { IoClose, IoBookmark, IoTrashOutline } from "react-icons/io5";
import { FaRegClock, FaTrashAlt } from "react-icons/fa";
import { useReadingTracker } from "@lib/utils/readingTracker";
import { useSearchContext } from "context/state";
import readingTime from "@lib/utils/readingTime";

interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookmarkModal: React.FC<BookmarkModalProps> = ({ isOpen, onClose }) => {
  const { bookmarks, toggleBookmark, clearBookmarks } = useReadingTracker();
  const { posts } = useSearchContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body & documentElement scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // Filter posts that match saved bookmarks
  const bookmarkedPosts = (posts || []).filter((post) => bookmarks.includes(post.slug));
  const filteredPosts = bookmarkedPosts.filter((post) =>
    post.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {/* Backdrop overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(2, 6, 23, 0.6)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative z-[1000000] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
              <IoBookmark className="text-lg" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Daftar Bacaan Saya
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {bookmarkedPosts.length} Artikel Tersimpan
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white transition-colors"
            aria-label="Tutup"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        {/* Search & Actions Bar */}
        {bookmarkedPosts.length > 0 && (
          <div className="border-b border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="flex items-center justify-between space-x-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari artikel tersimpan..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={clearBookmarks}
                className="flex items-center space-x-1 whitespace-nowrap rounded-xl border border-rose-200/80 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400 transition-colors"
                title="Hapus Semua Bookmark"
              >
                <FaTrashAlt size={10} />
                <span className="hidden sm:inline">Kosongkan</span>
              </button>
            </div>
          </div>
        )}

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
          {bookmarkedPosts.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center p-6">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500">
                <IoBookmark className="text-3xl" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Belum Ada Artikel Tersimpan
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mb-6">
                Klik ikon 🔖 pada kartu artikel atau toolbar bacaan untuk menyimpannya ke daftar ini.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-primary px-5 py-2 text-xs font-bold text-white shadow-md shadow-primary/25 hover:bg-blue-600 transition-colors"
              >
                Jelajahi Artikel
              </button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              Tidak ada artikel tersimpan yang cocok dengan &quot;{searchTerm}&quot;
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <div
                  key={post.slug}
                  className="group relative flex items-start space-x-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs transition-all hover:border-primary/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/60"
                >
                  <div className="flex-1 min-w-0">
                    {post.frontmatter.categories?.[0] && (
                      <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary mb-1">
                        {post.frontmatter.categories[0]}
                      </span>
                    )}
                    <Link
                      href={`/posts/${post.slug}`}
                      onClick={onClose}
                      className="block font-bold text-xs text-slate-900 hover:text-primary dark:text-white line-clamp-2 leading-snug"
                    >
                      {post.frontmatter.title}
                    </Link>
                    <div className="mt-2 flex items-center space-x-3 text-[11px] text-slate-400">
                      <span className="flex items-center space-x-1">
                        <FaRegClock size={10} />
                        <span>{readingTime(post.content)}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleBookmark(post.slug)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950/50 transition-colors"
                    title="Hapus dari daftar bacaan"
                  >
                    <IoTrashOutline className="text-base" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BookmarkModal;

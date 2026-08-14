"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearchContext } from "context/state";
import config from "@config/index.json";
import { slugify } from "@lib/utils/textConverter";
import readingTime from "@lib/utils/readingTime";
import dateFormat from "@lib/utils/dateFormat";
import wordCount from "@lib/utils/wordCount";
import ImageFallback from "@layouts/components/ImageFallback";
import {
  IoSearch,
  IoClose,
  IoArrowForward,
  IoTimeOutline,
  IoReturnDownBack,
  IoSparkles,
  IoFolderOpenOutline,
} from "react-icons/io5";
import { FaRegCalendar, FaArrowUp, FaArrowDown, FaFileAlt } from "react-icons/fa";

const { blog_folder } = config.settings;

interface SearchModalProps {
  searchModal: boolean;
  setSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal: React.FC<SearchModalProps> = ({ searchModal, setSearchModal }) => {
  const router = useRouter();
  const { posts } = useSearchContext();
  const [input, setInput] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchModal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSearchModal]);

  // Focus input when modal opens & lock body & html scroll
  useEffect(() => {
    if (searchModal) {
      setInput("");
      setActiveCategory("Semua");
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [searchModal]);

  // Filter posts based on search input & category filter
  const keyword = slugify(input.trim());
  const searchResults = (posts || []).filter((post) => {
    if (post.frontmatter.draft) return false;

    // Filter by Category Chip if selected
    if (activeCategory !== "Semua") {
      const matchCat = post.frontmatter.categories?.some(
        (cat) => slugify(cat) === slugify(activeCategory)
      );
      if (!matchCat) return false;
    }

    if (!keyword) return true; // Show all when no text typed

    const titleMatch = slugify(post.frontmatter.title || "")?.includes(keyword);
    const categoryMatch = post.frontmatter.categories?.some((cat) =>
      slugify(cat)?.includes(keyword)
    );
    const contentMatch = slugify(post.content || "")?.includes(keyword);
    return titleMatch || categoryMatch || contentMatch;
  });

  // Limit default items when search is empty to top 5 recent posts
  const displayedResults = !input.trim() && activeCategory === "Semua"
    ? searchResults.slice(0, 5)
    : searchResults;

  // Reset selectedIndex when input or category changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [input, activeCategory]);

  // Keyboard navigation within modal (Up, Down, Enter, Escape)
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSearchModal(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (displayedResults.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % displayedResults.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (displayedResults.length > 0) {
        setSelectedIndex(
          (prev) => (prev - 1 + displayedResults.length) % displayedResults.length
        );
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (displayedResults.length > 0 && displayedResults[selectedIndex]) {
        const selectedPost = displayedResults[selectedIndex];
        router.push(`/${blog_folder}/${selectedPost.slug}`);
        setSearchModal(false);
      } else if (input.trim()) {
        router.push(`/search?key=${encodeURIComponent(input.trim())}`);
        setSearchModal(false);
      }
    }
  };

  if (!searchModal || !mounted) return null;

  const categories = ["Semua", "Chrome OS", "Proxmox", "DevOps", "Open Source", "MongoDB"];

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      onClick={() => setSearchModal(false)}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200/80 bg-white/95 shadow-2xl backdrop-blur-xl transition-all dark:border-darkmode-border/70 dark:bg-darkmode-body/95 z-[100000] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleModalKeyDown}
      >
        {/* Top Header Search Input Bar */}
        <div className="relative flex items-center border-b border-gray-200/80 px-6 py-4 dark:border-darkmode-border/60">
          <IoSearch className="mr-3.5 text-2xl text-primary flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-lg font-medium text-gray-900 outline-none border-none focus:outline-none focus:ring-0 focus:border-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
            placeholder="Cari artikel, topik, atau kata kunci..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {input && (
            <button
              type="button"
              onClick={() => setInput("")}
              className="mr-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-darkmode-theme-dark dark:hover:text-white transition-colors"
              title="Bersihkan Pencarian"
            >
              <IoClose size={20} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center rounded-lg border border-gray-300/60 bg-gray-100 px-2 py-1 text-[11px] font-bold text-gray-500 shadow-xs dark:border-darkmode-border/60 dark:bg-darkmode-theme-dark dark:text-gray-400">
            ESC
          </kbd>
        </div>

        {/* Quick Category Filter Chips Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto border-b border-gray-100 px-6 py-3 scrollbar-none dark:border-darkmode-border/30 bg-gray-50/50 dark:bg-darkmode-theme-dark/30">
          <span className="mr-1 inline-flex items-center text-xs font-semibold text-gray-400 dark:text-gray-500 flex-shrink-0">
            <IoFolderOpenOutline className="mr-1" /> Filter:
          </span>
          {categories.map((cat, i) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 rounded-full px-3.5 py-1 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-xs"
                    : "bg-gray-200/60 text-gray-700 hover:bg-gray-300/60 dark:bg-darkmode-theme-dark dark:text-gray-300 dark:hover:bg-gray-700/60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Results Body */}
        <div className="max-h-[58vh] overflow-y-auto p-3 scrollbar-thin">
          {displayedResults.length > 0 ? (
            <div className="space-y-1.5">
              <div className="px-3 py-1 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                <span>
                  {!input.trim() && activeCategory === "Semua"
                    ? "Rekomendasi Artikel Terkini"
                    : `${displayedResults.length} Hasil Ditemukan`}
                </span>
                {input.trim() && (
                  <span className="text-[11px] font-normal text-primary">
                    Tekan ENTER untuk memilih
                  </span>
                )}
              </div>

              {displayedResults.map((post, index) => {
                const isSelected = index === selectedIndex;
                const readTime = readingTime(post.content || "");
                const words = wordCount(post.content || "");
                return (
                  <div
                    key={post.slug}
                    onClick={() => {
                      router.push(`/${blog_folder}/${post.slug}`);
                      setSearchModal(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`group relative flex cursor-pointer items-center rounded-2xl p-3.5 transition-all duration-200 ${
                      isSelected
                        ? "bg-primary/10 border-l-4 border-primary dark:bg-primary/20 shadow-xs translate-x-1"
                        : "hover:bg-gray-100/70 border-l-4 border-transparent dark:hover:bg-darkmode-theme-dark/50"
                    }`}
                  >
                    {post.frontmatter.image && (
                      <div className="mr-4 aspect-video h-14 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-darkmode-theme-dark">
                        <ImageFallback
                          src={post.frontmatter.image}
                          alt={post.frontmatter.title || "Post thumbnail"}
                          width={96}
                          height={56}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-medium text-gray-500 dark:text-gray-400">
                        {post.frontmatter.categories?.[0] && (
                          <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary dark:bg-primary/25 dark:text-primary">
                            {post.frontmatter.categories[0]}
                          </span>
                        )}
                        {post.frontmatter.date && (
                          <span className="inline-flex items-center">
                            <FaRegCalendar className="mr-1 text-[9px] text-primary" />
                            {dateFormat(post.frontmatter.date)}
                          </span>
                        )}
                        <span className="inline-flex items-center">
                          <IoTimeOutline className="mr-1 text-[10px] text-primary" />
                          {readTime}
                        </span>
                        <span className="hidden sm:inline-flex items-center">
                          <FaFileAlt className="mr-1 text-[9px] text-primary" />
                          {words}
                        </span>
                      </div>
                      <h4 className="truncate text-sm font-bold text-gray-900 group-hover:text-primary dark:text-white">
                        {post.frontmatter.title}
                      </h4>
                    </div>
                    <div className="ml-3">
                      <IoArrowForward
                        className={`text-lg transition-all duration-200 ${
                          isSelected
                            ? "translate-x-1 text-primary opacity-100"
                            : "text-gray-300 opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-14 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-darkmode-theme-dark dark:text-gray-500">
                <IoSparkles className="text-xl" />
              </div>
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Tidak ada artikel yang cocok dengan &quot;{input}&quot;
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Coba pilih filter kategori atau gunakan kata kunci lain.
              </p>
            </div>
          )}
        </div>

        {/* Command Palette Footer Bar */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/90 px-6 py-3.5 text-xs text-gray-500 backdrop-blur-md dark:border-darkmode-border/50 dark:bg-darkmode-theme-dark/80 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center space-x-1.5">
              <kbd className="rounded-md border border-gray-300/60 bg-white px-1.5 py-0.5 text-[10px] font-bold shadow-xs dark:border-darkmode-border/60 dark:bg-darkmode-body dark:text-gray-300">
                <FaArrowUp className="inline text-[8px]" />
              </kbd>
              <kbd className="rounded-md border border-gray-300/60 bg-white px-1.5 py-0.5 text-[10px] font-bold shadow-xs dark:border-darkmode-border/60 dark:bg-darkmode-body dark:text-gray-300">
                <FaArrowDown className="inline text-[8px]" />
              </kbd>
              <span className="font-medium">Navigasi</span>
            </span>
            <span className="inline-flex items-center space-x-1.5">
              <kbd className="rounded-md border border-gray-300/60 bg-white px-2 py-0.5 text-[10px] font-bold shadow-xs dark:border-darkmode-border/60 dark:bg-darkmode-body dark:text-gray-300">
                <IoReturnDownBack className="inline text-[9px]" />
              </kbd>
              <span className="font-medium">Pilih Artikel</span>
            </span>
          </div>
          <span className="font-bold text-primary text-[11px] tracking-wide uppercase">
            Awd Command Palette
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;

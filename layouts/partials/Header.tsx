"use client";

import Logo from "@components/Logo";
import menu from "@config/menu/index.json";
import socical from "@config/social/index.json";
import Social from "@layouts/components/Social";
import ThemeSwitcher from "@layouts/components/ThemeSwitcher";
import LanguageSwitcher from "@layouts/components/LanguageSwitcher";
import BookmarkModal from "@layouts/components/BookmarkModal";
import SearchModal from "@partials/SearchModal";
import { useReadingTracker } from "@lib/utils/readingTracker";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoSearch, IoClose, IoMenu, IoBookmark } from "react-icons/io5";

export default function Header() {
  const main: any[] = menu.main;
  const [searchModal, setSearchModal] = useState(false);
  const [bookmarkModal, setBookmarkModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { bookmarks } = useReadingTracker();

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [showMenu]);

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  // Global shortcut (Cmd+K / Ctrl+K) to toggle search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchModal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="header">
      <nav className="navbar container px-4 sm:px-8">
        <div className="order-0">
          <Logo />
        </div>
        <div className="flex items-center space-x-2.5 sm:space-x-4">
          {/* Desktop Navigation Links */}
          <ul
            id="nav-menu"
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
          >
            {main.map((menuItem: any, i: number) => (
              <React.Fragment key={`menu-${i}`}>
                {menuItem.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    <span
                      className={`nav-link ${
                        menuItem.children
                          ?.map((c: any) => c.url)
                          .includes(pathname) ? "active" : ""
                      } inline-flex items-center cursor-pointer`}
                    >
                      {menuItem.name}
                      <svg
                        className="h-4 w-4 fill-current ml-1 transition-transform group-hover:rotate-180"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list hidden transition-all duration-300 group-hover:top-[42px] group-hover:block md:invisible md:absolute md:top-[55px] md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                      {menuItem.children?.map((child: any, j: number) => (
                        <li
                          className="nav-dropdown-item"
                          key={`children-${j}`}
                        >
                          <Link
                            href={child.url}
                            className={`nav-dropdown-link block ${
                              pathname === child.url ? "active" : ""
                            }`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      href={menuItem.url}
                      className={`nav-link block ${
                        pathname === menuItem.url ? "active" : ""
                      }`}
                    >
                      {menuItem.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>

          {/* Bookmark Drawer Button - Hidden on small mobile screens, circular below md */}
          <button
            type="button"
            onClick={() => setBookmarkModal(true)}
            className="hidden sm:flex relative h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/80 text-xs font-semibold text-slate-700 transition-all duration-300 hover:border-amber-400 hover:bg-white hover:text-amber-500 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-amber-400 active:scale-95 md:h-auto md:w-auto md:px-3 md:py-1.5 md:space-x-1.5"
            title="Daftar Bacaan Saya (Artikel Tersimpan)"
          >
            <IoBookmark className="text-base text-amber-500 shrink-0" />
            <span className="hidden md:inline font-bold">Daftar Bacaan</span>
            {bookmarks.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white shadow-xs md:relative md:top-auto md:right-auto">
                {bookmarks.length}
              </span>
            )}
          </button>

          {/* Language Switcher - Hidden on small mobile screens */}
          <div className="hidden sm:inline-flex">
            <LanguageSwitcher />
          </div>

          <ThemeSwitcher />

          {/* Header search button */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/80 text-slate-700 transition-all duration-300 hover:border-primary/40 hover:bg-slate-200/80 hover:text-primary dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700/80 dark:hover:text-primary active:scale-95 md:h-auto md:w-auto md:px-3.5 md:py-1.5 md:space-x-2"
            onClick={() => setSearchModal(true)}
            aria-label="Cari Artikel (Ctrl+K)"
          >
            <IoSearch className="text-base text-primary" />
            <span className="hidden md:inline text-xs font-semibold">Cari...</span>
            <kbd className="hidden rounded-md bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 shadow-xs dark:bg-slate-700 dark:text-slate-300 md:inline-block">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/25 transition-transform active:scale-95 lg:hidden"
            aria-label="Buka Menu"
          >
            {showMenu ? (
              <IoClose className="text-xl" />
            ) : (
              <IoMenu className="text-xl" />
            )}
          </button>
        </div>

        <SearchModal
          searchModal={searchModal}
          setSearchModal={setSearchModal}
        />
        <BookmarkModal
          isOpen={bookmarkModal}
          onClose={() => setBookmarkModal(false)}
        />
      </nav>

      {/* Mobile Drawer & Blurred Backdrop Overlay via Portal */}
      {mounted && showMenu && createPortal(
        <div style={{ position: "fixed", inset: 0, zIndex: 999999, display: "flex", justifyContent: "flex-end" }} className="lg:hidden">
          <div
            onClick={() => setShowMenu(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(2, 6, 23, 0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />
          <div className="relative z-[1000000] flex h-full w-full max-w-[320px] flex-col justify-start border-l border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900/95 animate-in slide-in-from-right duration-200">
            {/* Mobile Drawer Top Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <Logo />
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-primary/10 hover:text-primary dark:bg-slate-800 dark:text-slate-200"
                onClick={() => setShowMenu(false)}
                aria-label="Tutup Menu"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Mobile Drawer Body */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              {/* Mobile Navigation Links */}
              <ul className="space-y-1">
                {main.map((menuItem: any, i: number) => (
                  <li key={`mobile-menu-${i}`}>
                    <Link
                      href={menuItem.url}
                      onClick={() => setShowMenu(false)}
                      className={`block rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition-all ${
                        pathname === menuItem.url
                          ? "bg-primary text-white font-bold shadow-md shadow-primary/20"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {menuItem.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Features & Tools Section */}
              <div className="border-t border-slate-100 pt-6 dark:border-slate-800 space-y-3">
                <p className="px-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Fitur & Alat
                </p>

                <div className="flex flex-col space-y-1.5 px-1">
                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      setBookmarkModal(true);
                    }}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <IoBookmark className="text-base text-amber-500" />
                      <span>Daftar Bacaan Saya</span>
                    </div>
                    {bookmarks.length > 0 && (
                      <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white">
                        {bookmarks.length}
                      </span>
                    )}
                  </button>

                  {/* Language Switcher Row */}
                  <div className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    <span>Bahasa / Language</span>
                    <LanguageSwitcher />
                  </div>

                  {/* Search Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      setSearchModal(true);
                    }}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <IoSearch className="text-base text-primary" />
                      <span>Cari Artikel</span>
                    </div>
                    <kbd className="rounded bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                      ⌘K
                    </kbd>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}

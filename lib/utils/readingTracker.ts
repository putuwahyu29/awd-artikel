"use client";

import { useEffect, useState } from "react";

const BOOKMARK_KEY = "awd_bookmarks";
const READ_HISTORY_KEY = "awd_read_history";

export function useReadingTracker() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [readHistory, setReadHistory] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const storedBookmarks = localStorage.getItem(BOOKMARK_KEY);
      if (storedBookmarks) setBookmarks(JSON.parse(storedBookmarks));

      const storedHistory = localStorage.getItem(READ_HISTORY_KEY);
      if (storedHistory) setReadHistory(JSON.parse(storedHistory));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleBookmark = (slug: string) => {
    try {
      let updated: string[];
      if (bookmarks.includes(slug)) {
        updated = bookmarks.filter((s) => s !== slug);
      } else {
        updated = [...bookmarks, slug];
      }
      setBookmarks(updated);
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const markAsRead = (slug: string) => {
    try {
      if (!readHistory.includes(slug)) {
        const updated = [...readHistory, slug];
        setReadHistory(updated);
        localStorage.setItem(READ_HISTORY_KEY, JSON.stringify(updated));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    bookmarks,
    readHistory,
    toggleBookmark,
    markAsRead,
    isBookmarked: (slug: string) => mounted && bookmarks.includes(slug),
    isRead: (slug: string) => mounted && readHistory.includes(slug),
  };
}

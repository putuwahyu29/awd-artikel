"use client";

import React, { useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaPrint,
  FaSearchPlus,
  FaSearchMinus,
  FaRedoAlt,
} from "react-icons/fa";

import BookmarkButton from "./BookmarkButton";

interface ArticleToolbarProps {
  content: string;
  title: string;
  slug: string;
  onFontSizeChange: (size: "small" | "normal" | "large") => void;
  currentFontSize: "small" | "normal" | "large";
}

const ArticleToolbar: React.FC<ArticleToolbarProps> = ({
  content,
  title,
  slug,
  onFontSizeChange,
  currentFontSize,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSupported(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    if (!speechSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const cleanText = content
        .replace(/^#+\s+/gm, "")
        .replace(/[*_~`]/g, "")
        .replace(/<[^>]*>/g, "")
        .trim();

      const textToRead = `${title}. ${cleanText}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = "id-ID";
      utterance.rate = 1.0;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="my-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-5 py-3 shadow-xs backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/60">
      <div className="flex flex-wrap items-center gap-2">
        {/* Audio Speech Reader */}
        {speechSupported && (
          <button
            type="button"
            onClick={handleToggleSpeech}
            className={`flex items-center space-x-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
              isPlaying
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/25 animate-pulse"
                : "bg-primary text-white shadow-md shadow-primary/25 hover:bg-blue-600 active:scale-95"
            }`}
            title="Dengarkan Suara Artikel"
          >
            {isPlaying ? (
              <>
                <FaPause size={11} />
                <span>Jeda Suara</span>
              </>
            ) : (
              <>
                <FaVolumeUp size={12} />
                <span>Dengarkan Artikel</span>
              </>
            )}
          </button>
        )}

        {/* Bookmark Save Button */}
        <BookmarkButton slug={slug} variant="toolbar" />
      </div>

      {/* Font Size & Utility Buttons */}
      <div className="flex items-center space-x-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
        <span className="hidden sm:inline text-slate-400">Ukuran Teks:</span>
        <div className="flex items-center space-x-1 rounded-xl bg-slate-200/60 p-1 dark:bg-slate-800/80">
          <button
            type="button"
            onClick={() => onFontSizeChange("small")}
            className={`rounded-lg px-2.5 py-1 transition-all ${
              currentFontSize === "small"
                ? "bg-white text-primary shadow-xs dark:bg-slate-700 dark:text-white"
                : "hover:text-primary"
            }`}
            title="Ukuran Kecil"
          >
            A-
          </button>
          <button
            type="button"
            onClick={() => onFontSizeChange("normal")}
            className={`rounded-lg px-2.5 py-1 transition-all ${
              currentFontSize === "normal"
                ? "bg-white text-primary shadow-xs dark:bg-slate-700 dark:text-white"
                : "hover:text-primary"
            }`}
            title="Ukuran Normal"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => onFontSizeChange("large")}
            className={`rounded-lg px-2.5 py-1 transition-all ${
              currentFontSize === "large"
                ? "bg-white text-primary shadow-xs dark:bg-slate-700 dark:text-white"
                : "hover:text-primary"
            }`}
            title="Ukuran Besar"
          >
            A+
          </button>
        </div>

        {/* Print Button */}
        <button
          type="button"
          onClick={handlePrint}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-200/60 transition-all hover:bg-primary hover:text-white dark:bg-slate-800 dark:hover:bg-primary dark:hover:text-white active:scale-95"
          title="Cetak Artikel (PDF)"
        >
          <FaPrint size={12} />
        </button>
      </div>
    </div>
  );
};

export default ArticleToolbar;

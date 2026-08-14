"use client";

import React, { useState, useEffect } from "react";
import { FaTimes, FaBullhorn } from "react-icons/fa";

const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("announcement_dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("announcement_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary via-emerald-600 to-teal-700 px-4 py-2 text-center text-xs font-semibold text-white shadow-sm">
      <div className="container mx-auto flex items-center justify-center space-x-2 pr-6">
        <FaBullhorn className="animate-bounce text-amber-300 text-sm flex-shrink-0" />
        <span className="truncate">
          Selamat datang di <strong>Awd Artikel</strong>! Dapatkan panduan & artikel terbaru seputar Tech, Linux & Open Source.
        </span>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
        aria-label="Tutup Pengumuman"
      >
        <FaTimes size={12} />
      </button>
    </div>
  );
};

export default AnnouncementBar;

"use client";

import React, { useState } from "react";
import { FaImage } from "react-icons/fa";

export const MdxImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  const { src, alt, className } = props;
  const [hasError, setHasError] = useState(false);

  if (!src) return null;

  const cleanAlt = alt === "Sedang Memuat" ? "Gambar Artikel" : alt || "Gambar Artikel";

  if (hasError) {
    return (
      <span className="my-6 flex items-center justify-center space-x-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 text-xs font-medium text-slate-400 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-500">
        <FaImage className="text-slate-300 dark:text-slate-600 text-sm" />
        <span>Gambar tidak dapat dimuat ({cleanAlt})</span>
      </span>
    );
  }

  return (
    <span className="my-6 block overflow-hidden rounded-2xl border border-slate-200/80 shadow-md dark:border-slate-800/80">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        src={src}
        alt={cleanAlt}
        className={`${className || ""} w-full h-auto object-cover`}
        onError={() => setHasError(true)}
      />
    </span>
  );
};

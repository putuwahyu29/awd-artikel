"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FaHome, FaRedoAlt } from "react-icons/fa";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error Boundary Caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto max-w-lg rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
          <FaRedoAlt size={24} />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Terjadi Kesalahan Server
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Maaf, halaman ini mengalami gangguan saat memuat data. Silakan coba muat ulang halaman.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center space-x-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-primary/25 hover:bg-blue-600 active:scale-95 transition-all"
          >
            <FaRedoAlt size={12} />
            <span>Muat Ulang Halaman</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:border-primary hover:text-primary dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:text-primary active:scale-95 transition-all"
          >
            <FaHome size={13} />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

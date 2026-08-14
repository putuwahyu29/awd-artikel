import React from "react";
import Link from "next/link";
import { FaHome, FaBookOpen } from "react-icons/fa";

interface NotFoundProps {
  data?: any;
}

const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-600/20 via-sky-500/15 to-cyan-400/10 blur-3xl" />

      <div className="container px-4 text-center">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200/80 bg-white/70 p-8 sm:p-12 shadow-xl backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/50">
          {/* Big 404 Hero Number */}
          <span className="inline-block bg-gradient-to-r from-primary via-sky-500 to-cyan-500 bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-9xl">
            404
          </span>

          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Halaman Tidak Ditemukan
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau alamat URL yang Anda tuju salah.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 rounded-full bg-primary px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-600 active:scale-95"
            >
              <FaHome size={14} />
              <span>Kembali ke Beranda</span>
            </Link>
            <Link
              href="/posts"
              className="inline-flex items-center space-x-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-xs font-bold text-slate-700 shadow-xs transition-all hover:border-primary hover:bg-slate-50 hover:text-primary dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary active:scale-95"
            >
              <FaBookOpen size={13} />
              <span>Lihat Semua Artikel</span>
            </Link>
          </div>

          {/* Quick Category Suggestions */}
          <div className="mt-10 border-t border-slate-100 pt-6 dark:border-slate-800/60">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Atau jelajahi topik berikut:
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/categories/linux"
                className="rounded-full bg-slate-100/80 px-3.5 py-1 text-xs font-semibold text-slate-700 transition-all hover:bg-primary/10 hover:text-primary dark:bg-slate-800/80 dark:text-slate-300 dark:hover:text-primary"
              >
                Linux
              </Link>
              <Link
                href="/categories/devops"
                className="rounded-full bg-slate-100/80 px-3.5 py-1 text-xs font-semibold text-slate-700 transition-all hover:bg-primary/10 hover:text-primary dark:bg-slate-800/80 dark:text-slate-300 dark:hover:text-primary"
              >
                DevOps & Cloud
              </Link>
              <Link
                href="/categories/web-development"
                className="rounded-full bg-slate-100/80 px-3.5 py-1 text-xs font-semibold text-slate-700 transition-all hover:bg-primary/10 hover:text-primary dark:bg-slate-800/80 dark:text-slate-300 dark:hover:text-primary"
              >
                Web Development
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

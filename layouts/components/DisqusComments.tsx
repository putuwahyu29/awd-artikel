"use client";

import React, { useEffect, useState } from "react";

interface DisqusCommentsProps {
  shortname: string;
  url: string;
  identifier: string;
  title: string;
}

const DisqusComments: React.FC<DisqusCommentsProps> = ({
  shortname,
  url,
  identifier,
  title,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!shortname || typeof window === "undefined") return;

    setHasError(false);
    setIsLoading(true);

    (window as any).disqus_config = function () {
      this.page.url = url;
      this.page.identifier = identifier;
      this.page.title = title;
      this.language = "id";
    };

    if ((window as any).DISQUS) {
      try {
        (window as any).DISQUS.reset({
          reload: true,
          config: function () {
            this.page.url = url;
            this.page.identifier = identifier;
            this.page.title = title;
            this.language = "id";
          },
        });
      } catch (e) {
        // Silently catch internal Disqus parseColor legacy warnings
        console.warn("Disqus reset notice:", e);
      } finally {
        setIsLoading(false);
      }
    } else {
      const scriptId = "disqus-embed-script";
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }

      const d = document;
      const s = d.createElement("script");
      s.id = scriptId;
      s.src = `https://${shortname}.disqus.com/embed.js`;
      s.setAttribute("data-timestamp", `${+new Date()}`);
      s.async = true;

      s.onload = () => setIsLoading(false);
      s.onerror = () => {
        setHasError(true);
        setIsLoading(false);
      };

      (d.head || d.body).appendChild(s);
    }
  }, [shortname, url, identifier, title]);

  return (
    <div className="relative mt-4 min-h-[180px]">
      {isLoading && !hasError && (
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 py-6">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Memuat kolom komentar Disqus ({shortname})...</span>
        </div>
      )}

      {hasError && (
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-5 text-xs font-medium text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300">
          <p className="font-bold text-sm text-amber-900 dark:text-amber-200 mb-1">
            Gagal Memuat Komentar Disqus (Shortname: &quot;{shortname}&quot;)
          </p>
          <p className="leading-relaxed">
            Skrip <code className="bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded">https://{shortname}.disqus.com/embed.js</code> tidak dapat terhubung. Hal ini terjadi jika:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
            <li>Nama shortname <strong>&quot;{shortname}&quot;</strong> belum dibuat/didaftarkan secara resmi di <a href="https://disqus.com/profile/signup" target="_blank" rel="noreferrer" className="underline font-bold text-primary">Disqus.com</a>.</li>
            <li>Ekstensi <strong>AdBlocker / Tracking Protection</strong> di browser Anda memblokir domain disqus.com.</li>
          </ul>
        </div>
      )}

      <div
        id="disqus_thread"
        className={hasError ? "hidden" : "block"}
        style={{ minHeight: "200px" }}
      />
    </div>
  );
};

export default DisqusComments;

"use client";

import React, { useState, useRef } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

export const CodeBlockPre: React.FC<React.HTMLAttributes<HTMLPreElement>> = (props) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    if (!preRef.current) return;
    const text = preRef.current.innerText || preRef.current.textContent || "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all dark:border-slate-800 dark:bg-[#0b1329] dark:shadow-2xl">
      {/* Code Block Terminal Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/90 px-4 py-2.5 text-xs font-bold text-slate-600 dark:border-slate-800/80 dark:bg-slate-900/90 dark:text-slate-400">
        <span className="flex items-center space-x-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center space-x-1.5 rounded-lg border border-slate-300/80 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-xs transition-all hover:border-primary/50 hover:bg-slate-50 hover:text-primary active:scale-95 dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-primary"
          title="Salin Kode Ke Clipboard"
        >
          {copied ? (
            <>
              <FaCheck className="text-emerald-500 text-xs" />
              <span className="text-emerald-500">Tersalin!</span>
            </>
          ) : (
            <>
              <FaCopy className="text-xs" />
              <span>Salin Kode</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content Area */}
      <div className="p-4 sm:p-5 overflow-x-auto bg-white dark:bg-[#0b1329]">
        <pre
          ref={preRef}
          {...props}
          className={`${props.className || ""} text-xs sm:text-sm leading-relaxed text-slate-900 font-mono font-medium dark:text-slate-100`}
        />
      </div>
    </div>
  );
};

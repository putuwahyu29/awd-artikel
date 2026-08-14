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
    <div className="relative group my-6 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-950 shadow-xl dark:border-slate-800/80">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3.5 top-3.5 z-20 flex items-center space-x-1.5 rounded-lg border border-slate-700/60 bg-slate-900/90 px-3 py-1.5 text-xs font-bold text-slate-200 backdrop-blur-md transition-all hover:border-primary/50 hover:bg-slate-800 hover:text-primary active:scale-95 shadow-sm"
        title="Salin Kode Ke Clipboard"
      >
        {copied ? (
          <>
            <FaCheck className="text-emerald-400 text-xs" />
            <span className="text-emerald-400">Tersalin!</span>
          </>
        ) : (
          <>
            <FaCopy className="text-xs" />
            <span>Salin Kode</span>
          </>
        )}
      </button>
      <pre
        ref={preRef}
        {...props}
        className={`${props.className || ""} p-5 overflow-x-auto text-sm leading-relaxed text-slate-100 font-mono`}
      />
    </div>
  );
};

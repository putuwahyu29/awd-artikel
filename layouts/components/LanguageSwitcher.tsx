"use client";

import React, { useEffect, useState } from "react";
import { IoGlobeOutline } from "react-icons/io5";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<"id" | "en">("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Read cookie to check current translation state
    const getCookie = (name: string) => {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? match[2] : null;
    };

    const googTrans = getCookie("googtrans");
    if (googTrans && googTrans.endsWith("/en")) {
      setCurrentLang("en");
    } else {
      setCurrentLang("id");
    }

    // Set global init callback for Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "id",
            includedLanguages: "id,en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // Dynamically inject Google Translate script if not present
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const toggleLanguage = () => {
    const targetLang = currentLang === "id" ? "en" : "id";
    const domain = window.location.hostname;
    const cookieValue = targetLang === "en" ? "/id/en" : "/id/id";

    if (targetLang === "en") {
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain}`;
      document.cookie = `googtrans=${cookieValue}; path=/`;
    } else {
      // Clear cookie for Indonesian original text
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      document.cookie = `googtrans=/id/id; path=/; domain=${domain}`;
      document.cookie = `googtrans=/id/id; path=/`;
    }

    setCurrentLang(targetLang);

    // Trigger select element change event if available
    const selectElem = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null;
    if (selectElem) {
      selectElem.value = targetLang;
      selectElem.dispatchEvent(new Event("change"));
    }

    // Reload page to cleanly swap language state
    window.location.reload();
  };

  if (!mounted) return null;

  return (
    <div className="relative inline-flex items-center">
      <div id="google_translate_element" className="hidden" />

      <button
        type="button"
        onClick={toggleLanguage}
        className="group relative inline-flex items-center space-x-1.5 rounded-full border border-slate-200/80 bg-slate-100/60 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all duration-200 hover:border-primary/50 hover:bg-white hover:text-primary hover:shadow-xs active:scale-95 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary"
        title={
          currentLang === "id"
            ? "Terjemahkan ke Bahasa Inggris"
            : "Kembali ke Bahasa Indonesia"
        }
        aria-label="Ganti Bahasa / Switch Language"
      >
        <IoGlobeOutline className="text-sm text-primary transition-transform duration-300 group-hover:rotate-45" />
        <span className="font-bold text-[11px] tracking-wide">
          {currentLang === "id" ? "EN" : "ID"}
        </span>
      </button>
    </div>
  );
}

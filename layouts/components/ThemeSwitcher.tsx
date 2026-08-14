"use client";

import React, { useEffect, useState } from "react";
import config from "@config/index.json";
import { useTheme } from "next-themes";
import { IoSunny, IoMoon } from "react-icons/io5";

const ThemeSwitcher: React.FC = () => {
  const { theme_switcher } = config.settings;
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  if (!theme_switcher) return null;

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  return (
    <button
      aria-label="Ganti Tema Tampilan"
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/80 text-slate-700 transition-all duration-300 hover:border-primary/40 hover:bg-slate-200/80 hover:text-primary dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700/80 dark:hover:text-amber-400 active:scale-95"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <IoSunny className="text-lg text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <IoMoon className="text-base text-slate-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeSwitcher;

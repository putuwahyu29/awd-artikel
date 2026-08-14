"use client";

import React from "react";
import config from "@config/index.json";
import { JsonContext } from "context/state";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@layouts/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const { default_theme } = config.settings;

  return (
    <JsonContext>
      <ThemeProvider attribute="class" defaultTheme={default_theme}>
        {children}
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
    </JsonContext>
  );
}

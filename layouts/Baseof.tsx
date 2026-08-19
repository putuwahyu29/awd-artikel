"use client";

import React from "react";
import Footer from "@partials/Footer";
import Header from "@partials/Header";
import ScrollToTop from "@layouts/components/ScrollToTop";

interface BaseProps {
  title?: string;
  meta_title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  canonical?: string;
  children: React.ReactNode;
}

const Base: React.FC<BaseProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden pt-20">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Base;
